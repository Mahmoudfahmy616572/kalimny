import { EXAM_BANKS as GENERATED_BANKS } from "./exam-banks";
import { EXAM_CONTENT_EN, type ExamContentItem } from "./exam-content/en";
import { EXAM_CONTENT_FR } from "./exam-content/fr";
import { EXAM_CONTENT_ES } from "./exam-content/es";
import { EXAM_CONTENT_DE } from "./exam-content/de";
import type { ExamQuestion } from "./exams";

/**
 * البنك النهائي اللي التطبيق بيقراه: الوحدات المكتوبة بالإيد (exam-content)
 * بتاخد الأولوية، والتوليد بالـ AI (exam-banks) بيكمّل الباقي.
 */
function stripCovers(items: ExamContentItem[]): ExamQuestion[] {
  return items.map(({ covers: _covers, ...question }) => question);
}

const CONTENT_BANKS: Record<string, Record<string, ExamQuestion[]>> = {
  en: Object.fromEntries(
    Object.entries(EXAM_CONTENT_EN).map(([unitId, items]) => [unitId, stripCovers(items)]),
  ),
  fr: Object.fromEntries(
    Object.entries(EXAM_CONTENT_FR).map(([unitId, items]) => [unitId, stripCovers(items)]),
  ),
  es: Object.fromEntries(
    Object.entries(EXAM_CONTENT_ES).map(([unitId, items]) => [unitId, stripCovers(items)]),
  ),
  de: Object.fromEntries(
    Object.entries(EXAM_CONTENT_DE).map(([unitId, items]) => [unitId, stripCovers(items)]),
  ),
};

export const EXAM_BANKS: Record<string, Record<string, ExamQuestion[]>> = Object.fromEntries(
  Object.keys({ ...GENERATED_BANKS, ...CONTENT_BANKS }).map((language) => [
    language,
    { ...GENERATED_BANKS[language], ...CONTENT_BANKS[language] },
  ]),
);
