import type { CefrLevel, LanguageCode } from "../languages";

import { DE_SYLLABUS } from "./de";
import { EN_SYLLABUS } from "./en";
import { ES_SYLLABUS } from "./es";
import { FR_SYLLABUS } from "./fr";
import type { SyllabusMap, SyllabusUnit } from "./types";

/**
 * المنهج المكتوب لكل لغة. أي لغة/مستوى مش موجود هنا بيرجع للـspine
 * المشترك في curriculum.ts — فالتوسّع التدريجي مش بيكسر حاجة.
 */
const SYLLABUS: SyllabusMap = {
  en: EN_SYLLABUS,
  fr: FR_SYLLABUS,
  es: ES_SYLLABUS,
  de: DE_SYLLABUS,
};

export function getSyllabusUnits(
  language: LanguageCode,
  level: CefrLevel,
): SyllabusUnit[] | undefined {
  return SYLLABUS[language]?.[level];
}

export { EN_SYLLABUS };
export * from "./types";
