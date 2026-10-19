import "server-only";

import {
  getUnit,
  type CurriculumUnit,
  type LanguageCode,
} from "@kalimny/shared";

import { getLessonPlanContext } from "@/lib/preferences";
import { createClient } from "@/lib/supabase/server";

/**
 * توليد ملخص الجلسة بـ Gemini Flash + حفظه في lesson_summaries.
 *
 * الملخص شامل محتوى الوحدة كامل (من المنهج) — مش بس اللي اتقال
 * في المحادثة. transcript بيوضّح اللي اتدرّب عليه فعلاً، وخط الوحدة
 * بيعرّف الموديل بكل المفردات والقواعد المتوقعة في الدرس.
 *
 * بتتنده من نهاية الدرس (خلف after()) — الفشل هنا ما يكسرش تسوية
 * الرصيد أصلًا، الملخص بس مش بيتسجّل والوحدة بتفضل مكانها (متتقدّمش).
 */

const SUMMARY_MODEL = "gemini-3.8-flash";
const SUMMARY_TIMEOUT_MS = 45_000;
/** أقصى طول للنص المرسل — فوق كده بنبعت آخر جزء بس */
const MAX_TRANSCRIPT_CHARS = 24_000;

/**
 * نسبة اكتمال الجلسة: لازم توصل ٦٠٪ من وقتها المحجوز عشان تتعتبر
 * درس كامل (متقدّم الوحدة + يستحق ملخص). الجلسة اللي اتقفلت بدري
 * مبتولّدش لها ملخص من أصله.
 */
export const SESSION_COMPLETE_RATIO = 0.6;

/** هل الجلسة صرفت ٦٠٪ على الأقل من الوقت المحجوز؟ */
export function isSessionComplete(
  usedSeconds: number,
  allocatedMinutes: number,
): boolean {
  const allocatedSeconds = Math.max(1, allocatedMinutes * 60);
  return usedSeconds >= allocatedSeconds * SESSION_COMPLETE_RATIO;
}

type SummaryWord = { term: string; meaning: string; example: string };
type SummaryPhrase = { phrase: string; meaning: string };
type SummaryGrammar = { point: string; explanation: string; example: string };

export type LessonSummary = {
  words: SummaryWord[];
  phrases: SummaryPhrase[];
  grammar: SummaryGrammar[];
};

export type TranscriptTurn = { role: "user" | "tutor"; text: string };

function buildPrompt(
  transcript: string,
  targetLanguage: string,
  unit?: CurriculumUnit,
): string {
  const unitLines: string[] = [];
  if (unit) {
    unitLines.push(
      `## This lesson's unit (from the curriculum — this defines what the lesson covers)`,
      `- Title (Arabic): ${unit.titleAr}`,
      `- Grammar focus (Arabic): ${unit.grammarAr}`,
      `- Vocabulary themes (Arabic): ${unit.vocabThemes.join(" / ")}`,
      `- Example phrases in Arabic for reference: ${unit.samplePhrases.join(" / ")}`,
      ``,
      `IMPORTANT: The summary must cover the UNIT's full content. Generate ${targetLanguage} words, phrases, and the grammar point for ALL the vocabulary themes above — even themes that were NOT discussed in the transcript. The transcript shows what was actually practiced; the unit outline defines what the learner is expected to learn in this lesson.`,
      ``,
    );
  }

  return [
    `You are creating a comprehensive study summary from a live voice language lesson.`,
    `The learner is a native Egyptian Arabic speaker learning ${targetLanguage}.`,
    `The tutor speaks Egyptian Arabic and teaches ${targetLanguage} inside it.`,
    ``,
    ...unitLines,
    `Here is the lesson transcript (tutor lines and learner lines):`,
    `<transcript>`,
    transcript,
    `</transcript>`,
    ``,
    `Extract comprehensive study material. Rules:`,
    `- 5 to 12 words: ${targetLanguage} words covering the unit's vocabulary themes (from the unit outline above), plus any extra words taught or practiced in the transcript. meaning = Egyptian Arabic translation. example = a simple ${targetLanguage} sentence using it.`,
    `- 3 to 6 phrases: useful full ${targetLanguage} phrases covering the unit themes plus anything practiced in the transcript. meaning = Egyptian Arabic meaning.`,
    `- 1 to 3 grammar points: ALWAYS include the unit's grammar focus (from the outline) even if it was not discussed in the transcript, plus any extra grammar touched in the conversation. explanation = short Egyptian Arabic explanation. example = a ${targetLanguage} example sentence.`,
    `- All meanings and explanations MUST be in Egyptian Arabic (spoken, not formal).`,
    `- Prefer the exact ${targetLanguage} words and sentences from the transcript when they exist (use them verbatim); generate natural ${targetLanguage} for the unit themes that were not covered.`,
    ``,
    `Respond with ONLY a valid JSON object, no markdown, no commentary, in exactly this shape:`,
    `{"words":[{"term":"","meaning":"","example":""}],"phrases":[{"phrase":"","meaning":""}],"grammar":[{"point":"","explanation":"","example":""}]}`,
  ].join("\n");
}

function pickText(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const candidates = (data as { candidates?: unknown[] }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const first = candidates[0] as { content?: { parts?: unknown[] } };
  const parts = first?.content?.parts;
  if (!Array.isArray(parts)) return null;
  for (const part of parts) {
    const text = (part as { text?: unknown }).text;
    if (typeof text === "string" && text.trim()) return text;
  }
  return null;
}

/** بينضّف JSON اللي رجّعه الموديل — بيتشال منه أي حروف زايدة قبل parsing. */
function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("no JSON object in model response");
  }
  return JSON.parse(trimmed.slice(start, end + 1));
}

function normalizeSummary(value: unknown): LessonSummary {
  const obj = (value ?? {}) as Record<string, unknown>;
  const asArray = <T>(v: unknown, map: (item: Record<string, unknown>) => T | null): T[] => {
    if (!Array.isArray(v)) return [];
    const out: T[] = [];
    for (const item of v) {
      if (item && typeof item === "object") {
        const mapped = map(item as Record<string, unknown>);
        if (mapped) out.push(mapped);
      }
    }
    return out;
  };

  const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

  return {
    words: asArray(obj.words, (w) => {
      const term = str(w.term);
      return term ? { term, meaning: str(w.meaning), example: str(w.example) } : null;
    }),
    phrases: asArray(obj.phrases, (p) => {
      const phrase = str(p.phrase);
      return phrase ? { phrase, meaning: str(p.meaning) } : null;
    }),
    grammar: asArray(obj.grammar, (g) => {
      const point = str(g.point);
      return point
        ? { point, explanation: str(g.explanation), example: str(g.example) }
        : null;
    }),
  };
}

async function callGemini(prompt: string): Promise<unknown> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${SUMMARY_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(SUMMARY_TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`summary generation failed (${response.status}): ${detail}`);
  }

  return response.json();
}

/**
 * بتولّد ملخص الجلسة من الـ transcript وبتحفظه مع تقدّم الوحدة.
 * بترجع الملخص لو اتحفظ، أو null لو الفشل (بتتسجّل في اللوج بس).
 *
 * بترجع null كمان لو الجلسة ما خلّصتش (أقل من ٦٠٪ من وقتها) —
 * مفيش ملخص لجلسة اتقفلت بدري.
 *
 * p_advance: بتتحسب من السيرفر — الجلسة اتصرفت ≥ 60% من وقتها.
 */
export async function generateAndSaveSummary(options: {
  sessionId: string;
  language: string;
  unitIndex: number;
  transcript: TranscriptTurn[];
  usedSeconds: number;
  allocatedMinutes: number;
}): Promise<LessonSummary | null> {
  const { sessionId, language, unitIndex, transcript, usedSeconds, allocatedMinutes } =
    options;

  if (transcript.length === 0) {
    return null;
  }

  // مفيش ملخص للجلسة اللي ما خلّصتش — ده سطر الحماية التاني (الأساسي
  // في نهاية الدرس).
  if (!isSessionComplete(usedSeconds, allocatedMinutes)) {
    console.log(
      `[lesson-summary] skipped (incomplete): ${usedSeconds}s of ${allocatedMinutes}m`,
    );
    return null;
  }

  const text = transcript
    .map((turn) => `${turn.role === "tutor" ? "Tutor" : "Learner"}: ${turn.text}`)
    .join("\n")
    .slice(-MAX_TRANSCRIPT_CHARS);

  // بنجيب خط الوحدة من المنهج عشان الملخص يشمل محتواها كامل —
  // حتى لو المدرّس والطالب ما اتكلموش في كل محاورها.
  let unit: CurriculumUnit | undefined;
  try {
    const planContext = await getLessonPlanContext(language as LanguageCode);
    if (planContext?.level) {
      unit = getUnit(planContext.level, unitIndex);
    }
  } catch (error) {
    console.error(
      "[lesson-summary] failed to load unit outline:",
      error instanceof Error ? error.message : error,
    );
  }

  try {
    const data = await callGemini(buildPrompt(text, language, unit));
    const raw = pickText(data);
    if (!raw) {
      console.error("[lesson-summary] empty model response");
      return null;
    }
    const summary = normalizeSummary(extractJson(raw));

    const allocatedSeconds = Math.max(1, allocatedMinutes * 60);
    const advance = usedSeconds >= allocatedSeconds * 0.6;

    const supabase = await createClient();
    const { error } = await supabase.rpc("save_lesson_summary", {
      p_session_id: sessionId,
      p_language: language,
      p_unit_index: unitIndex,
      p_words: summary.words,
      p_phrases: summary.phrases,
      p_grammar: summary.grammar,
      p_advance: advance,
    });

    if (error) {
      console.error("[lesson-summary] save failed:", error.message);
      return null;
    }

    return summary;
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[lesson-summary]", message);
    return null;
  }
}
