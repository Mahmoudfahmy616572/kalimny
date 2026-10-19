import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

/**
 * Data Access Layer — المصدر الوحيد لقراءة المستخدم الحالي.
 * `use cache: private` بيمنع إعادة تقييم `Date.now()` من auth-js وقت الـ prerender،
 * وبيخلي القراءة تتعمل عند الطلب وتتخزّن في المتصفح بس (مش على السيرفر).
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  "use cache: private";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? null,
    displayName:
      (user.user_metadata?.display_name as string | undefined) ?? null,
  };
}

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
