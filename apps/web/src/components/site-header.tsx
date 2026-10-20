import Link from "next/link";

import { signOutAction } from "@/app/(auth)/actions";
import { getCurrentUser } from "@/lib/auth";
import { getXp } from "@/lib/xp/actions";

export async function SiteHeader() {
  const user = await getCurrentUser();
  const xp = user ? await getXp().catch(() => ({ xp: 0, streak: 0, lastDate: null })) : null;

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/70 px-6 py-4 backdrop-blur">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold">
        <span>☕</span>
        <span>كلمني</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm">
        {user ? (
          <>
            {xp && xp.streak > 0 ? (
              <span className="hidden items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold sm:flex">
                🔥 {xp.streak}
              </span>
            ) : null}
            <Link
              href="/mistakes"
              className="hidden rounded-full px-3 py-1.5 font-medium transition hover:bg-cream sm:inline-block"
            >
              أخطائي
            </Link>
            <Link
              href="/flashcards"
              className="hidden rounded-full px-3 py-1.5 font-medium transition hover:bg-cream sm:inline-block"
            >
              فلاش كاردز
            </Link>
            <Link
              href="/leaderboard"
              className="hidden rounded-full px-3 py-1.5 font-medium transition hover:bg-cream sm:inline-block"
            >
              ليدر بورد
            </Link>
            <Link
              href="/review"
              className="rounded-full px-4 py-1.5 font-medium transition hover:bg-cream"
            >
              الملخصات
            </Link>
            <form action={signOutAction} className="flex items-center gap-3">
              <span className="text-muted">
                {user.displayName ?? user.email}
              </span>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-1.5 font-medium transition hover:bg-cream"
              >
                خروج
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 font-medium transition hover:bg-cream"
            >
              دخول
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-terracotta px-4 py-1.5 font-semibold text-white transition hover:brightness-95"
            >
              حساب جديد
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export function SiteHeaderFallback() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card/70 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-2 text-lg font-bold">
        <span>☕</span>
        <span>كلمني</span>
      </div>
      <div className="h-8 w-28 animate-pulse rounded-full bg-cream" />
    </header>
  );
}
