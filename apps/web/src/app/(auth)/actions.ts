"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  confirmUserEmail,
  findUserIdByEmail,
  issueEmailOtp,
  OTP_LENGTH,
  verifyEmailOtp,
} from "@/lib/otp";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error: string | null;
  message: string | null;
};

const credentialsSchema = z.object({
  email: z.email("اكتب بريد إلكتروني صحيح"),
  password: z.string().min(8, "كلمة المرور لازم تكون ٨ أحرف على الأقل"),
});

const signUpSchema = credentialsSchema.extend({
  displayName: z
    .string()
    .trim()
    .min(2, "اكتب اسمك (حرفين على الأقل)")
    .max(40, "الاسم طويل شوية"),
});

const otpSchema = z.object({
  email: z.email("بريد غير صحيح"),
  code: z
    .string()
    .trim()
    .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `الكود لازم يكون ${OTP_LENGTH} أرقام`),
});

export async function signInAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "بيانات غير صحيحة",
      message: null,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    // لو الحساب موجود بس الإيميل مش متأكد، نوجّهه لصفحة الكود بدل ما
    // نقوله "كلمة المرور غلط" وهو ممكن يكون صح.
    if (/not confirmed|email not confirmed/i.test(error.message)) {
      const email = parsed.data.email.toLowerCase().trim();
      redirect(`/verify?email=${encodeURIComponent(email)}`);
    }
    return { error: "البريد الإلكتروني أو كلمة المرور غلط", message: null };
  }

  redirect("/");
}

export async function signUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "بيانات غير صحيحة",
      message: null,
    };
  }

  const email = parsed.data.email.toLowerCase().trim();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
    },
  });

  if (error) {
    return { error: error.message, message: null };
  }

  // لو تأكيد الإيميل مطفي في Supabase، بيرجّع session على طول ونكمّل.
  if (data.session) {
    redirect("/onboarding");
  }

  if (!data.user) {
    return { error: "معرفناش نعمل الحساب، جرّب تاني.", message: null };
  }

  // غير كده، بنبعت كود التحقق بتاعنا (4 أرقام) ونوجّهه لصفحة الكود.
  try {
    await issueEmailOtp({
      email,
      userId: data.user.id,
      displayName: parsed.data.displayName,
    });
  } catch (otpError) {
    console.error("[signUpAction] otp send failed", otpError);
    return {
      error: "الحساب اتعمل بس معرفناش نبعت الكود — جرّب من صفحة التحقق.",
      message: null,
    };
  }

  redirect(`/verify?email=${encodeURIComponent(email)}`);
}

/**
 * التحقق من كود الـ OTP: لو صح بنأكّد الإيميل في Supabase وندخّله.
 */
export async function verifyOtpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = otpSchema.safeParse({
    email: formData.get("email"),
    code: formData.get("code"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "كود غير صحيح",
      message: null,
    };
  }

  const email = parsed.data.email.toLowerCase().trim();
  let result;
  try {
    result = await verifyEmailOtp({ email, code: parsed.data.code });
  } catch (verifyError) {
    console.error("[verifyOtpAction] verify failed", verifyError);
    return { error: "حصلت مشكلة، جرّب تاني.", message: null };
  }

  if (!result.ok) {
    const messages: Record<typeof result.reason, string> = {
      invalid: "الكود غلط — جرّب تاني.",
      expired: "الكود انتهت صلاحيته — ابعته تاني.",
      too_many_attempts: "محاولات كتير غلط — ابعته كود جديد.",
      not_found: "مفيش كود مطلوب للبريد ده — ابعته تاني.",
    };
    return { error: messages[result.reason], message: null };
  }

  // بنأكّد الإيميل عبر Admin API بالـ user_id اللي رجع من التحقق.
  try {
    await confirmUserEmail(result.userId);
  } catch (confirmError) {
    console.error("[verifyOtpAction] confirm failed", confirmError);
    return { error: "حصلت مشكلة في التأكيد، جرّب تاني.", message: null };
  }

  redirect("/onboarding");
}

/**
 * إعادة إرسال كود جديد (نفس البريد) من صفحة التحقق.
 */
export async function resendOtpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const emailRaw = formData.get("email");
  const parsed = z.object({ email: z.email() }).safeParse({ email: emailRaw });
  if (!parsed.success) {
    return { error: "بريد غير صحيح", message: null };
  }

  const email = parsed.data.email.toLowerCase().trim();
  try {
    const userId = await findUserIdByEmail(email);
    if (!userId) {
      return { error: "مفيش حساب بالبريد ده.", message: null };
    }
    await issueEmailOtp({ email, userId, displayName: null });
  } catch (resendError) {
    console.error("[resendOtpAction] failed", resendError);
    return { error: "معرفناش نبعت الكود، جرّب بعد شوية.", message: null };
  }

  return { error: null, message: "بعتنالك كود جديد على بريدك." };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
