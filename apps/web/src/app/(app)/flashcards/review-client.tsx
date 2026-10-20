"use client";

import { useState } from "react";

type Card = { term: string; type: "word" | "phrase" };

export function FlashcardReview({ cards }: { cards: Card[] }) {
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
        className="flex h-64 w-full max-w-md items-center justify-center rounded-organic border border-border bg-card p-6 text-center shadow-sm transition hover:shadow-md"
      >
        <p className="text-xl font-semibold">{flipped ? card.term : card.term}</p>
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
