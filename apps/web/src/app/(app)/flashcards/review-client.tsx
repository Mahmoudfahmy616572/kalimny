"use client";

import type { Flashcard } from "@/lib/lessons/summary-content";
import { useState } from "react";

export function FlashcardReview({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (cards.length === 0) return null;

  const card = cards[index];

  const next = (knew: boolean) => {
    if (knew) setKnown((x) => x + 1);
    setFlipped(false);
    setIndex((i) => (i + 1 >= cards.length ? 0 : i + 1));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted">
        {index + 1} / {cards.length} · عرفت {known}
      </p>
      <button
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "اعرض الكلمة" : "اعرض المعنى"}
        className="flex min-h-64 w-full max-w-md flex-col items-center justify-center gap-2 rounded-organic border border-border bg-card p-6 text-center shadow-sm transition hover:shadow-md"
      >
        {flipped ? (
          <>
            <span className="text-[11px] font-semibold tracking-wide text-muted">
              المعنى
            </span>
            <span className="text-xl font-semibold leading-relaxed" dir="auto">
              {card.meaning || "مفيش معنى محفوظ للكارت ده"}
            </span>
            {card.example ? (
              <span className="mt-1 text-sm text-muted" dir="ltr">
                {card.example}
              </span>
            ) : null}
          </>
        ) : (
          <>
            <span className="text-[11px] font-semibold tracking-wide text-muted">
              {card.type === "word" ? "كلمة" : "عبارة"}
            </span>
            <span className="text-2xl font-bold" dir="auto">
              {card.term}
            </span>
            <span className="mt-1 text-[11px] text-muted">
              دوس على الكارت تشوف المعنى
            </span>
          </>
        )}
      </button>
      <div className="flex gap-3">
        <button onClick={() => next(false)} className="rounded-full border border-border px-6 py-2 text-sm font-semibold transition hover:bg-cream">
          عايز أراجعها
        </button>
        <button onClick={() => next(true)} className="rounded-full bg-terracotta px-6 py-2 text-sm font-semibold text-white transition hover:brightness-95">
          أعرفها
        </button>
      </div>
    </div>
  );
}
