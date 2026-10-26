"use server";

import type { Flashcard } from "@/lib/lessons/summary-content";
import {
  readSummaryPhrase,
  readSummaryWord,
} from "@/lib/lessons/summary-content";
import { createClient } from "@/lib/supabase/server";

export async function getFlashcards(): Promise<Flashcard[]> {
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

  const cards = new Map<string, Flashcard>();

  for (const row of data) {
    const words = Array.isArray(row.words) ? row.words : [];
    const phrases = Array.isArray(row.phrases) ? row.phrases : [];

    for (const raw of words) {
      const word = readSummaryWord(raw);
      if (!word) continue;
      const key = `w:${word.term.toLowerCase()}`;
      if (!cards.has(key)) {
        cards.set(key, {
          term: word.term,
          meaning: word.meaning,
          example: word.example,
          type: "word",
        });
      }
    }

    for (const raw of phrases) {
      const phrase = readSummaryPhrase(raw);
      if (!phrase) continue;
      const key = `p:${phrase.phrase.toLowerCase()}`;
      if (!cards.has(key)) {
        cards.set(key, {
          term: phrase.phrase,
          meaning: phrase.meaning,
          example: "",
          type: "phrase",
        });
      }
    }
  }

  return Array.from(cards.values()).slice(0, 50);
}
