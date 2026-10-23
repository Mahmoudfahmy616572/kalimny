"use server";

import { updateTag } from "next/cache";

import { createClient } from "@/lib/supabase/server";

type AwardRow = {
  xp: number;
  streak: number;
  gained: number;
  total_sessions: number;
  total_minutes: number;
};

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

/**
 * بيمنح XP/ستريك بعد جلسة. الحساب كله في الدالة `award_xp` على السيرفر،
 * والعميل بيبعت الدقايق بس. بعد النجاح بنبطّل كاش قراءة الهيدر عشان
 * الرقم الجديد يبان فورًا.
 */
export async function awardXp(minutes: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false as const, error: "not_authenticated" };

  const safeMinutes = Number.isFinite(minutes)
    ? Math.min(180, Math.max(1, Math.round(minutes)))
    : 1;

  const { data, error } = await supabase.rpc("award_xp", {
    p_minutes: safeMinutes,
  });

  if (error) return { ok: false as const, error: error.message };

  const row = (Array.isArray(data) ? data[0] : data) as AwardRow | null;

  updateTag(`xp:${user.id}`);

  return {
    ok: true as const,
    xp: row?.xp ?? 0,
    streak: row?.streak ?? 0,
    gained: row?.gained ?? Math.max(10, safeMinutes * 2),
    totalSessions: row?.total_sessions ?? 0,
    totalMinutes: row?.total_minutes ?? 0,
  };
}
