"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CefrLevel, LanguageCode } from "@kalimny/shared";

import { SessionPanel } from "@/components/session/session-panel";
import type { LessonAccount } from "@/lib/lessons/quota";
import type { LessonPlan } from "@kalimny/shared";

type Props = {
  language: LanguageCode;
  level: CefrLevel;
  account: LessonAccount;
};

export function PlacementClient({ language, level, account }: Props) {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [result, setResult] = useState<{
    level: CefrLevel;
    confidence: number;
    reason: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const startedAt = useRef(Date.now());

  const lessonPlan = useMemo<LessonPlan>(
    () => ({
      unit: {
        id: "placement",
        titleAr: "تحديد المستوى",
        titleEn: "Placement",
        objectiveAr: "نتكلم شوية عشان نحدد أنسب مستوى",
        objectiveEn: "A short conversation to find your level",
        tasks: [],
        vocab: [],
      },
      goal: null,
      interests: [],
      recapWords: [],
      unitIndex: 0,
    }),
    [],
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { role: "user" | "assistant"; content: string }
        | undefined;
      if (!detail?.content) return;
      setMessages((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].content === detail.content && prev[prev.length - 1].role === detail.role) {
          return prev;
        }
        return [...prev, { role: detail.role, content: detail.content }];
      });
    };
    window.addEventListener("kalimny:transcript", handler as EventListener);
    return () => window.removeEventListener("kalimny:transcript", handler as EventListener);
  }, []);

  const evaluate = useCallback(async () => {
    if (loading || done) return;
    if (Date.now() - startedAt.current < 15000) return;
    if (messages.length < 4) return;
    setLoading(true);
    try {
      const res = await fetch("/api/placement/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, language }),
      });
      const json = await res.json();
      if (json?.level) {
        setResult({
          level: json.level,
          confidence: json.confidence ?? 0,
          reason: json.reason ?? "",
        });
        setDone(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [done, language, loading, messages]);

  useEffect(() => {
    const t = setInterval(() => {
      if (done) return;
      if (Date.now() - startedAt.current >= 90000) {
        void evaluate();
      }
    }, 2000);
    return () => clearInterval(t);
  }, [done, evaluate]);

  const accept = async () => {
    router.push("/");
    router.refresh();
  };

  const change = () => {
    router.push("/");
  };

  return (
    <div className="relative min-h-screen">
      <SessionPanel
        persona={null as any}
        initialAccount={account}
        lessonPlan={lessonPlan}
        unitCount={1}
        placementMode
        evaluatorLanguage={language}
      />
      {!done && messages.length >= 4 && Date.now() - startedAt.current >= 45000 ? (
        <button
          onClick={() => void evaluate()}
          disabled={loading}
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-espresso px-6 py-2 text-sm font-semibold text-cream shadow-lg disabled:opacity-60"
        >
          {loading ? "جارٍ التقييم..." : "خلصت — حدد مستواى"}
        </button>
      ) : null}
      {done && result ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-organic border border-border bg-card p-6 text-center shadow-xl">
            <p className="text-sm text-muted">اقترحنا نبدأ من</p>
            <p className="mt-2 text-4xl font-bold">{result.level}</p>
            {result.reason ? (
              <p className="mt-3 text-sm text-muted">{result.reason}</p>
            ) : null}
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={accept}
                className="rounded-full bg-espresso px-6 py-2 text-sm font-semibold text-cream"
              >
                موافق وأبدأ
              </button>
              <button
                onClick={change}
                className="rounded-full border border-border px-6 py-2 text-sm font-semibold"
              >
                أغير المستوى
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
