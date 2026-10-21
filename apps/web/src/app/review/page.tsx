import { connection } from "next/server";
import { Suspense } from "react";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

type SummaryWord = { term: string; meaning: string; example: string };
type SummaryPhrase = { phrase: string; meaning: string };
type SummaryGrammar = { point: string; explanation: string; example: string };

type SummaryRow = {
  id: string;
  language: string;
  unit_index: number;
  words: SummaryWord[];
  phrases: SummaryPhrase[];
  grammar: SummaryGrammar[];
  created_at: string;
};

const LANGUAGE_LABELS: Record<string, string> = {
  en: "الإنجليزية",
  fr: "الفرنسية",
  es: "الإسبانية",
  de: "الألمانية",
};

const LANGUAGE_FLAGS: Record<string, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
  de: "🇩🇪",
};

const LANGUAGE_ORDER = ["en", "fr", "es", "de"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ReviewSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-2">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-cream" />
        <div className="h-4 w-72 animate-pulse rounded-lg bg-cream" />
      </header>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 animate-pulse rounded-full bg-cream"
          />
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-organic border border-border bg-card p-5 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 animate-pulse rounded-lg bg-cream" />
            <div className="h-4 w-24 animate-pulse rounded-lg bg-cream" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="h-12 w-full animate-pulse rounded-2xl bg-cream"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ReviewPage() {
  return (
    <main className="flex-1">
      <Suspense fallback={<ReviewSkeleton />}>
        <ReviewLoader />
      </Suspense>
    </main>
  );
}

async function ReviewLoader() {
  await connection();
  await requireUser();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lesson_summaries")
    .select("id, language, unit_index, words, phrases, grammar, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[review] failed to load summaries:", error.message);
  }

  const summaries = (data ?? []) as SummaryRow[];

  // فصل الملخصات حسب اللغة مع ترتيب ثابت
  const grouped = new Map<string, SummaryRow[]>();
  for (const s of summaries) {
    if (!grouped.has(s.language)) grouped.set(s.language, []);
    grouped.get(s.language)!.push(s);
  }

  const languages = LANGUAGE_ORDER.filter((l) => grouped.has(l)).concat(
    [...grouped.keys()].filter((l) => !LANGUAGE_ORDER.includes(l)),
  );

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold sm:text-3xl">ملخصات الدروس</h1>
        <p className="text-sm text-muted sm:text-base">
          أهم الكلمات والجمل والقواعد من دروسك — راجعها قبل الجلسة الجاية.
        </p>
      </header>

      {summaries.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-organic border border-border bg-card px-6 py-12 text-center sm:py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-3xl">
            📝
          </div>
          <p className="text-lg font-semibold">لسه مفيش ملخصات</p>
          <p className="max-w-xs text-sm text-muted">
            ابدأ جلسة محادثة وخلّصها لحد ما تتولّد أول ملخص تلقائياً.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* تبويبات اللغات */}
          <nav className="flex flex-wrap items-center gap-2">
            {languages.map((lang) => {
              const count = grouped.get(lang)?.length ?? 0;
              return (
                <a
                  key={lang}
                  href={`#lang-${lang}`}
                  className="group flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium transition hover:border-terracotta hover:bg-cream sm:px-4"
                >
                  <span>{LANGUAGE_FLAGS[lang] ?? "🌐"}</span>
                  <span>{LANGUAGE_LABELS[lang] ?? lang}</span>
                  <span className="mr-1 rounded-full bg-cream px-2 py-0.5 text-xs text-muted transition group-hover:bg-card">
                    {count}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* أقسام حسب اللغة */}
          {languages.map((lang) => {
            const items = grouped.get(lang) ?? [];
            return (
              <section key={lang} id={`lang-${lang}`} className="flex scroll-mt-6 flex-col gap-4">
                <header className="flex items-center gap-2">
                  <span className="text-xl">{LANGUAGE_FLAGS[lang] ?? "🌐"}</span>
                  <h2 className="text-lg font-bold">
                    {LANGUAGE_LABELS[lang] ?? lang}
                  </h2>
                  <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs text-muted">
                    {items.length} ملخص
                  </span>
                </header>

                <ul className="flex flex-col gap-4">
                  {items.map((summary) => (
                    <li
                      key={summary.id}
                      className="flex flex-col gap-4 rounded-organic border border-border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-6"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold">
                          وحدة {summary.unit_index + 1}
                        </h3>
                        <time
                          dateTime={summary.created_at}
                          className="text-xs text-muted"
                        >
                          {formatDate(summary.created_at)}
                        </time>
                      </div>

                      {summary.words?.length > 0 && (
                        <section>
                          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                            <span>📚</span>
                            كلمات
                          </h4>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {summary.words.map((word, idx) => (
                              <li
                                key={`${word.term}-${idx}`}
                                className="rounded-2xl bg-cream px-4 py-2.5 text-sm"
                              >
                                <div className="flex flex-wrap items-baseline gap-1">
                                  <span className="font-semibold" dir="auto">
                                    {word.term}
                                  </span>
                                  <span className="text-muted">— {word.meaning}</span>
                                </div>
                                {word.example ? (
                                  <p className="mt-1 text-xs text-muted" dir="auto">
                                    {word.example}
                                  </p>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {summary.phrases?.length > 0 && (
                        <section>
                          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                            <span>💬</span>
                            جمل مفيدة
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {summary.phrases.map((phrase, idx) => (
                              <li
                                key={`${phrase.phrase}-${idx}`}
                                className="rounded-2xl bg-sage-soft/40 px-4 py-2.5 text-sm"
                              >
                                <span className="font-semibold" dir="auto">
                                  {phrase.phrase}
                                </span>
                                <span className="text-muted"> — {phrase.meaning}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {summary.grammar?.length > 0 && (
                        <section>
                          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                            <span>📐</span>
                            قواعد
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {summary.grammar.map((grammar, idx) => (
                              <li
                                key={`${grammar.point}-${idx}`}
                                className="rounded-2xl border border-border px-4 py-2.5 text-sm"
                              >
                                <span className="font-semibold">{grammar.point}</span>
                                <p className="mt-0.5 text-muted">{grammar.explanation}</p>
                                {grammar.example ? (
                                  <p className="mt-1 text-xs text-muted" dir="auto">
                                    {grammar.example}
                                  </p>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
