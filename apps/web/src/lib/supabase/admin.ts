import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * عميل Supabase بصلاحيات service_role — للسيرفر بس.
 *
 * بيتخطّى RLS، فبيستخدم لحاجات محدودة ومقصودة: تأكيد الإيميل، وقراءة/
 * كتابة جدول email_otps عبر الدوال SECURITY DEFINER. ممنوع يتصدّر
 * للعميل أو يُستخدم في أي مسار بياخد مدخلات مستخدم من غير تحقق.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase admin not configured: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are required",
    );
  }

  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
