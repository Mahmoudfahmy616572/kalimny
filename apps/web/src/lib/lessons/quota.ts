import "server-only";

import {
  TRIAL_LESSONS,
  TRIAL_LESSON_MINUTES,
} from "@kalimny/shared";

import { createClient } from "@/lib/supabase/server";

/**
 * الواجهة الوحيدة للتعامل مع رصيد الدروس.
 *
 * كل الحسابات بتتم في قاعدة البيانات (دوال ذرّية بـ SECURITY DEFINER)،
 * والملف ده مجرد غلاف بيحوّل نتيجة الـ RPC لأشكال واضحة للكود اللي فوق.
 * مفيش أي حساب رصيد في TypeScript — عشان ما يبقاش فيه مصدرين للحقيقة.
 */

/** رصيد المستخدم الحالي. */
export type LessonAccount = {
  trialLessonsLeft: number;
  paidMinutesLeft: number;
  periodEnd: string | null;
  hasActivePlan: boolean;
};

/** أسباب رفض فتح درس — بتوجّه الواجهة للإجراء الصح. */
export type StartRejection =
  | "no_credit"
  | "insufficient_minutes"
  | "trial_requires_minutes";

export const EMPTY_ACCOUNT: LessonAccount = {
  trialLessonsLeft: TRIAL_LESSONS,
  paidMinutesLeft: 0,
  periodEnd: null,
  hasActivePlan: false,
};

type AccountRow = {
  trial_lessons_left: number | null;
  paid_minutes_left: number | null;
  paid_period_end: string | null;
  has_active_plan: boolean | null;
};

type StartRow = AccountRow & {
  ok: boolean;
  session_id: string | null;
  source: string | null;
  message: string | null;
};

type EndRow = AccountRow & {
  ok: boolean;
  charged_minutes: number | null;
  message: string | null;
};

type VoidRow = AccountRow & {
  ok: boolean;
  message: string | null;
};

export type StartLessonResult =
  | { ok: true; sessionId: string; source: "trial" | "paid"; account: LessonAccount }
  | { ok: false; reason: StartRejection | string; account: LessonAccount };

export type EndLessonResult = {
  ok: boolean;
  chargedMinutes: number;
  account: LessonAccount;
  reason: string;
};

export type VoidLessonResult = {
  ok: boolean;
  account: LessonAccount;
  reason: string;
};

/** بياخد أول صف من نتيجة الـ RPC (الدوال بترجع row واحد). */
function firstRow<T>(data: unknown): T | undefined {
  if (Array.isArray(data)) {
    return data[0] as T | undefined;
  }
  return data as T | undefined;
}

function toAccount(row: AccountRow | undefined): LessonAccount {
  return {
    trialLessonsLeft: row?.trial_lessons_left ?? 0,
    paidMinutesLeft: row?.paid_minutes_left ?? 0,
    periodEnd: row?.paid_period_end ?? null,
    hasActivePlan: row?.has_active_plan === true,
  };
}

/** يقرا رصيد المستخدم الحالي (وبنشئ الحساب لو أول استخدام). */
export async function getLessonAccount(): Promise<LessonAccount> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_lesson_account", {
    p_trial_lessons: TRIAL_LESSONS,
  });

  if (error) {
    throw new Error(`get_lesson_account failed: ${error.message}`);
  }

  return toAccount(firstRow<AccountRow>(data));
}

/**
 * بيحجز مدة الدرس ويفتح درس جديد، ويختار المصدر (اشتراك/تجربة) جوه الدالة.
 * ذرّي: لو الطالب فتح تابين في نفس اللحظة، واحد بس هينجح.
 */
export async function startLesson(minutes: number): Promise<StartLessonResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("start_lesson", {
    p_minutes: minutes,
    p_trial_minutes: TRIAL_LESSON_MINUTES,
    p_trial_lessons: TRIAL_LESSONS,
  });

  if (error) {
    throw new Error(`start_lesson failed: ${error.message}`);
  }

  const row = firstRow<StartRow>(data);
  if (!row) {
    throw new Error("start_lesson returned no row");
  }

  const account = toAccount(row);

  if (!row.ok || !row.session_id) {
    return {
      ok: false,
      reason: row.message ?? "insufficient_minutes",
      account,
    };
  }

  return {
    ok: true,
    sessionId: row.session_id,
    source: row.source === "trial" ? "trial" : "paid",
    account,
  };
}

/**
 * يقفل درس ويخصم الدقايق الفعلية بدل المحجوز (للمدفوع).
 * آمنة لو اتندهت أكتر من مرة — المرة التانية بترجع بدون خصم.
 */
export async function endLesson(
  sessionId: string,
  usedSeconds: number,
): Promise<EndLessonResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("end_lesson", {
    p_session_id: sessionId,
    p_used_seconds: Math.max(0, Math.floor(usedSeconds)),
  });

  if (error) {
    throw new Error(`end_lesson failed: ${error.message}`);
  }

  const row = firstRow<EndRow>(data);
  if (!row) {
    throw new Error("end_lesson returned no row");
  }

  return {
    ok: row.ok,
    chargedMinutes: row.charged_minutes ?? 0,
    account: toAccount(row),
    reason: row.message ?? "unknown",
  };
}

/**
 * يلغي درس ما اشتغلش خالص ويرجّع المحجوز للمصدر بتاعه.
 * بنستخدمها لو إصدار التوكن فشل بعد الحجز أو قبل ما الصوت يشتغل.
 */
export async function voidLesson(sessionId: string): Promise<VoidLessonResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("void_lesson", {
    p_session_id: sessionId,
  });

  if (error) {
    throw new Error(`void_lesson failed: ${error.message}`);
  }

  const row = firstRow<VoidRow>(data);
  if (!row) {
    throw new Error("void_lesson returned no row");
  }

  return {
    ok: row.ok === true,
    account: toAccount(row),
    reason: row.message ?? "unknown",
  };
}
