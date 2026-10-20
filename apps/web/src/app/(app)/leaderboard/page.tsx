import { getLeaderboard } from "@/lib/xp/leaderboard-actions";

export const metadata = {
  title: "ليدر بورد | كلمني",
};

export default async function LeaderboardPage() {
  const lb = await getLeaderboard();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">ليدر بورد</h1>
        <p className="text-sm text-muted">أعلى ١٠ حسب نقاط XP</p>
      </header>

      <div className="rounded-organic border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream/50">
            <tr>
              <th className="p-3 text-right text-sm font-semibold">#</th>
              <th className="p-3 text-right text-sm font-semibold">نقاط XP</th>
              <th className="p-3 text-right text-sm font-semibold">ستريك</th>
              <th className="p-3 text-right text-sm font-semibold">جلسات</th>
            </tr>
          </thead>
          <tbody>
            {lb.users.map((u, i) => (
              <tr key={u.user_id} className={i % 2 === 0 ? "bg-white/40" : ""}>
                <td className="p-3 text-sm font-semibold">{i + 1}</td>
                <td className="p-3 text-sm">{u.xp || 0}</td>
                <td className="p-3 text-sm">🔥 {u.streak || 0}</td>
                <td className="p-3 text-sm">{u.total_sessions || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lb.myRank ? (
        <div className="rounded-organic border border-border bg-cream px-4 py-3 text-center text-sm">
          ترتيبك: #{lb.myRank} · {lb.myXp} XP
        </div>
      ) : null}
    </main>
  );
}
