import {
  EXAM_DISTRIBUTION,
  EXAM_LENGTH,
  type ExamKind,
  type ExamQuestion,
} from "./exams";

const KIND_ORDER: Record<ExamKind, number> = {
  vocab: 0,
  grammar: 1,
  speaking: 2,
  listening: 3,
};

/**
 * بتسحب اختبار من بنك الوحدة: التوزيع من EXAM_DISTRIBUTION، والأسئلة
 * بتتسحب عشوائياً داخل كل نوع، وبعدين بتترتّب من السهل للصعب.
 *
 * rand اختياري عشان الاختبار يبقى قابل للتكرار في التست.
 */
export function pickExamQuestions(
  bank: ExamQuestion[],
  rand: () => number = Math.random,
): ExamQuestion[] {
  const picked: ExamQuestion[] = [];

  for (const kind of Object.keys(EXAM_DISTRIBUTION) as ExamKind[]) {
    const needed = EXAM_DISTRIBUTION[kind];
    const candidates = bank.filter((q) => q.kind === kind);
    if (candidates.length < needed) {
      throw new Error(`bank has ${candidates.length} ${kind} questions, need ${needed}`);
    }

    const shuffled = [...candidates];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    picked.push(...shuffled.slice(0, needed));
  }

  if (picked.length !== EXAM_LENGTH) {
    throw new Error(`exam has ${picked.length} questions, expected ${EXAM_LENGTH}`);
  }

  return picked.sort(
    (a, b) =>
      (a.difficulty ?? 2) - (b.difficulty ?? 2) || KIND_ORDER[a.kind] - KIND_ORDER[b.kind],
  );
}
