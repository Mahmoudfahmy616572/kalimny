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

  if (!data) return { xp: 0, streak: 0, lastDate: null };

  return { xp: data.xp || 0, streak: data.streak || 0, lastDate: data.last_session_date };
}

export async function getXpFull() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { xp: 0, streak: 0, lastDate: null, sessions: 0, totalMinutes: 0, firstSession: null, lastSession: null };

  const { data } = await supabase
    .from("user_xp")
    .select("xp, streak, last_session_date, total_sessions, total_minutes, first_session_at, last_session_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) return { xp: 0, streak: 0, lastDate: null, sessions: 0, totalMinutes: 0, firstSession: null, lastSession: null };

  return {
    xp: data.xp || 0,
    streak: data.streak || 0,
    lastDate: data.last_session_date,
    sessions: data.total_sessions || 0,
    totalMinutes: data.total_minutes || 0,
    firstSession: data.first_session_at,
    lastSession: data.last_session_at,
  };
}
