import type { OrbState } from "../orb";

export type AvatarMood =
  | "neutral"
  | "happy"
  | "excited"
  | "thinking"
  | "listening";

/** قيم لحظية بيكتبها الأفاتار كل فريم — للتشخيص والاختبارات (مش للعرض). */
export type AvatarProbe = {
  raw: number;
  level: number;
  mouth: number;
  arm: number;
};

export type AvatarProps = {
  personaId: string;
  state: OrbState;
  mood: AvatarMood;
  speaking: boolean;
  /**
   * فيه كلام من المدرّس بس قراءة الصوت مش موثوقة — بنشغّل محاكاة حركة فم
   * كخطة أخيرة عشان الأفاتار ما يبقاش ميت على أي جهاز/إعداد صوت.
   */
  silent?: boolean;
  getLevel: () => number;
  /** بتبلّغ القيم اللحظية (للتشخيص والاختبارات) */
  onProbe?: (values: AvatarProbe) => void;
  /** عدّاد بيزيد لما الجلسة تبدأ — بيفجّر تلويحة الترحيب */
  waveKey: number;
  /** عدّاد بيزيد لما البيرسون يتحمّس — بيفجّر رفع الإيدين */
  cheerKey: number;
};
