/**
 * تطبيع محتوى الملخصات (كلمات/عبارات/قواعد) قبل ما يوصل للواجهة.
 *
 * الملخصات الجديدة بتتحفظ كـ objects من `summary.ts`:
 *   words:    { term, meaning, example }
 *   phrases:  { phrase, meaning }
 *   grammar:  { point, explanation, example }
 *
 * لكن صفوف قديمة ممكن تكون نصوص خام، أو فيها مفاتيح مختلفة. بدل ما كل
 * صفحة تتعامل مع الشكل بنفسها (وتطلع JSON خام للمستخدم)، التطبيع هنا مرة واحدة.
 */

export type SummaryWord = { term: string; meaning: string; example: string };
export type SummaryPhrase = { phrase: string; meaning: string };
export type SummaryGrammar = { point: string; explanation: string; example: string };

export type Flashcard = {
  term: string;
  meaning: string;
  example: string;
  type: "word" | "phrase";
};

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function firstText(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = text(row[key]);
    if (value) return value;
  }
  return "";
}

export function readSummaryWord(value: unknown): SummaryWord | null {
  if (typeof value === "string") {
    const term = value.trim();
    return term ? { term, meaning: "", example: "" } : null;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const term = firstText(row, ["term", "word"]);
  if (!term) return null;

  return {
    term,
    meaning: firstText(row, ["meaning", "translation", "meaningAr"]),
    example: firstText(row, ["example", "sentence"]),
  };
}

export function readSummaryPhrase(value: unknown): SummaryPhrase | null {
  if (typeof value === "string") {
    const phrase = value.trim();
    return phrase ? { phrase, meaning: "" } : null;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const phrase = firstText(row, ["phrase", "term", "text"]);
  if (!phrase) return null;

  return {
    phrase,
    meaning: firstText(row, ["meaning", "translation", "meaningAr"]),
  };
}

export function readSummaryGrammar(value: unknown): SummaryGrammar | null {
  if (typeof value === "string") {
    const point = value.trim();
    return point ? { point, explanation: "", example: "" } : null;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const point = firstText(row, ["point", "rule", "title"]);
  if (!point) return null;

  return {
    point,
    explanation: firstText(row, ["explanation", "meaning", "note"]),
    example: firstText(row, ["example", "sentence"]),
  };
}
