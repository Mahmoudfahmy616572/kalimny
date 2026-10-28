import Link from "next/link";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getUnitSummary, type UnitSummary } from "@kalimny/shared";

export const instant = false;

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pick(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

type SummaryWord = { term: string; meaning: string; example: string };
type SummaryPhrase = { phrase: string; meaning: string };
type SummaryGrammar = { point: string; explanation: string; example: string };

type SessionSummaryRow = {
  language: string;
  unit_index: number;
  words: SummaryWord[];
  phrases: SummaryPhrase[];
  grammar: SummaryGrammar[];
};

const LANGUAGE_LABELS: Record<string, string> = {
  en: "الإنجليزية",
  fr: "الفرنسية",
  es: "الإسبانية",
  de: "الألمانية",
};

const SKILL_LABELS: Record<
  "reading" | "writing" | "listening" | "speaking",
  string
> = {
  reading: "📖 قراءة",
  writing: "✍️ كتابة",
  listening: "🎧 استماع",
  speaking: "🗣️ تحدث",
};

export default async function UnitSummaryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const sessionId = pick(params.session);

  await requireUser();

  if (!sessionId || !UUID.test(sessionId)) {
    redirect("/");
  }

  const supabase = await createClient();

  const { data: row } = await supabase
    .from("lesson_summaries")
    .select("language, unit_index, words, phrases, grammar")
    .eq("session_id", sessionId)
    .maybeSingle();

  const sessionSummary = row as SessionSummaryRow | null;

  // لسه بيتولّد، أو الجلسة فعلاً ما خلّصتش → نقول للمستخدم يستنى.
  if (!sessionSummary) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-12">
        <h1 className="text-2xl font-bold">ملخص الوحدة</h1>
        <div className="rounded-organic border border-border bg-card px-6 py-12 text-center">
          <p className="text-lg font-semibold">جاري تجهيز الملخص…</p>
          <p className="mt-2 text-sm text-muted">
            لو قفلت الجلسة بدري، الملخص مش بيتولّد. أكمل جلسة تانية وتعالى هنا.
          </p>
          <Link
            href="/review"
            className="mt-4 inline-block rounded-full border border-border px-5 py-2 text-xs font-semibold transition hover:bg-cream"
          >
            شوف الملخصات السابقة ←
          </Link>
        </div>
      </main>
    );
  }

  const { data: prefs } = await supabase
    .from("user_preferences")
    .select("level")
    .maybeSingle();

  const level = (prefs?.level as string | undefined) ?? "A1";

  const base = getUnitSummary(
    sessionSummary.language,
    level,
    sessionSummary.unit_index ?? 0,
  );

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold sm:text-3xl">ملخص الوحدة</h1>
        <p className="text-sm text-muted sm:text-base">
          {LANGUAGE_LABELS[sessionSummary.language] ?? sessionSummary.language} —
          وحدة {sessionSummary.unit_index + 1}
        </p>
      </header>

      {base ? (
        <UnitSummaryView summary={base} />
      ) : (
        <div className="rounded-organic border border-border bg-card px-6 py-6 text-center text-sm text-muted">
          ملخص الوحدة الأساسي لسه متألَّفش. هيتضاف قريباً، ودلوقتي ظاهر لك ملخص
          جلستك اللي ولّده الـ AI تحت.
        </div>
      )}

      <section className="flex flex-col gap-3 rounded-organic border border-sage/40 bg-sage-soft/30 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <span>🤖</span> ملخص جلستك
        </h2>
        <p className="text-xs text-muted">
          ولّده الـ AI من اللي اتكلّمتوا فيه في الجلسة دي تحديداً.
        </p>

        {sessionSummary.words?.length > 0 && (
          <SummarySection title="📚 كلمات" items={sessionSummary.words} kind="words" />
        )}
        {sessionSummary.phrases?.length > 0 && (
          <SummarySection title="💬 جمل مفيدة" items={sessionSummary.phrases} kind="phrases" />
        )}
        {sessionSummary.grammar?.length > 0 && (
          <SummarySection title="📐 قواعد" items={sessionSummary.grammar} kind="grammar" />
        )}
        {!sessionSummary.words?.length &&
          !sessionSummary.phrases?.length &&
          !sessionSummary.grammar?.length && (
            <p className="text-sm text-muted">مفيش ملخص مولّد لهذه الجلسة.</p>
          )}
      </section>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/exam?session=${encodeURIComponent(sessionId)}`}
          className="inline-block rounded-full bg-terracotta px-5 py-2 text-xs font-semibold text-white transition hover:brightness-95"
        >
          ابدأ اختبار الوحدة ←
        </Link>
        <Link
          href="/review"
          className="inline-block rounded-full border border-border px-5 py-2 text-xs font-semibold transition hover:bg-cream"
        >
          كل الملخصات
        </Link>
      </div>
    </main>
  );
}

function UnitSummaryView({ summary }: { summary: UnitSummary }) {
  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-organic border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="mb-2 flex items-center gap-1.5 text-lg font-bold">
          <span>📘</span> {summary.title}
        </h2>
        {summary.overview ? (
          <p className="text-sm leading-relaxed text-muted" dir="auto">
            {summary.overview}
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-muted">
            الملخص الشامل لهذه الوحدة جاري تأليفه، بس محتواها الأساسي (المفردات
            والقواعد والجمل) متاح في الأقسام اللي تحت.
          </p>
        )}
      </section>

      {summary.vocabulary?.length > 0 && (
        <section className="rounded-organic border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="mb-2 text-sm font-semibold text-terracotta">📚 المفردات</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {summary.vocabulary.map((w, i) => (
              <li key={`${w.term}-${i}`} className="rounded-2xl bg-cream px-4 py-2.5 text-sm">
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="font-semibold" dir="auto">{w.term}</span>
                  <span className="text-muted">— {w.meaning}</span>
                </div>
                {w.example ? (
                  <p className="mt-1 text-xs text-muted" dir="auto">{w.example}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {summary.phrases?.length > 0 && (
        <section className="rounded-organic border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="mb-2 text-sm font-semibold text-terracotta">💬 جمل مفيدة</h3>
          <ul className="flex flex-col gap-2">
            {summary.phrases.map((p, i) => (
              <li key={`${p.phrase}-${i}`} className="rounded-2xl bg-sage-soft/40 px-4 py-2.5 text-sm">
                <span className="font-semibold" dir="auto">{p.phrase}</span>
                <span className="text-muted"> — {p.meaning}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {summary.grammar?.length > 0 && (
        <section className="rounded-organic border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="mb-2 text-sm font-semibold text-terracotta">📐 القواعد</h3>
          <ul className="flex flex-col gap-2">
            {summary.grammar.map((g, i) => (
              <li key={`${g.point}-${i}`} className="rounded-2xl border border-border px-4 py-2.5 text-sm">
                <span className="font-semibold">{g.point}</span>
                <p className="mt-0.5 text-muted">{g.explanation}</p>
                {g.example ? (
                  <p className="mt-1 text-xs text-muted" dir="auto">{g.example}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-terracotta">🎯 المهارات الأربعة</h3>
        {summary.skills ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {(["reading", "writing", "listening", "speaking"] as const).map(
              (key) => {
                const skill = summary.skills![key];
                return (
                  <div
                    key={key}
                    className="rounded-organic border border-border bg-card p-4 text-sm shadow-sm"
                  >
                    <h4 className="mb-2 font-semibold">{SKILL_LABELS[key]}</h4>
                    <p className="text-muted" dir="auto">{skill.instruction}</p>
                    {skill.prompt ? (
                      <p className="mt-2 rounded-xl bg-cream px-3 py-2 font-medium" dir="auto">
                        {skill.prompt}
                      </p>
                    ) : null}
                    {skill.modelAnswer ? (
                      <p className="mt-2 text-xs text-muted" dir="auto">
                        <span className="font-semibold">إجابة نموذجية: </span>
                        {skill.modelAnswer}
                      </p>
                    ) : null}
                  </div>
                );
              },
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">
            تمارين المهارات الأربعة لهذه الوحدة جاري تأليفها.
          </p>
        )}
      </section>
    </div>
  );
}

function SummarySection({
  title,
  items,
  kind,
}: {
  title: string;
  items: SummaryWord[] | SummaryPhrase[] | SummaryGrammar[];
  kind: "words" | "phrases" | "grammar";
}) {
  if (kind === "words") {
    const list = items as SummaryWord[];
    return (
      <div>
        <h3 className="mb-2 text-sm font-semibold text-terracotta">{title}</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {list.map((w, i) => (
            <li key={`${w.term}-${i}`} className="rounded-2xl bg-cream px-4 py-2.5 text-sm">
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="font-semibold" dir="auto">{w.term}</span>
                <span className="text-muted">— {w.meaning}</span>
              </div>
              {w.example ? (
                <p className="mt-1 text-xs text-muted" dir="auto">{w.example}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (kind === "phrases") {
    const list = items as SummaryPhrase[];
    return (
      <div>
        <h3 className="mb-2 text-sm font-semibold text-terracotta">{title}</h3>
        <ul className="flex flex-col gap-2">
          {list.map((p, i) => (
            <li key={`${p.phrase}-${i}`} className="rounded-2xl bg-sage-soft/40 px-4 py-2.5 text-sm">
              <span className="font-semibold" dir="auto">{p.phrase}</span>
              <span className="text-muted"> — {p.meaning}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const list = items as SummaryGrammar[];
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-terracotta">{title}</h3>
      <ul className="flex flex-col gap-2">
        {list.map((g, i) => (
          <li key={`${g.point}-${i}`} className="rounded-2xl border border-border px-4 py-2.5 text-sm">
            <span className="font-semibold">{g.point}</span>
            <p className="mt-0.5 text-muted">{g.explanation}</p>
            {g.example ? (
              <p className="mt-1 text-xs text-muted" dir="auto">{g.example}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
