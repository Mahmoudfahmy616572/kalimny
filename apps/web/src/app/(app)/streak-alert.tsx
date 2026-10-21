import { getXpForUser } from "@/lib/xp/read";
import { getCurrentUser } from "@/lib/auth";

export async function StreakAlert() {
  const user = await getCurrentUser();
  if (!user) return null;

  const xp = await getXpForUser(user.id).catch(() => ({
    xp: 0,
    streak: 0,
    lastDate: null,
  }));
  const today = new Date().toISOString().slice(0, 10);

  if (!xp.lastDate) {
    if (xp.streak >= 1) {
      return (
        <div className="mx-auto mb-5 flex max-w-lg items-center justify-center gap-2 rounded-full border border-amber-200 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-2 text-sm font-semibold shadow-sm">
          <span className="text-base">🔥</span>
          <span>ستريكك {xp.streak} يوم — كمل اليوم عشان تقدر تحافظ عليه!</span>
        </div>
      );
    }
    return (
      <div className="mx-auto mb-5 flex max-w-lg items-center justify-center gap-2 rounded-full border border-terracotta/40 bg-terracotta-soft/30 px-5 py-2 text-sm font-semibold">
        <span className="text-base">🔥</span>
        <span>ابدأ أول جلسة عشان تبني ستريكك من دلوقتي!</span>
      </div>
    );
  }

  if (xp.lastDate === today) {
    if (xp.streak >= 3) {
      return (
        <div className="mx-auto mb-5 flex max-w-lg items-center justify-center gap-2 rounded-full border border-amber-200 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-2 text-sm font-semibold shadow-sm">
          <span className="text-base">🔥</span>
          <span>أحسنت! ستريكك {xp.streak} يوم متواصل — استمر كده!</span>
        </div>
      );
    }
    return (
      <div className="mx-auto mb-5 flex max-w-lg items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/60 px-5 py-2 text-sm font-semibold">
        <span className="text-base">✅</span>
        <span>كملت ستريك اليوم — ستريكك بقى {xp.streak} يوم</span>
      </div>
    );
  }

  // لم يكمل اليوم بعد
  return (
    <div className="mx-auto mb-5 flex max-w-lg items-center justify-center gap-2 rounded-full border border-terracotta/40 bg-terracotta-soft/30 px-5 py-2 text-sm font-semibold shadow-sm">
      <span className="text-base">🔥</span>
      <span>ما كملتش ستريكك لسه — ابدأ جلسة دلوقتي عشان تحافظ على {xp.streak} يوم!</span>
    </div>
  );
}
