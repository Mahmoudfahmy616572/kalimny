"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * ذاكرة آخر جلستين — بتتبني في الداتابيز نفسها (SQL) عشان النقل يكون
 * صغير: كنا بنسحب أعمدة words/phrases/grammar كاملة لجلستين وبنقصّها
 * بعدين في السيرفر.
 */
export async function getSessionRecap(language: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "";

  const { data, error } = await supabase.rpc("get_session_recap_text", {
    p_language: language,
  });

  if (error) {
    console.error("[recap] get_session_recap_text failed:", error.message);
    return "";
  }

  return typeof data === "string" ? data : "";
}
