"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * بيحفظ اختيار المستوى (واللغة اختياريًا) من الرئيسية.
 * بيستدعي من الـ client بعد تغيير أي من المؤشرين — بيخلي خريطة
 * التقدّم تتحوّل للمستوى المختار فورًا بدل ما تفضل عالقة بالمستوى القديم.
 */
export async function saveHomePreferences(input: {
  level: string;
  language?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("save_home_preferences", {
      p_level: input.level,
      p_language: input.language ?? null,
    });
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
