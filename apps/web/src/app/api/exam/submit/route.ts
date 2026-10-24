import { NextResponse } from "next/server";

import {
  parseExamContext,
  sanitizeAnswers,
  submitExam,
} from "@/lib/lessons/exam";
import { createClient } from "@/lib/supabase/server";

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
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  const ctx = parseExamContext(user.id, body);
  const answers = sanitizeAnswers(body.answers);
  if (!ctx || !answers) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const result = await submitExam(ctx, answers);
    if (result.status === "already_submitted") {
      return NextResponse.json(
        { error: "already_submitted" },
        { status: 409, headers: { "cache-control": "no-store" } },
      );
    }
    return NextResponse.json(result, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[exam] submit failed:", message);
    if (message.includes("attempt limit reached")) {
      return NextResponse.json({ error: "attempt_limit" }, { status: 429 });
    }
    return NextResponse.json({ error: "submit_failed" }, { status: 500 });
  }
}
