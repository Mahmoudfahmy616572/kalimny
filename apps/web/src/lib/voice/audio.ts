import { PCM_INPUT_RATE, PCM_OUTPUT_RATE } from "@kalimny/shared";

const WORKLET_URL = "/audio/pcm-capture-processor.js";

export type MicStop = () => void;

/**
 * يبدأ التقاط الميكروفون ويحوّله لعيّنات PCM 16-bit على المعدل المطلوب.
 * بيستخدم AudioWorklet (مش ScriptProcessor) عشان يفضّي على الـ UI thread.
 * بيرجع دالة توقف كله.
 */
export async function startMicCapture(options: {
  onChunk: (chunk: Int16Array) => void;
  sampleRate?: number;
}): Promise<MicStop> {
  const sampleRate = options.sampleRate ?? PCM_INPUT_RATE;

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  const context = new AudioContext({ sampleRate });

  try {
    await context.audioWorklet.addModule(WORKLET_URL);
  } catch (error) {
    stream.getTracks().forEach((track) => track.stop());
    await context.close();
    throw error;
  }

  const source = context.createMediaStreamSource(stream);
  const node = new AudioWorkletNode(context, "pcm-capture");

  node.port.onmessage = (event: MessageEvent<ArrayBuffer>) => {
    options.onChunk(new Int16Array(event.data));
  };

  // لا نوصّله بالمخرجات — ده اللي بيقفل الإيكو
  source.connect(node);

  if (context.state === "suspended") {
    await context.resume();
  }

  return () => {
    node.port.onmessage = null;
    try {
      source.disconnect();
    } catch {
      /* أصلًا اتفك */
    }
    try {
      node.disconnect();
    } catch {
      /* أصلًا اتفك */
    }
    stream.getTracks().forEach((track) => track.stop());
    void context.close();
  };
}

/**
 * يشغّل تدفق PCM متتالي من غير تقطيع — بيجدول كل بلوك بعد اللي قبله.
 */
export class PcmPlayer {
  private readonly context: AudioContext;
  private readonly sourceRate: number;
  private nextStartTime = 0;
  private readonly active = new Set<AudioBufferSourceNode>();
  /** مستشعر مستوى الصوت — بيغذّي حركة فم الأفاتار واتساقها مع الكلام. */
  private readonly analyser: AnalyserNode;
  private readonly levelSamples: Float32Array<ArrayBuffer>;
  private lastRealLevelAt = 0;

  constructor(sourceRate: number = PCM_OUTPUT_RATE) {
    this.sourceRate = sourceRate;
    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.6;
    this.analyser.connect(this.context.destination);
    this.levelSamples = new Float32Array(this.analyser.fftSize);
  }

  /** حالة الـ AudioContext — لأجل التشخيص (مش بتحتاج متجر). */
  get audioState(): AudioContextState {
    return this.context.state;
  }

  /**
   * بيفتح الـ AudioContext من داخل ضغطة المستخدم نفسه — بعض المتصفحات
   * بتفضل سياق الصوت معلّق لو ما اتصنعش/اتفتحش جوه gesture مباشر.
   */
  async unlock(): Promise<void> {
    if (this.context.state === "suspended") {
      try {
        await this.context.resume();
      } catch {
        /* مش مشكلة — هنجرب تاني مع أول ضغطة أو أول بلوك صوت */
      }
    }
  }

  /**
   * مستوى الصوت الحالي الخارج من السماعة (0–1) — بنيّة على RMS.
   * بيرجع 0 لو الـ AudioContext مش شغّال (مثلاً قبل إذن المتصفح) —
   * وفي الحالة دي بنحاول نفتحه تاني عشان الفم ما يعلّقش مفتوح.
   *
   * لو الصوت شغّال فعليًا (فيه بلوكات مجدولة) بس الـ analyser قرا صمت —
   * زي بعض إعدادات السماعات/الصوت المُعاد توجيهه — بنرجّع محاكاة
   * تذبذب عشان فم الأفاتار ما يقفش ثابت.
   */
  getLevel(): number {
    const now = Date.now();
    if (this.context.state !== "running") {
      if (this.context.state === "suspended") {
        void this.context.resume().catch(() => null);
      }
      return 0;
    }
    this.analyser.getFloatTimeDomainData(this.levelSamples);
    let sum = 0;
    for (let i = 0; i < this.levelSamples.length; i++) {
      sum += this.levelSamples[i] * this.levelSamples[i];
    }
    const rms = Math.sqrt(sum / this.levelSamples.length);
    // الضغط بيكبّر الأصوات الهادية عشان الفم يبان بيتحرك حتى في الكلام العادي.
    const real = Math.min(1, rms * 4.5);
    if (real > 0.02) {
      this.lastRealLevelAt = now;
      return real;
    }
    if (this.active.size > 0 && now - this.lastRealLevelAt > 250) {
      const t = now / 1000;
      const envelope =
        0.32 + 0.28 * Math.sin(t * 9.1) + 0.16 * Math.sin(t * 17.3);
      return Math.min(1, Math.max(0, envelope));
    }
    return real;
  }


  enqueue(pcm: Int16Array): void {
    if (pcm.length === 0) {
      return;
    }
    if (this.context.state === "suspended") {
      void this.context.resume();
    }

    const floats = new Float32Array(pcm.length);
    for (let i = 0; i < pcm.length; i++) {
      floats[i] = pcm[i] / 32768;
    }

    // نبني الـ buffer بمعدل المصدر (24k) فالمتصفح يعيد التحجيم بنفسه صح
    const buffer = this.context.createBuffer(1, floats.length, this.sourceRate);
    buffer.copyToChannel(floats, 0);

    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.analyser);

    const start = Math.max(this.context.currentTime, this.nextStartTime);
    source.start(start);
    this.nextStartTime = start + buffer.duration;

    this.active.add(source);
    source.onended = () => {
      this.active.delete(source);
      if (this.active.size === 0) {
        this.nextStartTime = 0;
      }
    };
  }

  /** يقطع أي صوت شغّال فورًا (لما المستخدم يقاطع المدرّس أو يقفل) */
  interrupt(): void {
    for (const source of Array.from(this.active)) {
      try {
        source.stop();
      } catch {
        /* خلاص وقف */
      }
    }
    this.active.clear();
    this.nextStartTime = 0;
  }

  async close(): Promise<void> {
    this.interrupt();
    await this.context.close();
  }
}

/**
 * يحوّل عيّنة PCM لـ ArrayBuffer عادي — `Int16Array.buffer` مُعرّف كـ
 * ArrayBufferLike ممكن يكون SharedArrayBuffer، والبروتوكول محتاج ArrayBuffer.
 */
export function toArrayBuffer(pcm: Int16Array): ArrayBuffer {
  const buffer = pcm.buffer;
  // SharedArrayBuffer مش متاح غير في سياق cross-origin-isolated (محتاج COOP/COEP)،
  // فمن غير الحماية دي `instanceof` بترمي ReferenceError على كل بلوك ميكروفون.
  if (
    typeof SharedArrayBuffer !== "undefined" &&
    buffer instanceof SharedArrayBuffer
  ) {
    throw new Error("expected a non-shared ArrayBuffer");
  }
  return buffer as ArrayBuffer;
}

export function decodeBase64(value: string): ArrayBuffer {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export function encodeBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
