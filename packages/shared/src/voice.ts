import type { CurriculumUnit } from "./curriculum";
import type { PersonaSpec } from "./persona";

export type SessionStatus = "idle" | "connecting" | "live" | "ended" | "error";

/** موديل Live المستخدم أثناء التطوير (مجاني عبر Gemini) */
export const GEMINI_LIVE_MODEL = "gemini-3.8-live";
/** تدفق صوت الدخول: PCM 16-bit little-endian */
export const PCM_INPUT_RATE = 16000;
/** تدفق صوت الخرج: PCM 16-bit little-endian */
export const PCM_OUTPUT_RATE = 24000;

export interface UsageMetrics {
  inputTokens: number;
  outputTokens: number;
  audioInputSeconds: number;
  audioOutputSeconds: number;
}

/**
 * الأحداث الموحّدة التي يبثّها أي مزوّد صوت. الواجهة (UI) تستهلك هذه الأحداث
 * فقط ولا تعرف أي شيء عن المزوّد الفعلي.
 */
export type VoiceEvent =
  | { type: "status"; status: SessionStatus }
  | { type: "user-transcript"; text: string; final: boolean }
  | { type: "tutor-transcript"; text: string; final: boolean }
  | {
      type: "audio-out";
      chunk: ArrayBuffer;
      /** نموذج العيّنات بالهرتز لصوت الخرج */
      sampleRate: number;
    }
  | { type: "interrupted" }
  | { type: "turn-complete" }
  | { type: "correction"; original: string; corrected: string; noteAr: string }
  | { type: "usage"; usage: UsageMetrics }
  | { type: "error"; message: string; fatal: boolean };

export type VoiceEventHandler = (event: VoiceEvent) => void;

/** سياق المنهج — الوحدة الحالية وهدف الطالب واهتماماته. */
export interface LessonPlan {
  unit: CurriculumUnit;
  goal: string | null;
  interests: string[];
  /** كلمات المراجعة من آخر درس — ممكن تكون فاضية */
  recapWords: string[];
  /** رقم الوحدة الحالية — بيتغيّر مع تقدّم الجلسات */
  unitIndex: number;
  /**
   * مدة الجلسة بالدقائق — المدرّس بيستخدمها عشان يوزّع السياق على الوقت
   * المتاح ويقفل المحادثة طبيعي قبل ما الوقت يخلص.
   */
  durationMinutes?: number;
}

export interface SessionOptions {
  persona: PersonaSpec;
  /** توكن قصير العمر (ephemeral) يُصدره السيرفر — لا يُسرّب المفتاح الأساسي */
  token: string;
  model: string;
  /** خطة الدرس الحالية (اختياري — من onboarding/التقدّم) */
  lessonPlan?: LessonPlan;
}

/**
 * العقد الرسمي لمزوّدي الصوت. أي Adapter جديد (Gemini / OpenAI / غيره) يطبّق
 * هذه الواجهة فقط، وبالتالي لا يحتاج أي جزء آخر من التطبيق إلى تعديل.
 */
export interface VoiceProvider {
  readonly id: string;
  connect(options: SessionOptions): Promise<void>;
  disconnect(): Promise<void>;
  sendAudio(chunk: ArrayBuffer): void;
  sendText(text: string): void;
  /** يُرجع دالة لإلغاء الاشتراك */
  on(handler: VoiceEventHandler): () => void;
}
