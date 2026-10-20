import "server-only";

import { createHash, randomInt } from "node:crypto";

import { sendOtpEmail } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/admin";

const OTP_TTL_SECONDS = 600;
const OTP_LENGTH = 4;

function hashCode(email: string, code: string): string {
  // الـ hash مربوط بالإيميل عشان كود واحد مايصلحش لإيميل تاني.
  return createHash("sha256")
    .update(`${email.toLowerCase().trim()}:${code}`)
    .digest("hex");
}

function generateCode(): string {
  // 4 أرقام مع الحفاظ على الأصفار البادئة (0000–9999).
  const n = randomInt(0, 10 ** OTP_LENGTH);
  return n.toString().padStart(OTP_LENGTH, "0");
}

/**
 * بيولّد كود 4 أرقام، بيخزّن الـ hash في قاعدة البيانات، وبيبعته بالإيميل.
 * السيرفر بس بينده الدالة دي (بعد إنشاء الحساب).
 */
export async function issueEmailOtp(params: {
  email: string;
  userId: string;
  displayName: string | null;
}): Promise<void> {
  const email = params.email.toLowerCase().trim();
  const code = generateCode();
  const codeHash = hashCode(email, code);

  const admin = createAdminClient();
  const { error } = await admin.rpc("create_email_otp", {
    p_email: email,
    p_user_id: params.userId,
    p_code_hash: codeHash,
    p_ttl_seconds: OTP_TTL_SECONDS,
  });

  if (error) {
    throw new Error(`failed to store otp: ${error.message}`);
  }

  // بنبعت بعد ما نضمن إن الكود اتخزّن — لو الإرسال فشل، المستخدم يقدر
  // يطلب كود جديد من صفحة التحقق.
  await sendOtpEmail({ to: email, code, displayName: params.displayName });
}

/** بيرجّع الـ user_id لو البريد موجود في الحسابات (لإعادة الإرسال). */
export async function findUserIdByEmail(email: string): Promise<string | null> {
  const admin = createAdminClient();
  const normalized = email.toLowerCase().trim();
  let page = 1;
  // الحسابات بتتقسم 50/صفحة — بندوّر لحد ما نلاقي الإيميل.
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: 200,
    });
    if (error) throw new Error(`failed to list users: ${error.message}`);
    const found = data.users.find((u) => u.email?.toLowerCase() === normalized);
    if (found) return found.id;
    if (data.users.length < 200) return null;
    page += 1;
  }
}

export type VerifyOtpFailureReason =
  | "invalid"
  | "expired"
  | "too_many_attempts"
  | "not_found";

export type VerifyOtpResult =
  | { ok: true; userId: string }
  | { ok: false; reason: VerifyOtpFailureReason };

const FAILURE_REASONS: readonly VerifyOtpFailureReason[] = [
  "invalid",
  "expired",
  "too_many_attempts",
  "not_found",
];

export async function verifyEmailOtp(params: {
  email: string;
  code: string;
}): Promise<VerifyOtpResult> {
  const email = params.email.toLowerCase().trim();
  const codeHash = hashCode(email, params.code);

  const admin = createAdminClient();
  const { data, error } = await admin.rpc("consume_email_otp", {
    p_email: email,
    p_code_hash: codeHash,
  });

  if (error) {
    throw new Error(`failed to verify otp: ${error.message}`);
  }

  const row = (Array.isArray(data) ? data[0] : data) as
    | { result: string; user_id: string | null }
    | null;

  const result = row?.result ?? "not_found";
  if (result === "ok" && row?.user_id) {
    return { ok: true, userId: row.user_id };
  }
  return {
    ok: false,
    reason: FAILURE_REASONS.includes(result as VerifyOtpFailureReason)
      ? (result as VerifyOtpFailureReason)
      : "not_found",
  };
}

/**
 * بيأكّد الإيميل في Supabase عبر Admin API (بديل رابط التأكيد).
 * بعد كده المستخدم يقدر يسجّل دخول بالبريد وكلمة المرور.
 */
export async function confirmUserEmail(userId: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(userId, {
    email_confirm: true,
  });
  if (error) {
    throw new Error(`failed to confirm email: ${error.message}`);
  }
}

export { hashCode, generateCode, OTP_LENGTH, OTP_TTL_SECONDS };
