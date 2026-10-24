import {
  EXAM_BANKS,
  getSyllabusUnits,
  pickExamQuestions,
  type CefrLevel,
  type ExamQuestion,
  type LanguageCode,
} from "@kalimny/shared";

import { createAdminClient } from "@/lib/supabase/admin";

/**
 * اختبار ما بعد الجلسة: الوحدة واللغة والمستوى كلهم بيتقروا من السيرفر
 * (ملخص الجلسة، وبعدين تفضيلات المستخدم) — مش من الواجهة. كده الطالب ما
 * يقدرش يختار وحدة أسهل ولا مستوى تاني.
 *
 * الأسئلة بتتسحب بنفس seed لكل جلسة، فالطالب لو فتح الاختبار تاني يشوف
 * نفس الأسئلة، والإجابات الصح عمرها ما بتتبعت للواجهة.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_ANSWER_CHARS = 500;
const LANGUAGES = new Set(["en", "fr", "es", "de"]);

const STOPWORDS = new Set([
  "the", "and", "you", "your", "are", "is", "with", "for", "that", "this",
  "have", "has", "very", "just", "a", "an", "to", "of", "in", "on", "it",
  "he", "she", "we", "they", "i", "my", "me", "am", "his", "her", "its",
]);

export type ExamContext = { userId: string; sessionId: string };

export type PublicExamQuestion = Omit<ExamQuestion, "answer">;

export function parseExamContext(
  userId: string,
  input: Record<string, unknown>,
): ExamContext | null {
  const { sessionId } = input;
  if (typeof sessionId !== "string" || !UUID.test(sessionId)) return null;
  return { userId, sessionId };
}

type ResolvedUnit = {
  language: LanguageCode;
  level: CefrLevel;
  unitIndex: number;
  unitId: string;
  questions: ExamQuestion[];
};

function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function resolveUnit(
  supabase: ReturnType<typeof createAdminClient>,
  ctx: ExamContext,
): Promise<ResolvedUnit> {
  const { data: session, error: sessionError } = await supabase
    .from("lesson_sessions")
    .select("user_id")
    .eq("id", ctx.sessionId)
    .maybeSingle();
  if (sessionError) throw new Error(sessionError.message);
  if (!session || session.user_id !== ctx.userId) {
    throw new Error("session not found");
  }

  const { data: prefs, error: prefsError } = await supabase
    .from("user_preferences")
    .select("level")
    .eq("user_id", ctx.userId)
    .maybeSingle();
  if (prefsError) throw new Error(prefsError.message);
  const level = (prefs?.level ?? null) as CefrLevel | null;
  if (!level) throw new Error("no level set");

  const { data: summary, error: summaryError } = await supabase
    .from("lesson_summaries")
    .select("language, unit_index")
    .eq("session_id", ctx.sessionId)
    .maybeSingle();
  if (summaryError) throw new Error(summaryError.message);

  let language = summary?.language as LanguageCode | undefined;
  let unitIndex = summary?.unit_index as number | undefined;

  if (!language || !LANGUAGES.has(language) || unitIndex === undefined) {
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("language, unit_index")
      .eq("user_id", ctx.userId)
      .eq("level", level)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (progressError) throw new Error(progressError.message);
    if (!progress) throw new Error("no lesson context");
    language = progress.language as LanguageCode;
    unitIndex = progress.unit_index as number;
  }

  const unit = (getSyllabusUnits(language, level) ?? [])[unitIndex];
  if (!unit) throw new Error("unit not found");

  const bank = EXAM_BANKS[language]?.[unit.id];
  if (!bank) throw new Error("no exam bank for unit");

  return {
    language,
    level,
    unitIndex,
    unitId: unit.id,
    questions: pickExamQuestions(
      bank,
      seededRandom(seedFrom(`${ctx.sessionId}:${unit.id}`)),
    ),
  };
}

export async function getExamForSession(ctx: ExamContext) {
  const supabase = createAdminClient();
  const { language, level, unitIndex, unitId, questions } = await resolveUnit(
    supabase,
    ctx,
  );
  return {
    language,
    level,
    unitIndex,
    unitId,
    questions: questions.map((q) => ({
      id: q.id,
      kind: q.kind,
      prompt: q.prompt,
      ...(q.text ? { text: q.text } : {}),
      ...(q.options ? { options: q.options } : {}),
      ...(q.difficulty ? { difficulty: q.difficulty } : {}),
    })),
  };
}

const norm = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:'"’“”]/g, "")
    .replace(/\s+/g, " ");

function contentWords(s: string): string[] {
  return norm(s)
    .split(" ")
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

/** الكلام: بيتقبل لو ≥60% من الكلمات المهمة في الجملة المستهدفة موجودة. */
function speakingOk(target: string, given: string): boolean {
  const targetWords = contentWords(target);
  if (targetWords.length === 0) return norm(given) === norm(target);
  const heard = new Set(contentWords(given));
  const hits = targetWords.filter((w) => heard.has(w)).length;
  return hits / targetWords.length >= 0.6;
}

export type SubmitResult =
  | { status: "already_submitted" }
  | {
      status: "graded";
      outcome: "pass" | "partial" | "fail";
      scorePct: number;
      correct: number;
      total: number;
      attempts: number;
    };

export async function submitExam(
  ctx: ExamContext,
  answers: Record<string, string>,
): Promise<SubmitResult> {
  const supabase = createAdminClient();

  const { data: existing, error: existingError } = await supabase
    .from("lesson_exams")
    .select("session_id")
    .eq("session_id", ctx.sessionId)
    .maybeSingle();
  if (existingError) throw new Error(existingError.message);
  if (existing) return { status: "already_submitted" };

  const resolved = await resolveUnit(supabase, ctx);

  const details = resolved.questions.map((q) => {
    const given = Object.prototype.hasOwnProperty.call(answers, q.id)
      ? answers[q.id]
      : "";
    const ok =
      q.kind === "speaking"
        ? speakingOk(q.answer, given)
        : norm(given) === norm(q.answer);
    return { id: q.id, kind: q.kind, ok };
  });
  const correct = details.filter((d) => d.ok).length;

  const { data, error } = await supabase.rpc("record_exam_result_for_user", {
    p_user_id: ctx.userId,
    p_session_id: ctx.sessionId,
    p_language: resolved.language,
    p_level: resolved.level,
    p_unit_index: resolved.unitIndex,
    p_correct: correct,
    p_total: details.length,
    p_details: details,
  });
  if (error) throw new Error(error.message);

  const row = Array.isArray(data) ? data[0] : data;
  return {
    status: "graded",
    outcome: row.outcome as "pass" | "partial" | "fail",
    scorePct: row.score_pct as number,
    correct,
    total: details.length,
    attempts: Number(row.attempts ?? 1),
  };
}

export function sanitizeAnswers(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const out: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (typeof raw !== "string") continue;
    out[key] = raw.slice(0, MAX_ANSWER_CHARS);
  }
  return out;
}
