"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSessionRecap(language: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "";

  const { data: summaries } = await supabase
    .from("lesson_summaries")
    .select("words, phrases, grammar, language, created_at")
    .eq("user_id", user.id)
    .eq("language", language)
    .order("created_at", { ascending: false })
    .limit(2);

  if (!summaries || summaries.length === 0) return "";

  const parts: string[] = [];
  parts.push("## MEMORY BETWEEN SESSIONS (VERY IMPORTANT)");
  parts.push("You MUST remember the learner from previous sessions. Act like you've spoken before.");
  
  for (let i = 0; i < summaries.length; i++) {
    const s = summaries[i];
    const words = Array.isArray(s.words) ? s.words.slice(0, 5) : [];
    const phrases = Array.isArray(s.phrases) ? s.phrases.slice(0, 3) : [];
    parts.push(`\n### Last session ${i === 0 ? "(most recent)" : "(older)"}:`);
    if (words.length) parts.push(`- Words learned: ${words.join(", ")}`);
    if (phrases.length) parts.push(`- Useful phrases: ${phrases.join(", ")}`);
  }
  
  parts.push("\n- Start naturally: \"إزيك؟ فاكر لما كنا بنتكلم المرة اللي فاتت عن...\" or reference something from above.");
  parts.push("- Don't start from scratch. Pick up where you left off naturally.");
  parts.push("- Be subtle, don't list everything like a robot.");
  
  return parts.join("\n");
}
