import Link from "next/link";

import { signOutAction } from "@/app/(auth)/actions";
import { getCurrentUser } from "@/lib/auth";
import { getXpForUser } from "@/lib/xp/read";

export async function SiteHeader() {
  const user = await getCurrentUser();
  const xp = user
    ? await getXpForUser(user.id).catch(() => ({
        xp: 0,
        streak: 0,
        lastDate: null,
      }))
    : null;

  return (
    <header className="flex w-full items-center justify-between gap-2 border-b border-border bg-card/70 px-4 py-3 backdrop-blur sm:gap-4 sm:px-6 sm:py-4">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 text-lg font-bold"
      >
        <span>☕</span>
        <span>كلمني</span>
      </Link>

      <nav className="flex min-w-0 items-center gap-2 text-sm sm:gap-4">
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
              className="shrink-0 rounded-full px-3 py-1.5 font-medium transition hover:bg-cream sm:px-4"
            >
              الملخصات
            </Link>
            <form action={signOutAction} className="flex min-w-0 items-center gap-3">
              <span className="hidden max-w-[16ch] truncate text-muted md:inline">
                {user.displayName ?? user.email}
              </span>
              <button
                type="submit"
                className="shrink-0 rounded-full border border-border px-3 py-1.5 font-medium transition hover:bg-cream sm:px-4"
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
