import "server-only";

import { cacheTag } from "next/cache";

export type XpSummary = {
  xp: number;
  streak: number;
  lastDate: string | null;
};

/**
 * قراءة XP متخزّنة (cached) مفتاحها معرّف المستخدم.
 *
 * قبل كنا بنقرا الـ XP في كل render من الهيدر بدون تخزين — ده كان:
 *  1. roundtrip زيادة على الـ DB في كل صفحة.
 *  2. سبب خطأ `Date.now()` وقت الـ prerender (auth-js بيشوف الوقت).
 *
 * بنستخدم REST مباشر بدل عميل Supabase: الـ client بيبني auth-js اللي
 * بيستخدم `Date.now()` جوّه الـ constructor، وده كسر الـ prerender للصفحة.
 * وكمان REST أخف بكتير من إنشاء client كامل في كل render.
 */
export async function getXpForUser(userId: string): Promise<XpSummary> {
  "use cache";
  cacheTag(`xp:${userId}`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return { xp: 0, streak: 0, lastDate: null };
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/user_xp?select=xp,streak,last_session_date&user_id=eq.${encodeURIComponent(userId)}&limit=1`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "force-cache",
      },
    );

    if (!res.ok) {
      return { xp: 0, streak: 0, lastDate: null };
    }

    const rows: unknown = await res.json();
    const row = (Array.isArray(rows) ? rows[0] : null) as
      | { xp?: number; streak?: number; last_session_date?: string | null }
      | null;

    if (!row) {
      return { xp: 0, streak: 0, lastDate: null };
    }

    return {
      xp: row.xp || 0,
      streak: row.streak || 0,
      lastDate: row.last_session_date ?? null,
    };
  } catch {
    return { xp: 0, streak: 0, lastDate: null };
  }
}
