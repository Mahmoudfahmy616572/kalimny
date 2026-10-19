"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

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

async function getOrigin() {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  return process.env.NEXT_PUBLIC_SITE_URL ?? `${proto}://${host}`;
}

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

  const origin = await getOrigin();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { display_name: parsed.data.displayName },
    },
  });

  if (error) {
    return { error: error.message, message: null };
  }

  if (data.session) {
    redirect("/onboarding");
  }

  return {
    error: null,
    message: "بعتنالك رسالة تأكيد على بريدك — افتح الرابط لتأكيد الحساب.",
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
