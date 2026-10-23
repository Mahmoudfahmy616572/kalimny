import { Suspense } from "react";

import { getLeaderboard } from "@/lib/xp/leaderboard-actions";

export const metadata = {
  title: "ليدر بورد | كلمني",
};

function rankEmoji(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

async function LeaderboardContent() {
  const lb = await getLeaderboard();
  const users = lb.users ?? [];

  return (
    <>
      {users.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-organic border border-border bg-card px-6 py-10 text-center sm:py-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-2xl">
            🏆
          </div>
          <p className="text-lg font-semibold">لسه مفيش متسابقين</p>
          <p className="max-w-sm text-sm text-muted">
            ابدأ أول جلسة واكسب XP عشان يظهر اسمك هنا ويبدأ التنافس!
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-organic border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[3rem_1fr_auto_auto] items-center gap-2 border-b border-border bg-cream/50 px-4 py-2 text-xs font-semibold text-muted sm:px-5">
            <span>#</span>
            <span>المستخدم</span>
            <span className="text-center">ستريك</span>
            <span className="text-center">نقاط XP</span>
          </div>
          <ul className="divide-y divide-border">
            {users.map((u) => {
              const rank = u.rank;
              const emoji = rankEmoji(rank);
              const isMe = lb.myRank === rank && lb.myRank !== null;
              return (
                <li
                  key={u.user_id}
                  className={`grid grid-cols-[3rem_1fr_auto_auto] items-center gap-2 px-4 py-3 sm:px-5 ${
                    isMe ? "bg-terracotta-soft/20" : rank <= 3 ? "bg-cream/30" : ""
                  }`}
                >
                  <div className="flex items-center justify-center text-sm font-semibold">
                    {emoji ? <span className="text-lg">{emoji}</span> : rank}
                  </div>
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-sm font-semibold">
                      {u.display_name[0]?.toUpperCase()}
                    </div>
                    <p className="min-w-0 truncate text-sm font-medium">
                      {u.display_name}
                      {isMe ? <span className="mr-1 text-xs text-terracotta">(أنت)</span> : null}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <span>🔥</span>
                    <span className="font-medium">{u.streak || 0}</span>
                  </div>
                  <div className="flex items-center justify-center rounded-full bg-cream px-3 py-1 text-sm font-semibold">
                    {u.xp || 0}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {lb.myRank && users.length > 0 ? (
        <div className="flex items-center justify-between rounded-organic border border-terracotta/40 bg-terracotta-soft/20 px-4 py-3 text-sm sm:px-5">
          <span className="font-semibold">ترتيبك الحالي</span>
          <span>
            #{lb.myRank} · {lb.myXp} XP
          </span>
        </div>
      ) : null}
    </>
  );
}

export default function LeaderboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold sm:text-3xl">ليدر بورد</h1>
        <p className="text-sm text-muted sm:text-base">
          تنافس مع باقي المتعلمين واكسب أعلى نقاط XP
        </p>
      </header>
      <Suspense
        fallback={
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 w-full animate-pulse rounded-organic bg-cream"
              />
            ))}
          </div>
        }
      >
        <LeaderboardContent />
      </Suspense>
    </main>
  );
}
