import { getXp } from "@/lib/xp/actions";

export const metadata = {
  title: "بروفايلي | كلمني",
};

export default async function ProfilePage() {
  const xp = await getXp();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold">بروفايلي</h1>
        <p className="text-sm text-muted">تقدمك، نقاطك، وستريكك اليومي</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-organic border border-border bg-card p-6">
          <p className="text-sm text-muted">نقاط XP</p>
          <p className="mt-2 text-3xl font-bold">{xp.xp}</p>
        </div>
        <div className="rounded-organic border border-border bg-card p-6">
          <p className="text-sm text-muted">ستريك يومي</p>
          <p className="mt-2 text-3xl font-bold">{xp.streak} يوم</p>
        </div>
      </div>
    </main>
  );
}
