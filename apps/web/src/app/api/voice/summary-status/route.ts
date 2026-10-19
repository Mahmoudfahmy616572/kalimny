import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * هل ملخص الجلسة اتحفظ فعلاً؟
 *
 * الواجهة بتسألها كل شوية بعد نهاية الجلسة عشان تقلب كارت الملخص من
 * "بنجهّز" لـ "جاهز" بأمانة — التوليد بياخد ثواني لحد ٤٥ ثانية في
 * الحالة القصوى، فمبنخمّنش وقت اكتماله.
 *
 * الحماية: auth + را إل إس (بترجّع صفوف المستخدم نفسه بس) — فالرد
 * "مش جاهز" برضه لو حد حاول يسأل على جلسة غيره.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("lesson_summaries")
    .select("id, language")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) {
    console.error("[voice/summary-status]", error.message);
    return NextResponse.json({ error: "lookup_failed" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json(
      { ready: false },
      { headers: { "cache-control": "no-store" } },
    );
  }

  // بنرجّع رقم الوحدة الحالي كمان — الواجهة تحدّث بيها خريطة التقدّم
  // من غير ما نخمّن إذا كانت الجلسة اتقدّمت فعلًا ولا لأ.
  const { data: progress } = await supabase
    .from("user_progress")
    .select("unit_index")
    .eq("user_id", user.id)
    .eq("language", data.language)
    .maybeSingle();

  return NextResponse.json(
    { ready: true, unitIndex: progress?.unit_index ?? undefined },
    { headers: { "cache-control": "no-store" } },
  );
}
