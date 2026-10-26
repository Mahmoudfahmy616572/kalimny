"use client";

import type { ExamQuestion } from "@kalimny/shared";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type PublicQuestion = Omit<ExamQuestion, "answer">;

type ExamData = {
  language: string;
  level: string;
  unitIndex: number;
  unitId: string;
  questions: PublicQuestion[];
};

type Result = {
  outcome: "pass" | "partial" | "fail";
  scorePct: number;
  correct: number;
  total: number;
  attempts: number;
};

const KIND_LABELS: Record<string, string> = {
  vocab: "مفردات",
  grammar: "قواعد",
  speaking: "كلام",
  listening: "سمع",
};

const SPEECH_LANG: Record<string, string> = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE",
};

const OUTCOME_COPY: Record<
  Result["outcome"],
  { title: string; body: string; tone: string }
> = {
  pass: {
    title: "عدّيت! 🎉",
    body: "الوحدة دي خلصت وتمام. الجلسة الجاية هتكون على الوحدة اللي بعدها.",
    tone: "border-sage/50 bg-sage-soft/50",
  },
  partial: {
    title: "قربت خالص 👏",
    body: "عدّيت جزء من الاختبار. راجع النقط اللي غلطت فيها، وخد جلسة تانية على نفس الوحدة، وبعدها ارجع للاختبار.",
    tone: "border-terracotta/40 bg-terracotta-soft/30",
  },
  fail: {
    title: "محتاج تعيد الوحدة",
    body: "النتيجة أقل من النص. خد جلسة تانية على نفس الوحدة، وارجع للاختبار بعدها.",
    tone: "border-terracotta/50 bg-terracotta-soft/40",
  },
};

export function ExamPanel({ sessionId }: { sessionId: string }) {
  const [exam, setExam] = useState<ExamData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ sessionId });
    fetch(`/api/exam?${params.toString()}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "مفيش اختبار متاح للوحدة دي لسه."
              : "مش قادرين نجيب الاختبار دلوقتي.",
          );
        }
        return (await response.json()) as ExamData;
      })
      .then((data) => setExam(data))
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name === "AbortError") return;
        setError(reason instanceof Error ? reason.message : "حصلت مشكلة.");
      });
    return () => controller.abort();
  }, [sessionId]);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  const question = exam?.questions[index];

  const setAnswer = useCallback((id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const startMic = useCallback(() => {
    type SpeechCtor = new () => {
      lang: string;
      interimResults: boolean;
      continuous: boolean;
      start: () => void;
      stop: () => void;
      onresult: ((event: unknown) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
    };
    const w = window as unknown as {
      SpeechRecognition?: SpeechCtor;
      webkitSpeechRecognition?: SpeechCtor;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) {
      setError("المتصفح ده مش بيدعم التسجيل الصوتي. اكتب الإجابة بالكلمات.");
      return;
    }
    if (!question) return;

    const recognition = new Ctor();
    recognition.lang = SPEECH_LANG[exam?.language ?? "en"] ?? "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event: unknown) => {
      const e = event as {
        results?: ArrayLike<ArrayLike<{ transcript?: string }>>;
      };
      const text = e.results?.[0]?.[0]?.transcript ?? "";
      if (text) {
        setAnswer(question.id, `${answers[question.id] ?? ""} ${text}`.trim());
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }, [answers, exam?.language, question, setAnswer]);

  async function submit() {
    if (!exam) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, answers }),
      });
      const data = (await response.json()) as Result | { error?: string };
      if (!response.ok || "error" in data) {
        if ("error" in data && data.error === "already_submitted") {
          setError("الاختبار ده اتسلّم قبل كده.");
        } else {
          setError("مش قادرين نسجّل نتيجتك دلوقتي. جرّب تاني.");
        }
        return;
      }
      setResult(data as Result);
    } catch {
      setError("النت اعتراض. جرّب تاني.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    const copy = OUTCOME_COPY[result.outcome];
    return (
      <div className={`rounded-organic border px-6 py-8 text-center ${copy.tone}`}>
        <p className="text-2xl font-bold">{copy.title}</p>
        <p className="mt-2 text-sm text-muted">{copy.body}</p>
        <p className="mt-4 text-3xl font-bold">
          {result.scorePct}
          <span className="text-base font-normal text-muted">%</span>
        </p>
        <p className="mt-1 text-xs text-muted">
          {result.correct} من {result.total} صح
          {result.outcome !== "pass" ? ` · محاولة ${result.attempts}` : ""}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
        >
          ارجع للرئيسية ←
        </Link>
      </div>
    );
  }

  if (error && !exam) {
    return (
      <div className="rounded-organic border border-terracotta/40 bg-terracotta-soft/30 px-6 py-6 text-center text-sm">
        {error}
        <div className="mt-4">
          <Link
            href="/"
            className="rounded-full border border-border px-5 py-2 text-xs font-semibold transition hover:bg-cream"
          >
            ارجع للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  if (!exam || !question) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
        بنجهّز الاختبار…
      </div>
    );
  }

  const total = exam.questions.length;
  const isLast = index === total - 1;
  const answered = (answers[question.id] ?? "").trim().length > 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          سؤال {index + 1} من {total}
        </span>
        <span className="rounded-full bg-cream px-2.5 py-1 font-semibold">
          {KIND_LABELS[question.kind] ?? question.kind}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream">
        <div
          className="h-full rounded-full bg-terracotta transition-all"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <div className="rounded-organic border border-border bg-white/60 px-5 py-5">
        {question.kind === "listening" && question.text ? (
          <div className="mb-3 rounded-2xl bg-cream px-4 py-3 text-center">
            <p className="text-[11px] font-semibold text-muted">هتسمع:</p>
            <p className="mt-1 text-base font-semibold">{question.text}</p>
          </div>
        ) : null}

        <p className="text-base font-semibold leading-relaxed">{question.prompt}</p>

        {question.options && question.options.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2">
            {question.options.map((option) => {
              const selected = answers[question.id] === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAnswer(question.id, option)}
                  className={
                    selected
                      ? "rounded-2xl border border-terracotta bg-terracotta-soft/50 px-4 py-3 text-right text-sm font-semibold transition"
                      : "rounded-2xl border border-border px-4 py-3 text-right text-sm transition hover:bg-cream"
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            <textarea
              value={answers[question.id] ?? ""}
              onChange={(event) => setAnswer(question.id, event.target.value)}
              rows={3}
              dir="ltr"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm"
              placeholder="اكتب إجابتك أو استخدم المايك"
            />
            <button
              type="button"
              onClick={listening ? () => recognitionRef.current?.stop() : startMic}
              className={
                listening
                  ? "rounded-full bg-terracotta px-4 py-2 text-xs font-semibold text-white"
                  : "rounded-full border border-border px-4 py-2 text-xs font-semibold transition hover:bg-cream"
              }
            >
              {listening ? "⏹ وقّف التسجيل" : "🎤 اتكلم"}
            </button>
          </div>
        )}
      </div>

      {error ? (
        <p className="rounded-2xl bg-terracotta-soft/50 px-4 py-2 text-center text-xs">
          {error}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-full border border-border px-5 py-2 text-xs font-semibold transition hover:bg-cream disabled:opacity-40"
        >
          السابق
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-50"
          >
            {submitting ? "بنصحّح…" : "سلّم الاختبار"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            className="rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
          >
            التالي
          </button>
        )}
      </div>

      {!answered && isLast ? (
        <p className="text-center text-[11px] text-muted">
          فيه سؤال سايبه فاضي — هيتحسب غلط.
        </p>
      ) : null}
    </div>
  );
}
