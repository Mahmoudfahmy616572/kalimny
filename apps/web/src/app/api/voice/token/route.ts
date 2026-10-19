import { NextResponse } from "next/server";

import {
  GEMINI_LIVE_MODEL,
  MAX_LESSON_MINUTES,
  normalizeLessonMinutes,
} from "@kalimny/shared";

import { startLesson, voidLesson } from "@/lib/lessons/quota";
import { createClient } from "@/lib/supabase/server";

const TOKEN_URL = "https://generativelanguage.googleapis.com/v1beta/auth_tokens";

function iso(offsetMs: number): string {
  return new Date(Date.now() + offsetMs).toISOString().replace(/\.\d{3}Z$/, "Z");
}

async function createEphemeralToken(lessonMinutes: number): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // يسمح ببدء جلسة واحدة فقط — يمنع إعادة استخدام التوكن.
      // استئناف الجلسة بعد قطع اتصال مش بيعدّ استخدام، فكده الحصة
      // الطويلة بتفضل شغالة بنفس التوكن، ومن غير ما تتحسب مرتين.
      uses: 1,
      // عمر التوكن = مدة الدرس + هامش بسيط، وأقصى حاجة 90 دقيقة.
      expireTime: iso(Math.min(lessonMinutes + 5, MAX_LESSON_MINUTES) * 60 * 1000),
      // نافذة بدء الجلسة واستئنافها: نديها مساحة كافية تكفي حصة كاملة،
      // عشان قطع مؤقت ميفضّلش ينهي الحصة بعد ما الجلسة اشتغلت.
      newSessionExpireTime: iso(10 * 60 * 1000),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`token issue failed (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { name?: string };
  if (!data.name) {
    throw new Error("token issue failed: empty token");
  }
  return data.name;
}

/** المدة المطلوبة من العميل — مفيش ثقة في أي رقم جاي من بره. */
function readMinutes(body: unknown): number {
  if (body && typeof body === "object" && "minutes" in body) {
    return normalizeLessonMinutes((body as { minutes: unknown }).minutes);
  }
  return normalizeLessonMinutes(undefined);
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

/**
 * يصدر توكن قصير العمر لجلسة صوتية واحدة. المفتاح الأساسي لا يغادر السيرفر أبدًا.
 * ودي بوابة الميزانية: مفيش توكن = مفيش جلسة صوت أصلًا.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const lessonMinutes = readMinutes(await readJson(request));

  let started: Awaited<ReturnType<typeof startLesson>>;
  try {
    started = await startLesson(lessonMinutes);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[voice/token] quota", message);
    return NextResponse.json({ error: "quota_check_failed" }, { status: 500 });
  }

  if (!started.ok) {
    return NextResponse.json(
      {
        error: "quota_exhausted",
        reason: started.reason,
        account: started.account,
        lessonMinutes,
      },
      { status: 403, headers: { "cache-control": "no-store" } },
    );
  }

  try {
    const token = await createEphemeralToken(lessonMinutes);
    return NextResponse.json(
      {
        token,
        model: GEMINI_LIVE_MODEL,
        lessonMinutes,
        sessionId: started.sessionId,
        source: started.source,
        account: started.account,
        expiresInSeconds: 600,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[voice/token]", message);

    // التوكن فشل بعد ما حجزنا الميزانية — نلغي الحجز بالكامل عشان
    // الطالب ما يتحسبش عليه درس ما اشتغلش أصلًا.
    try {
      await voidLesson(started.sessionId);
    } catch (releaseError) {
      const detail =
        releaseError instanceof Error ? releaseError.message : "unknown error";
      console.error("[voice/token] release failed", detail);
    }

    return NextResponse.json({ error: "token_issue_failed" }, { status: 502 });
  }
}
