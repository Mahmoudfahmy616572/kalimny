import type { CefrLevel, LanguageCode } from "../languages";

import { EN_SYLLABUS } from "./en";
import type { SyllabusMap, SyllabusUnit } from "./types";

/**
 * المنهج المكتوب لكل لغة. أي لغة/مستوى مش موجود هنا بيرجع للـspine
 * المشترك في curriculum.ts — فالتوسّع التدريجي مش بيكسر حاجة.
 */
const SYLLABUS: SyllabusMap = {
  en: EN_SYLLABUS,
};

export function getSyllabusUnits(
  language: LanguageCode,
  level: CefrLevel,
): SyllabusUnit[] | undefined {
  return SYLLABUS[language]?.[level];
}

export { EN_SYLLABUS };
export * from "./types";
