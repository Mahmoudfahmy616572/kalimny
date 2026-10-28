/**
 * شكل الملخص الأساسي للوحدة.
 *
 * الفكرة: المفردات/الجمل/القواعد بتتجاب تلقائياً من المنهج (getUnit)
 * لأنها أصلاً موجودة ومألَّفة بإيدي في الـ syllabus. والجزء اللي بنألّفه
 * بإيدي فعلاً هو `overview` (ملخص شامل بالعربي) والمهارات الأربعة
 * (قراءة/كتابة/استماع/تحدث) — ده اللي بنخزّنه في ملفات unit-summaries.
 *
 * كده كل الوحدات (٢٤٤) يبقى ليها ملخص منظّم فوراً من المنهج، والطبقة
 * البشرية (overview + مهارات) تتكمّل تدريجياً.
 */

export type SkillItem = {
  /** تعليمة للمتعلم بالعربي المصري */
  instruction: string;
  /** المحتوى باللغة الهدف: نص للقراءة/الاستماع، أو المطلوب في الكتابة/التحدث */
  prompt: string;
  /** إجابة نموذجية أو تلميح للمراجعة الذاتية (اختياري) */
  modelAnswer?: string;
};

/** الجزء اللي بنألّفه بإيدي لكل وحدة — فوق المحتوى الآلي من المنهج. */
export type UnitHandAuthored = {
  unitId: string;
  /** ملخص شامل بالعربي المصري بيغطي محتوى الوحدة كله */
  overview: string;
  skills: {
    reading: SkillItem;
    writing: SkillItem;
    listening: SkillItem;
    speaking: SkillItem;
  };
};

/** الملخص النهائي المعروض بعد الجلسة. */
export type UnitSummary = {
  unitId: string;
  title: string;
  /** ملخص شامل بالعربي — null لو لسه متألَّفش */
  overview: string | null;
  vocabulary: { term: string; meaning: string; example: string }[];
  phrases: { phrase: string; meaning: string }[];
  grammar: { point: string; explanation: string; example: string }[];
  /** المهارات الأربعة — null لو لسه متألَّفتش */
  skills: {
    reading: SkillItem;
    writing: SkillItem;
    listening: SkillItem;
    speaking: SkillItem;
  } | null;
};
