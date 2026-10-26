"use server";

import type {
  SummaryGrammar,
  SummaryPhrase,
  SummaryWord,
} from "@/lib/lessons/summary-content";
import {
  readSummaryGrammar,
  readSummaryPhrase,
  readSummaryWord,
} from "@/lib/lessons/summary-content";
import { createClient } from "@/lib/supabase/server";

export type Mistakes = {
  words: SummaryWord[];
  phrases: SummaryPhrase[];
  grammar: SummaryGrammar[];
};

const EMPTY: Mistakes = { words: [], phrases: [], grammar: [] };

export async function getMistakes(): Promise<Mistakes> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return EMPTY;
  }

  const { data, error } = await supabase
    .from("lesson_summaries")
    .select("words, phrases, grammar, language, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return EMPTY;
  }

  const wordSet = new Map<string, SummaryWord>();
  const phraseSet = new Map<string, SummaryPhrase>();
  const grammarSet = new Map<string, SummaryGrammar>();

  for (const row of data) {
    const words = Array.isArray(row.words) ? row.words : [];
    const phrases = Array.isArray(row.phrases) ? row.phrases : [];
    const grammar = Array.isArray(row.grammar) ? row.grammar : [];

    for (const raw of words) {
      const word = readSummaryWord(raw);
      if (!word) continue;
      const key = word.term.toLowerCase();
      if (!wordSet.has(key)) wordSet.set(key, word);
    }

    for (const raw of phrases) {
      const phrase = readSummaryPhrase(raw);
      if (!phrase) continue;
      const key = phrase.phrase.toLowerCase();
      if (!phraseSet.has(key)) phraseSet.set(key, phrase);
    }

    for (const raw of grammar) {
      const point = readSummaryGrammar(raw);
      if (!point) continue;
      const key = point.point.toLowerCase();
      if (!grammarSet.has(key)) grammarSet.set(key, point);
    }
  }

  return {
    words: Array.from(wordSet.values()),
    phrases: Array.from(phraseSet.values()),
    grammar: Array.from(grammarSet.values()),
  };
}
