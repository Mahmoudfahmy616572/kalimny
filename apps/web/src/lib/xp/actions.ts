"use server";

import { createClient } from "@/lib/supabase/server";

export async function getXp() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { xp: 0, streak: 0, lastDate: null };

  const { data } = await supabase
    .from("user_xp")
    .select("xp, streak, last_session_date")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    await supabase.from("user_xp").insert({ user_id: user.id, xp: 0, streak: 0 });
    return { xp: 0, streak: 0, lastDate: null };
  }

  return { xp: data.xp || 0, streak: data.streak || 0, lastDate: data.last_session_date };
}

export async function awardXp(minutes: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const gained = Math.max(10, Math.round(minutes * 2));
  const today = new Date().toISOString().slice(0, 10);

  const { data: existing } = await supabase
    .from("user_xp")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("user_xp").insert({
      user_id: user.id,
      xp: gained,
      streak: 1,
      last_session_date: today,
    });
    return;
  }

  const last = existing.last_session_date;
  let streak = existing.streak || 0;

  if (last === today) {
    await supabase
      .from("user_xp")
      .update({ xp: (existing.xp || 0) + gained })
      .eq("user_id", user.id);
    return;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (last === yesterday) {
    streak = (existing.streak || 0) + 1;
  } else {
    streak = 1;
  }

  await supabase
    .from("user_xp")
    .update({ xp: (existing.xp || 0) + gained, streak, last_session_date: today })
    .eq("user_id", user.id);
}
