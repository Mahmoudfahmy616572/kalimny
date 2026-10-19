/**
 * باقات الدروس: تجربة مجانية + اشتراك شهري.
 *
 * دي كل الأرقام اللي بتتحكم في الرصيد — مكان واحد، ومفيش رقم مكتوب في أي
 * حتة تانية (غير الدالة الافتراضية في الـ SQL، وموثّق إنها لازم تطابق).
 *
 * الطبقة الأساسية = الدقايق، و"عدد الدروس" نتيجة مش رقم مستقل:
 *   عدد الدروس = الرصيد ÷ مدة الدرس.
 * الاشتراك بيبيع بالدقايق، والتجربة بتبيع بالدروس (كل درس مدة ثابتة).
 */

// ============================================================
// التجربة المجانية
// ============================================================

/** عدد الدروس التجريبية المجانية لكل حساب جديد. */
export const TRIAL_LESSONS = 3;

/**
 * مدة الدرس التجريبي بالدقايق — ثابتة، الطالب ما يختارهاش.
 * أي مدة تانية محتاجة اشتراك.
 */
export const TRIAL_LESSON_MINUTES = 15;

// ============================================================
// الاشتراك المدفوع
// ============================================================

/** دقايق الاشتراك الشهري. */
export const PLAN_MONTHLY_MINUTES = 250;

/** سعر الاشتراك الشهري بالجنيه المصري (عدد صحيح، من غير كسور). */
export const PLAN_MONTHLY_PRICE_EGP = 210;

/** أطول درس ممكن — متوافق مع سقف عمر التوكن (90 دقيقة). */
export const MAX_LESSON_MINUTES = 90;

/** المدد المتاحة للدرس الواحد في الاشتراك المدفوع. */
export const LESSON_DURATIONS_MINUTES = [15, 30, 50] as const;

export type LessonDurationMinutes = (typeof LESSON_DURATIONS_MINUTES)[number];

/** المدة الافتراضية لو الطالب ما اختارش. */
export const DEFAULT_LESSON_MINUTES: LessonDurationMinutes = 30;

/**
 * بيتأكد إن المدة المطلوبة من العميل مسموح بيها، ولو لأ يرجع الافتراضي.
 * العميل ممكن يبعت أي رقم، فما نثقش فيه.
 */
export function normalizeLessonMinutes(value: unknown): LessonDurationMinutes {
  if (
    typeof value === "number" &&
    LESSON_DURATIONS_MINUTES.includes(value as LessonDurationMinutes)
  ) {
    return value as LessonDurationMinutes;
  }
  return DEFAULT_LESSON_MINUTES;
}
