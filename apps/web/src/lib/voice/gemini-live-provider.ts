import {
  PCM_OUTPUT_RATE,
  buildSystemInstructions,
  type SessionOptions,
  type SessionStatus,
  type VoiceEvent,
  type VoiceEventHandler,
  type VoiceProvider,
} from "@kalimny/shared";

import { decodeBase64, encodeBase64 } from "./audio";

const LIVE_ENDPOINT =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained";

/** تأخير محاولات إعادة الاتصال بعد قطع مفاجئ — قبل ما نستسلم للجلسة */
const RECONNECT_DELAYS_MS = [500, 1000, 2000, 4000, 8000];

/**
 * Adapter Gemini Live — الوكيل اللي بيخفي تفاصيل البروتوكول عن باقي التطبيق.
 * بيعتمد على توكن قصير العمر بدل المفتاح الأساسي.
 */
export class GeminiLiveProvider implements VoiceProvider {
  readonly id = "gemini-live";

  private ws: WebSocket | null = null;
  private readonly handlers = new Set<VoiceEventHandler>();
  private status: SessionStatus = "idle";
  private closing = false;
  private setupSettled = false;
  private options: SessionOptions | null = null;

  /**
   * آخر عنوان استئناف أرسله السيرفر. بنعيّده في setup عند إعادة الاتصال
   * بنفس التوكن، فتتحفظ السياق والمحادثة بعد أي قطع مفاجئ.
   */
  private resumptionHandle: string | null = null;
  private reconnecting = false;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private onSetupResolved: (() => void) | null = null;
  private onSetupRejected: ((reason: Error) => void) | null = null;

  private userText = "";
  private tutorText = "";
  /** آخر نص نهائي اتبعت لكل طرف — لمنع تكرار نفس الرسالة مرتين */
  private lastFinalUser = "";
  private lastFinalTutor = "";
  /** صحّي لو المدرب لسه بيتكلم — لازم نعرفها عشان نعرف الجملة اتقطّعت */
  private tutorMidTurn = false;

  on(handler: VoiceEventHandler): () => void {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }

  private emit(event: VoiceEvent): void {
    for (const handler of Array.from(this.handlers)) {
      handler(event);
    }
  }

  private setStatus(status: SessionStatus): void {
    if (this.status === status) {
      return;
    }
    this.status = status;
    this.emit({ type: "status", status });
  }

  async connect(options: SessionOptions): Promise<void> {
    if (this.ws) {
      throw new Error("الجلسة مشتغلة بالفعل — اقفلها الأول");
    }

    this.closing = false;
    this.reconnecting = false;
    this.reconnectAttempts = 0;
    this.userText = "";
    this.tutorText = "";
    this.lastFinalUser = "";
    this.lastFinalTutor = "";
    this.tutorMidTurn = false;
    this.options = options;
    this.resumptionHandle = null;
    this.setStatus("connecting");

    await this.openSocket();
  }

  private buildSetupMessage(): Record<string, unknown> {
    const options = this.options as SessionOptions;
    return {
      setup: {
        model: `models/${options.model}`,
        generationConfig: {
          responseModalities: ["AUDIO"],
          temperature: 0.8,
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: options.persona.voice || "Puck",
              },
            },
          },
        },
        systemInstruction: {
          parts: [
            {
              text:
                buildSystemInstructions(options.persona, options.lessonPlan) +
                "\n\n" +
                (options.lessonPlan?.recapWords?.filter((r) => r.startsWith("## MEMORY BETWEEN") || r.startsWith("## SCENARIO")).join("\n\n") || ""),
            },
          ],
        },
        // يمدد الجلسة بدل سقف الـ 15 دقيقة
        contextWindowCompression: { slidingWindow: {} },
        // بيخلي السيرفر يبعت عنوان استئناف؛ وبنعيد بيه الاتصال بنفس التوكن
        sessionResumption: this.resumptionHandle
          ? { handle: this.resumptionHandle }
          : {},
        inputAudioTranscription: {
          languageCodes: ["ar-EG", "ar"],
        },
        outputAudioTranscription: {
          languageCodes: ["ar-EG", options.persona.language],
        },
      },
    };
  }

  private openSocket(): Promise<void> {
    const options = this.options as SessionOptions;
    const url = `${LIVE_ENDPOINT}?access_token=${encodeURIComponent(options.token)}`;

    const socket = new WebSocket(url);
    socket.binaryType = "arraybuffer";
    this.ws = socket;
    this.setupSettled = false;

    return new Promise<void>((resolve, reject) => {
      this.onSetupResolved = resolve;
      this.onSetupRejected = reject;

      socket.onopen = () => {
        socket.send(JSON.stringify(this.buildSetupMessage()));
      };

      socket.onmessage = (event) => {
        void this.handleMessage(event.data);
      };

      socket.onerror = () => {
        if (this.ws !== socket) {
          return;
        }
        this.failSetup("اتقطّع الاتصال بخوادم الصوت");
        this.setStatus("error");
      };

      socket.onclose = (event) => {
        this.handleClose(socket, event);
      };
    });
  }

  private handleClose(socket: WebSocket, event: CloseEvent): void {
    if (this.ws !== socket) {
      return;
    }
    this.ws = null;

    if (this.closing) {
      this.setStatus("idle");
      return;
    }

    // طالما فيه عنوان استئناف، نعيد الاتصال بنفس التوكن ونبقي الجلسة شغّالة
    // من غير ما الواجهة تحس إن الحصة انتهت.
    if (this.resumptionHandle && this.options) {
      if (this.setupSettled) {
        this.flushTranscripts();
      } else {
        // الإعداد ما اكملش — نرفض وعد الاستئناف بدل ما يفضل معلّق للأبد
        const reject = this.onSetupRejected;
        this.onSetupResolved = null;
        this.onSetupRejected = null;
        reject?.(new Error("اتقفل الاتصال قبل اكتمال الإعداد"));
      }
      // الجملة اللي كان بيتكلمها المدرب اتقطّعت مع الاتصال — الموديل مش
      // بيعاودها بعد الاستئناف، فنقول للمشغّل يقف ويوقّف عدّاد الصوت
      if (this.tutorMidTurn) {
        this.tutorMidTurn = false;
        this.emit({ type: "interrupted" });
      }
      this.scheduleReconnect();
      return;
    }

    const wasSetup = this.setupSettled;
    this.failSetup(`اتقفل الاتصال (كود ${event.code})`);
    this.setStatus(wasSetup ? "ended" : "error");
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer !== null) {
      return;
    }

    const delay = RECONNECT_DELAYS_MS[this.reconnectAttempts];
    if (delay === undefined) {
      this.teardown();
      this.setStatus("error");
      this.emit({
        type: "error",
        message: "انقطعت الجلسة نهائيًا — ابدأها من جديد",
        fatal: true,
      });
      return;
    }

    this.reconnectAttempts += 1;
    this.reconnecting = true;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.closing || !this.options) {
        return;
      }
      void this.openSocket().catch(() => {
        if (this.closing || !this.options) {
          return;
        }
        this.scheduleReconnect();
      });
    }, delay);
  }

  private failSetup(message: string): void {
    if (this.setupSettled) {
      return;
    }
    this.setupSettled = true;
    const reject = this.onSetupRejected;
    this.onSetupResolved = null;
    this.onSetupRejected = null;
    // أثناء إعادة الاتصال بنسكت عن الخطأ — المحاولة الجاية هتصرفها،
    // وإلا الواجهة كانت هتقول للطلّاب إن الحصة خلصت وأنا بنحاول نرجع.
    if (!this.reconnecting) {
      this.emit({ type: "error", message, fatal: true });
    }
    reject?.(new Error(message));
  }

  private completeSetup(): void {
    if (this.setupSettled) {
      return;
    }
    this.setupSettled = true;
    const resolve = this.onSetupResolved;
    this.onSetupResolved = null;
    this.onSetupRejected = null;
    this.reconnecting = false;
    this.reconnectAttempts = 0;
    this.setStatus("live");
    resolve?.();
  }

  private teardown(): void {
    this.options = null;
    this.resumptionHandle = null;
    this.reconnecting = false;
    this.reconnectAttempts = 0;
  }

  private async handleMessage(data: unknown): Promise<void> {
    let raw: string;
    if (typeof data === "string") {
      raw = data;
    } else if (data instanceof ArrayBuffer) {
      raw = new TextDecoder().decode(data);
    } else if (data instanceof Blob) {
      raw = await data.text();
    } else {
      return;
    }

    let message: Record<string, unknown>;
    try {
      message = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return;
    }

    if (message.setupComplete) {
      this.completeSetup();
      return;
    }

    const resumption = message.sessionResumptionUpdate as
      | { resumable?: boolean; newHandle?: string }
      | undefined;
    if (resumption) {
      if (resumption.resumable && resumption.newHandle) {
        this.resumptionHandle = resumption.newHandle;
      }
      return;
    }

    if (message.error) {
      this.emit({
        type: "error",
        message: summarizeApiError(message.error),
        fatal: false,
      });
      return;
    }

    const serverContent = message.serverContent as
      | Record<string, unknown>
      | undefined;
    if (!serverContent) {
      return;
    }

    if (serverContent.error) {
      this.emit({
        type: "error",
        message: summarizeApiError(serverContent.error),
        fatal: false,
      });
    }

    const modelTurn = serverContent.modelTurn as
      | { parts?: Array<Record<string, unknown>> }
      | undefined;
    for (const part of modelTurn?.parts ?? []) {
      const inlineData = part.inlineData as
        | { data?: string; mimeType?: string }
        | undefined;
      if (inlineData?.data) {
        this.tutorMidTurn = true;
        this.emit({
          type: "audio-out",
          chunk: decodeBase64(inlineData.data),
          sampleRate: PCM_OUTPUT_RATE,
        });
      }
    }

    const inputTranscription = serverContent.inputTranscription as
      | { text?: string; finished?: boolean }
      | undefined;
    if (inputTranscription?.text !== undefined) {
      const incoming = inputTranscription.text;
      if (!incoming.trim()) {
        return;
      }
      // فلتر أقوى للهلوسة وأنت ساكت
      const hasArabic = /[\u0600-\u06FF]/.test(incoming);
      const hasTarget = /[A-Za-z]/.test(incoming);
      if (!this.tutorMidTurn && this.userText.length === 0 && this.tutorText.length === 0) {
        if (incoming.trim().length < 2) return;
        if (!hasArabic && !hasTarget) return;
        const weird = !hasArabic && incoming.trim().length > 3;
        if (weird) return;
      }
      // لو النص الجديد فيه اللي اتجمّع قبل كده → نستبدله بدل التكرار
      if (this.userText && incoming.startsWith(this.userText)) {
        this.userText = incoming;
      } else {
        this.userText += incoming;
      }
      const final = Boolean(inputTranscription.finished);
      if (final) {
        if (this.userText !== this.lastFinalUser) {
          this.lastFinalUser = this.userText;
          this.emit({ type: "user-transcript", text: this.userText, final: true });
        }
        this.userText = "";
      } else {
        this.emit({ type: "user-transcript", text: this.userText, final: false });
      }
    }

    const outputTranscription = serverContent.outputTranscription as
      | { text?: string; finished?: boolean }
      | undefined;
    if (outputTranscription?.text !== undefined) {
      this.tutorMidTurn = true;
      const chunk = outputTranscription.text;
      // أحيانًا السيرفر يعيد النص كاملًا بدل القطعة الجديدة — بدل ما نكرّره
      // نحط النص كامل مكان اللي اتجمّع قبل كده.
      if (this.tutorText && chunk.startsWith(this.tutorText)) {
        this.tutorText = chunk;
      } else {
        this.tutorText += chunk;
      }
      const final = Boolean(outputTranscription.finished);
      if (final) {
        if (this.tutorText !== this.lastFinalTutor) {
          this.lastFinalTutor = this.tutorText;
          this.emit({ type: "tutor-transcript", text: this.tutorText, final: true });
        }
        this.tutorText = "";
      } else {
        this.emit({ type: "tutor-transcript", text: this.tutorText, final: false });
      }
    }

    if (serverContent.interrupted) {
      this.tutorMidTurn = false;
      this.flushTranscripts();
      this.emit({ type: "interrupted" });
      return;
    }

    if (serverContent.turnComplete) {
      this.tutorMidTurn = false;
      this.flushTranscripts();
      this.emit({ type: "turn-complete" });
    }
  }

  private flushTranscripts(): void {
    if (this.tutorText && this.tutorText !== this.lastFinalTutor) {
      this.lastFinalTutor = this.tutorText;
      this.emit({ type: "tutor-transcript", text: this.tutorText, final: true });
    }
    this.tutorText = "";
    if (this.userText && this.userText !== this.lastFinalUser) {
      this.lastFinalUser = this.userText;
      this.emit({ type: "user-transcript", text: this.userText, final: true });
    }
    this.userText = "";
  }

  sendAudio(chunk: ArrayBuffer): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN || chunk.byteLength === 0) {
      return;
    }
    this.ws.send(
      JSON.stringify({
        realtimeInput: {
          audio: { mimeType: "audio/pcm", data: encodeBase64(chunk) },
        },
      }),
    );
  }

  sendText(text: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN || !text.trim()) {
      return;
    }
    this.ws.send(
      JSON.stringify({
        clientContent: {
          turns: [{ role: "user", parts: [{ text }] }],
          turnComplete: true,
        },
      }),
    );
  }

  async disconnect(): Promise<void> {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    const socket = this.ws;
    this.ws = null;
    this.closing = true;
    this.flushTranscripts();
    this.tutorMidTurn = false;

    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.close(1000);
      } catch {
        /* خلاص قفل */
      }
    }

    this.teardown();
    this.setStatus("ended");
    this.closing = false;
    this.setupSettled = false;
    this.onSetupResolved = null;
    this.onSetupRejected = null;
  }
}

function summarizeApiError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object") {
    const record = error as Record<string, unknown>;
    if (typeof record.message === "string") {
      return record.message;
    }
    return JSON.stringify(error);
  }
  return "حدث خطأ في خدمة الصوت";
}
