"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

export type OnboardingState = {
  error: string | null;
};

const onboardingSchema = z.object({
  language: z.enum(["en", "fr", "es", "de"]),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  goal: z.enum(["travel", "work", "immigration", "hobby", "social"]),
  interests: z
    .array(z.enum(["sports", "movies", "cooking", "tech", "music", "travel", "business"]))
    .min(1, "اختار اهتمام واحد على الأقل")
    .max(3, "اختار 3 اهتمامات كحد أقصى"),
  dailyMinutes: z.coerce
    .number()
    .int()
    .min(5, "الوقت لازم يكون 5 دقايق على الأقل")
    .max(240, "الوقت كبير شوية"),
});

export async function saveOnboardingAction(
  _prev: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const rawInterests = formData.getAll("interests");
  const parsed = onboardingSchema.safeParse({
    language: formData.get("language"),
    level: formData.get("level"),
    goal: formData.get("goal"),
    interests: rawInterests,
    dailyMinutes: formData.get("dailyMinutes"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "بيانات غير صحيحة",
    };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    redirect("/login");
  }

  const { error } = await supabase.rpc("save_user_preferences", {
    p_language: parsed.data.language,
    p_level: parsed.data.level,
    p_goal: parsed.data.goal,
    p_interests: parsed.data.interests,
    p_daily_minutes: parsed.data.dailyMinutes,
  });

  if (error) {
    console.error("[onboarding] save_user_preferences failed:", error.message);
    return { error: "حصل خطأ في الحفظ — جرّب تاني" };
  }

  redirect("/");
}
