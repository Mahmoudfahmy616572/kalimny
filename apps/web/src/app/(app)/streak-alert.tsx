import { getXp } from "@/lib/xp/actions";

export async function StreakAlert() {
  const xp = await getXp();
  const today = new Date().toISOString().slice(0, 10);
  
  if (xp.lastDate !== today && xp.streak >= 0) {
    return (
      <div className="mx-auto mb-6 flex max-w-lg items-center justify-center rounded-full border border-terracotta/40 bg-terracotta-soft/30 px-4 py-2 text-sm font-semibold">
        🔥 ما كملتش ستريكك لسه — ابدأ جلسة دلوقتي عشان تحافظ عليه!
      </div>
    );
  }
  return null;
}
