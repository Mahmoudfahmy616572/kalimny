import "server-only";

import {
  type CefrLevel,
  type GoalId,
  type InterestId,
  type LanguageCode,
} from "@kalimny/shared";

import { createClient } from "@/lib/supabase/server";

export type UserPreferences = {
  language: LanguageCode;
  level: CefrLevel;
  goal: GoalId;
  interests: InterestId[];
  dailyMinutes: number;
  onboarded: boolean;
  /** الشخصية المختارة من الرئيسية (null لو ما اختارش لسه). */
  personaId: string | null;
};

/**
 * بيقرا تفضيلات المستخدم من الداتابيس. بيرجّع null لو لسه ما عملش
 * onboarding (أو مش مسجّل دخول).
 */
export async function getUserPreferences(): Promise<UserPreferences | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return null;
  }

  const { data: row } = await supabase
    .from("user_preferences")
    .select(
      "language, level, goal, interests, daily_minutes, onboarded, persona_id",
    )
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!row || !row.onboarded) {
    return null;
  }

  return {
    language: row.language as LanguageCode,
    level: row.level as CefrLevel,
    goal: row.goal as GoalId,
    interests: (row.interests ?? []) as InterestId[],
    dailyMinutes: row.daily_minutes as number,
    onboarded: true,
    personaId: (row.persona_id as string | null) ?? null,
  };
}

export type LessonPlanContext = {
  onboarded: boolean;
  language: LanguageCode;
  level: CefrLevel | null;
  goal: GoalId | null;
  interests: string[];
  dailyMinutes: number | null;
  unitIndex: number;
  recapWords: string[];
  /** الشخصية اللي المستخدم اختارها من الرئيسية (null لو ما اختارش). */
  personaId: string | null;
};

/**
 * سياق الجلسة: تفضيلات + رقم الوحدة الحالية + أهم كلمات آخر ملخص
 * (عشان المدرّس يرجع يفتّكر آخر جلسة).
 */
export async function getLessonPlanContext(
  language: LanguageCode,
): Promise<LessonPlanContext | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return null;
  }

  const { data: rows } = await supabase.rpc("get_lesson_plan_context", {
    p_language: language,
  });

  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row) {
    return null;
  }

  return {
    onboarded: Boolean(row.onboarded),
    language: row.language as LanguageCode,
    level: (row.level as CefrLevel | null) ?? null,
    goal: (row.goal as GoalId | null) ?? null,
    interests: (row.interests ?? []) as string[],
    dailyMinutes: (row.daily_minutes as number | null) ?? null,
    unitIndex: (row.unit_index as number | null) ?? 0,
    recapWords: Array.isArray(row.recap_words)
      ? (row.recap_words as string[]).filter((w): w is string => typeof w === "string")
      : [],
    personaId: (row.persona_id as string | null) ?? null,
  };
}
