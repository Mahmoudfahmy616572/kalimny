import { Suspense } from "react";
import Link from "next/link";

import { getMistakes } from "./actions";

export const metadata = {
  title: "أخطائي | كلمني",
};

async function MistakesContent() {
  const mistakes = await getMistakes();
  const hasAny = mistakes.words.length || mistakes.phrases.length || mistakes.grammar.length;

  return !hasAny ? (
    <div className="rounded-organic border border-border bg-card px-6 py-10 text-center">
      <p className="text-lg font-semibold">لسه مفيش أخطاء أو كلمات مجمعة</p>
      <p className="mt-2 text-sm text-muted">ابدأ أول جلسة عشان يظهر هنا كل اللي اتعلمته</p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-full bg-terracotta px-6 py-2 text-sm font-semibold text-white transition hover:brightness-95"
      >
        ابدأ جلسة الآن
      </Link>
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      {mistakes.words.length ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">كلمات جديدة</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {mistakes.words.map((w, i) => (
              <div key={i} className="rounded-organic border border-border bg-card px-4 py-3 text-sm">
                {typeof w === "string" ? w : JSON.stringify(w)}
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {mistakes.phrases.length ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">عبارات مفيدة</h2>
          <div className="grid gap-2">
            {mistakes.phrases.map((p, i) => (
              <div key={i} className="rounded-organic border border-border bg-card px-4 py-3 text-sm">
                {typeof p === "string" ? p : JSON.stringify(p)}
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {mistakes.grammar.length ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">قواعد وملاحظات</h2>
          <div className="grid gap-2">
            {mistakes.grammar.map((g, i) => (
              <div key={i} className="rounded-organic border border-border bg-card px-4 py-3 text-sm">
                {typeof g === "string" ? g : JSON.stringify(g)}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default function MistakesPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">أخطائي</h1>
          <div className="flex items-center gap-2">
            <Link href="/flashcards" className="text-sm text-muted transition hover:text-foreground">
              راجعهم في فلاش كاردز →
            </Link>
            <Link href="/review" className="text-sm text-muted transition hover:text-foreground">
              ملخصاتي ←
            </Link>
          </div>
        </div>
        <p className="text-sm text-muted">
          كل الكلمات والعبارات والقواعد اللي اتعلمتها من الجلسات السابقة، مجمعة في مكان واحد
        </p>
      </header>
      <Suspense fallback={<div className="text-center text-sm text-muted">جارٍ التحميل...</div>}>
        <MistakesContent />
      </Suspense>
    </main>
  );
}
