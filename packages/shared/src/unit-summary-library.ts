import { getUnit } from "./curriculum";
import type { CefrLevel, LanguageCode } from "./languages";
import { UNIT_SUMMARY_EN } from "./unit-summaries/en";
import { UNIT_SUMMARY_FR } from "./unit-summaries/fr";
import { UNIT_SUMMARY_ES } from "./unit-summaries/es";
import { UNIT_SUMMARY_DE } from "./unit-summaries/de";
import type { UnitHandAuthored, UnitSummary, SkillItem } from "./unit-summary/types";

/**
 * الجزء اللي بنألّفه بإيدي لكل وحدة، مفهرس باللغة وبعدين بـ unitId.
 * المفتاح هو `${lang}-${level}-u${nn}` (زي بنوك الامتحانات).
 */
const AUTHORED: Record<string, Record<string, UnitHandAuthored>> = {
  en: UNIT_SUMMARY_EN,
  fr: UNIT_SUMMARY_FR,
  es: UNIT_SUMMARY_ES,
  de: UNIT_SUMMARY_DE,
};

/** يفصل "term — معنى" اللي بيولّده toCurriculumUnit. */
function splitPair(value: string): { term: string; meaning: string } {
  const i = value.indexOf(" — ");
  if (i === -1) return { term: value.trim(), meaning: "" };
  return { term: value.slice(0, i).trim(), meaning: value.slice(i + 3).trim() };
}

/**
 * يبني الملخص الأساسي الكامل لوحدة: المفردات/الجمل/القواعد بتيجي من
 * المنهج (getUnit — مألَّفة بإيدي أصلًا في الـ syllabus)، والـ overview
 * والمهارات الأربعة من التأليف اليدوي (لو متوفر).
 *
 * يرجّع ملخص غير فارغ لأي وحدة صالحة (٢٤٤ وحدة) — الجزء البشري بيتكمّل
 * تدريجيًا، فالحقول overview/skills ممكن تكون null لحد ما تتألَّف.
 */
export function getUnitSummary(
  language: string,
  level: string | null | undefined,
  unitIndex: number,
): UnitSummary | null {
  const unit = getUnit(
    language as LanguageCode,
    (level as CefrLevel) ?? "A1",
    unitIndex,
  );

  const vocabulary = (unit.coreVocab ?? []).map((entry) => {
    const { term, meaning } = splitPair(entry);
    return { term, meaning, example: "" };
  });

  const phrases = (unit.samplePhrases ?? []).map((entry) => {
    const { term, meaning } = splitPair(entry);
    return { phrase: term, meaning };
  });

  const grammar: UnitSummary["grammar"] = [];
  if (unit.grammarAr) {
    grammar.push({ point: "نظرة على القواعد", explanation: unit.grammarAr, example: "" });
  }
  for (const point of unit.coreGrammar ?? []) {
    grammar.push({ point, explanation: "", example: "" });
  }

  const authored = AUTHORED[language]?.[unit.id];

  return {
    unitId: unit.id,
    title: unit.titleAr,
    overview: authored?.overview ?? null,
    vocabulary,
    phrases,
    grammar,
    skills: authored?.skills ?? null,
  };
}

export const UNIT_SUMMARIES = AUTHORED;

export type { UnitSummary, UnitHandAuthored, SkillItem };
export {
  UNIT_SUMMARY_EN,
  UNIT_SUMMARY_FR,
  UNIT_SUMMARY_ES,
  UNIT_SUMMARY_DE,
};
