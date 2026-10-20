"use server";

import { createClient } from "@/lib/supabase/server";

export async function getMistakes() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { words: [], phrases: [], grammar: [] };
  }

  const { data, error } = await supabase
    .from("lesson_summaries")
    .select("words, phrases, grammar, language, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return { words: [], phrases: [], grammar: [] };
  }

  const wordSet = new Map<string, any>();
  const phraseSet = new Map<string, any>();
  const grammarSet = new Map<string, any>();

  for (const row of data) {
    const words = Array.isArray(row.words) ? row.words : [];
    const phrases = Array.isArray(row.phrases) ? row.phrases : [];
    const grammar = Array.isArray(row.grammar) ? row.grammar : [];

    for (const w of words) {
      const key = typeof w === "string" ? w.toLowerCase() : JSON.stringify(w).toLowerCase();
      if (!wordSet.has(key)) wordSet.set(key, w);
    }
    for (const p of phrases) {
      const key = typeof p === "string" ? p.toLowerCase() : JSON.stringify(p).toLowerCase();
      if (!phraseSet.has(key)) phraseSet.set(key, p);
    }
    for (const g of grammar) {
      const key = typeof g === "string" ? g.toLowerCase() : JSON.stringify(g).toLowerCase();
      if (!grammarSet.has(key)) grammarSet.set(key, g);
    }
  }

  return {
    words: Array.from(wordSet.values()),
    phrases: Array.from(phraseSet.values()),
    grammar: Array.from(grammarSet.values()),
  };
}
