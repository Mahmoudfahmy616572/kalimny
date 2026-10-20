"use client";

import { useEffect, useState } from "react";

import { XpToast } from "./xp-toast";

export function XpToastListener() {
  const [state, setState] = useState<{ gained: number; streak: number }>({ gained: 0, streak: 0 });

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      setState({ gained: ce.detail?.gained || 0, streak: ce.detail?.streak || 0 });
    };
    window.addEventListener("kalimny:xp", handler as EventListener);
    return () => window.removeEventListener("kalimny:xp", handler as EventListener);
  }, []);

  return <XpToast gained={state.gained} streak={state.streak} />;
}
