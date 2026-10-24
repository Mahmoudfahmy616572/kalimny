import { NextResponse } from "next/server";

import { getExamForSession, parseExamContext } from "@/lib/lessons/exam";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const ctx = parseExamContext(user.id, Object.fromEntries(url.searchParams));
  if (!ctx) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const exam = await getExamForSession(ctx);
    return NextResponse.json(exam, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[exam] load failed:", message);
    const notFound = message === "no exam bank for unit" || message === "unit not found";
    return NextResponse.json(
      { error: notFound ? "no_exam" : "exam_unavailable" },
      { status: notFound ? 404 : 500 },
    );
  }
}
