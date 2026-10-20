import { NextResponse, after } from "next/server";

import { endLesson, voidLesson } from "@/lib/lessons/quota";
import {
  generateAndSaveSummary,
  isSessionComplete,
  type TranscriptTurn,
} from "@/lib/lessons/summary";
import { createClient } from "@/lib/supabase/server";

/**
 * تسوية نهاية الدرس: بتخصم الدقايق الفعلية بدل المحجوز.
 *
 * بتتنده من الواجهة عند إيقاف الدرس أو قفل الصفحة (sendBeacon)،
 * وعشان كده ما ترميش أخطاء للمستخدم — الأهم إنها تكون آمنة لو
 * وصلت أكتر من مرة أو ماوصلتش خالص (الدوال نفسها بتتعامل مع ده).
 *
 * لو الحقل `void` مبعوت، الدرس بيتلغى بالكامل والميزانية بترجع —
 * بنستخدمها لما الجلسة تفشل قبل ما تبدأ خالص.
 *
 * بعد التسوية بنولّد ملخص الجلسة (كلمات/جمل/قواعد) بـ Gemini في
 * خلفية الطلب (after) — عشان الرد يوصل فورًا والملخص ياخد وقته.
 * بس بنولّده بس لو الجلسة كاملة (صرفت ≥ ٦٠٪ من وقتها) — الرد بيرجع
 * `summaryStatus` عشان الواجهة تقول لليوزر إيه حكاية الملخص.
 */

const LANGUAGES = new Set(["en", "fr", "es", "de"]);

type EndBody = {
  sessionId?: unknown;
  usedSeconds?: unknown;
  void?: unknown;
  transcript?: unknown;
  language?: unknown;
  unitIndex?: unknown;
  lessonMinutes?: unknown;
};

type ParsedBody = {
  sessionId: string;
  usedSeconds: number;
  void: boolean;
  transcript: TranscriptTurn[];
  language: string | null;
  unitIndex: number;
  /** مدة الدرس المحجوزة — أساس حساب تقدّم الوحدة (≥60%) */
  lessonMinutes: number;
};

function readTranscript(value: unknown): TranscriptTurn[] {
  if (!Array.isArray(value)) return [];
  const turns: TranscriptTurn[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const { role, text } = item as { role?: unknown; text?: unknown };
    if (
      (role === "user" || role === "tutor") &&
      typeof text === "string" &&
      text.trim()
    ) {
      turns.push({ role, text: text.trim() });
    }
  }
  return turns;
}

function readBody(value: unknown): ParsedBody | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const body = value as EndBody;
  if (typeof body.sessionId !== "string" || body.sessionId.length === 0) {
    return null;
  }
  const seconds =
    typeof body.usedSeconds === "number" && Number.isFinite(body.usedSeconds)
      ? Math.max(0, Math.floor(body.usedSeconds))
      : 0;
  const language =
    typeof body.language === "string" && LANGUAGES.has(body.language)
      ? body.language
      : null;
  const unitIndex =
    typeof body.unitIndex === "number" &&
    Number.isFinite(body.unitIndex) &&
    body.unitIndex >= 0
      ? Math.floor(body.unitIndex)
      : 0;
  const lessonMinutes =
    typeof body.lessonMinutes === "number" &&
    Number.isFinite(body.lessonMinutes) &&
    body.lessonMinutes > 0
      ? Math.min(240, Math.floor(body.lessonMinutes))
      : 0;
  return {
    sessionId: body.sessionId,
    usedSeconds: seconds,
    void: body.void === true,
    transcript: readTranscript(body.transcript),
    language,
    unitIndex,
    lessonMinutes,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    raw = null;
  }

  const body = readBody(raw);
  if (!body) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    if (body.void) {
      const result = await voidLesson(body.sessionId);
      return NextResponse.json(
        { ok: true, voided: true, account: result.account, summaryStatus: "none" },
        { headers: { "cache-control": "no-store" } },
      );
    }

    const result = await endLesson(body.sessionId, body.usedSeconds);

    /**
     * حالة الملخص اللي بيرجع للواجهة:
     * - "pending": الجلسة كاملة (صرفت ≥ ٦٠٪ من وقتها) وفيها كلام → بتتولّد.
     * - "incomplete": اتقفلت قبل ما تخلّص → مفيش توليد خالص.
     * - "none": void أو مفيش transcript أو مفيش مدة → مفيش ملخص أصلًا.
     */
    const hasContent =
      Boolean(body.language) &&
      body.transcript.length > 0 &&
      body.lessonMinutes > 0;
    const summaryStatus: "pending" | "incomplete" | "none" = !result.ok
      ? "none"
      : !hasContent
        ? "none"
        : isSessionComplete(body.usedSeconds, body.lessonMinutes)
          ? "pending"
          : "incomplete";

    // توليد الملخص بـ Gemini في خلفية الطلب — الرد ما يستناهش،
    // والفشله ما يكسّرش تسوية الرصيد (بيتسجّل في اللوج بس).
    if (summaryStatus === "pending" && body.language) {
      const { sessionId, language, unitIndex, transcript, usedSeconds, lessonMinutes } =
        body;
      const userId = user.id;
      after(async () => {
        await generateAndSaveSummary({
          userId,
          sessionId,
          language,
          unitIndex,
          transcript,
          usedSeconds,
          allocatedMinutes: lessonMinutes,
        });
      });
    }

    return NextResponse.json(
      { ...result, summaryStatus },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[voice/lesson/end]", message);
    return NextResponse.json({ error: "settle_failed" }, { status: 500 });
  }
}
