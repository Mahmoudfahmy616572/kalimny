"use client";

import { useEffect, useState } from "react";

export function XpToast({ gained, streak }: { gained: number; streak: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (gained > 0 || streak > 0) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(t);
    }
  }, [gained, streak]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border bg-card px-4 py-2 shadow-lg">
      <p className="text-sm font-semibold">🎉 كسبت +{gained} XP · ستريكك بقى {streak} يوم</p>
    </div>
  );
}
