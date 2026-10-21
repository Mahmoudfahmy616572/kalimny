"use client";

import { useEffect, useState } from "react";

export function XpToast({ gained, streak }: { gained: number; streak: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (gained > 0 || streak > 0) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 3200);
      return () => clearTimeout(t);
    }
  }, [gained, streak]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-gradient-to-r from-card to-orange-50 px-5 py-2.5 shadow-lg">
        <span className="text-base">🎉</span>
        <p className="text-sm font-semibold">
          كسبت +{gained} XP · ستريكك بقى{" "}
          <span className="inline-flex items-center gap-1">
            {streak} يوم <span>🔥</span>
          </span>
        </p>
      </div>
    </div>
  );
}
