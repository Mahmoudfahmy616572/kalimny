"use server";

import { createClient } from "@/lib/supabase/server";

export async function getFlashcards() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data } = await supabase
    .from("lesson_summaries")
    .select("words, phrases")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!data) return [];

  const cards = new Map<string, { term: string; type: "word" | "phrase" }>();

  for (const row of data) {
    const words = Array.isArray(row.words) ? row.words : [];
    const phrases = Array.isArray(row.phrases) ? row.phrases : [];

    for (const w of words) {
      const term = typeof w === "string" ? w.trim() : JSON.stringify(w);
      if (!term) continue;
      const key = term.toLowerCase();
      if (!cards.has(key)) cards.set(key, { term, type: "word" });
    }
    for (const p of phrases) {
      const term = typeof p === "string" ? p.trim() : JSON.stringify(p);
      if (!term) continue;
      const key = term.toLowerCase();
      if (!cards.has(key)) cards.set(key, { term, type: "phrase" });
    }
  }

  return Array.from(cards.values()).slice(0, 50);
}
