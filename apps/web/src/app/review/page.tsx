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

export default async function ReviewPage() {
  return (
    <main className="flex-1">
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-muted">
            جارٍ تحميل الملخصات…
          </div>
        }
      >
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
    .limit(50);

  if (error) {
    console.error("[review] failed to load summaries:", error.message);
  }

  const summaries = (data ?? []) as SummaryRow[];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">ملخصات الدروس</h1>
        <p className="text-sm text-muted">
          أهم الكلمات والجمل والقواعد من آخر دروسك — راجعها قبل الجلسة الجاية.
        </p>
      </header>

      {summaries.length === 0 ? (
        <div className="rounded-organic border border-border bg-card px-6 py-12 text-center">
          <p className="text-4xl">📝</p>
          <p className="mt-3 font-semibold">لسه مفيش ملخصات</p>
          <p className="mt-1 text-sm text-muted">
            ابدأ جلسة محادثة وخلّصها — الملخص بيتجهّز لوحده بعد الدرس.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {summaries.map((summary) => (
            <li
              key={summary.id}
              className="flex flex-col gap-4 rounded-organic border border-border bg-card p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-bold">
                  {LANGUAGE_LABELS[summary.language] ?? summary.language} ·
                  وحدة {summary.unit_index + 1}
                </h2>
                <time
                  dateTime={summary.created_at}
                  className="text-xs text-muted"
                >
                  {new Date(summary.created_at).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              {summary.words.length > 0 && (
                <section>
                  <h3 className="mb-2 text-sm font-semibold text-terracotta">
                    كلمات
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {summary.words.map((word) => (
                      <li
                        key={word.term}
                        className="rounded-2xl bg-cream px-4 py-2.5 text-sm"
                      >
                        <span className="font-semibold">{word.term}</span>
                        <span className="text-muted"> — {word.meaning}</span>
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

              {summary.phrases.length > 0 && (
                <section>
                  <h3 className="mb-2 text-sm font-semibold text-terracotta">
                    جمل
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {summary.phrases.map((phrase) => (
                      <li
                        key={phrase.phrase}
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

              {summary.grammar.length > 0 && (
                <section>
                  <h3 className="mb-2 text-sm font-semibold text-terracotta">
                    قواعد
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {summary.grammar.map((grammar) => (
                      <li
                        key={grammar.point}
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
      )}
    </div>
  );
}
