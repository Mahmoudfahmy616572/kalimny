import { Suspense } from "react";

import { getFlashcards } from "./actions";
import { FlashcardReview } from "./review-client";

export const metadata = {
  title: "فلاش كاردز | كلمني",
};

async function FlashcardsContent() {
  const cards = await getFlashcards();
  return cards.length === 0 ? (
    <div className="rounded-organic border border-border bg-card px-6 py-10 text-center">
      <p className="text-lg font-semibold">لسه مفيش كروت للمراجعة</p>
      <p className="mt-2 text-sm text-muted">كمل جلسات عشان تولد الفلاش كاردز تلقائياً</p>
    </div>
  ) : (
    <FlashcardReview cards={cards} />
  );
}

export default function FlashcardsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">فلاش كاردز ذكية</h1>
        <p className="text-sm text-muted">راجع الكلمات والعبارات اللي اتعلمتها فعلاً من ملخصاتك</p>
      </header>
      <Suspense fallback={<div className="text-center text-sm text-muted">جارٍ التحميل...</div>}>
        <FlashcardsContent />
      </Suspense>
    </main>
  );
}
