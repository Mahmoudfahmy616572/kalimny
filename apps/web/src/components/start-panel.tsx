"use client";

import {
  CEFR_LEVELS,
  LANGUAGES,
  PERSONAS,
  PERSONAS_BY_LANGUAGE,
  SCENARIOS,
  type CefrLevel,
  type LanguageCode,
} from "@kalimny/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ProgressMap } from "@/components/progress-map";
import { saveHomePreferences } from "@/lib/preferences-actions";

type ProgressInfo = {
  level: CefrLevel;
  unitIndex: number;
  unitCount: number;
  titleAr?: string;
};

/** لغة الشخصية المحفوظة — لو موجودة هي لغة الفِلتَر الافتراضية. */
function languageOfPersona(
  personaId: string | null | undefined,
): LanguageCode | null {
  if (!personaId) {
    return null;
  }
  return PERSONAS.find((p) => p.id === personaId)?.language ?? null;
}

export function StartPanel({
  defaultLanguage,
  defaultLevel,
  defaultPersonaId,
  progress,
}: {
  defaultLanguage?: LanguageCode;
  defaultLevel?: CefrLevel;
  defaultPersonaId?: string | null;
  progress?: ProgressInfo;
}) {
  const router = useRouter();
  const [level, setLevel] = useState<CefrLevel>(defaultLevel ?? "B1");
  const [language, setLanguage] = useState<LanguageCode>(
    languageOfPersona(defaultPersonaId) ?? defaultLanguage ?? "en",
  );
  const [scenario, setScenario] = useState<string>("");
  const [sublevel, setSublevel] = useState<1 | 2>(1);
  const [levelSheetOpen, setLevelSheetOpen] = useState(false);

  // حفظ الاختيار في الحساب — من غير كده خريطة التقدّم بتفضل عالقة
  // بالمستوى القديم والصفحة بتقرأه من السيرفر كل مرة.
  const chooseLevel = async (next: CefrLevel) => {
    setLevel(next);
    setSublevel(1);
    setLevelSheetOpen(false);
    await saveHomePreferences({ level: next, language });
    router.refresh();
  };

  const chooseSublevel = (next: 1 | 2) => {
    setSublevel(next);
    setLevelSheetOpen(false);
  };

  const chooseLanguage = async (next: LanguageCode) => {
    setLanguage(next);
    await saveHomePreferences({ level, language: next });
    router.refresh();
  };

  const personas = PERSONAS_BY_LANGUAGE[language];
  const savedPersonaId = PERSONAS.some((p) => p.id === defaultPersonaId)
    ? defaultPersonaId
    : null;

  return (
    <div className="flex flex-col items-center gap-10 py-16">
      <header className="flex flex-col items-center gap-4 px-6 text-center">
        <span className="text-6xl">☕</span>
        <h1 className="text-4xl font-bold tracking-tight">كلمني</h1>
        <p className="max-w-md text-lg leading-8 text-muted">
          اتكلم مع مدرّس ذكاء اصطناعي بيتكلم معاك طبيعي، يهزر، يضحك، ويصحّح لك
          بلطف.
        </p>
      </header>

      {progress ? (
        <div className="w-full max-w-lg px-6">
          <ProgressMap {...progress} />
        </div>
      ) : null}

      <div className="flex flex-col items-center gap-3 px-6">
        <p className="text-sm font-semibold text-muted">مستواك دلوقتي</p>
        <button
          type="button"
          onClick={() => setLevelSheetOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2 text-sm font-semibold shadow-sm transition hover:bg-cream"
        >
          <span className="text-base">{level}</span>
          <span className="text-muted">·</span>
          <span className="text-xs text-muted">{level}.{sublevel}</span>
          <span aria-hidden className="text-muted">▾</span>
        </button>
      </div>

      {levelSheetOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-4 sm:items-center"
          onClick={() => setLevelSheetOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm overflow-hidden rounded-organic border border-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <p className="font-semibold">اختار المستوى</p>
              <button
                type="button"
                onClick={() => setLevelSheetOpen(false)}
                className="text-xs text-muted"
              >
                إغلاق
              </button>
            </div>
            <div className="flex flex-col">
              {CEFR_LEVELS.map((option) => {
                const isActive = option === level;
                return (
                  <div key={option} className="border-t border-border">
                    <button
                      type="button"
                      onClick={() => chooseLevel(option)}
                      className={`flex w-full items-center justify-between px-5 py-3 text-sm font-semibold transition ${
                        isActive ? "bg-cream" : "hover:bg-cream"
                      }`}
                    >
                      <span>{option}</span>
                      {isActive ? <span className="text-xs text-terracotta">مختار</span> : null}
                    </button>
                    {isActive ? (
                      <div className="flex gap-2 px-5 pb-3">
                        <button
                          type="button"
                          onClick={() => chooseSublevel(1)}
                          className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                            sublevel === 1
                              ? "bg-espresso text-cream"
                              : "border border-border hover:bg-cream"
                          }`}
                        >
                          {option}.1
                        </button>
                        <button
                          type="button"
                          onClick={() => chooseSublevel(2)}
                          className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                            sublevel === 2
                              ? "bg-espresso text-cream"
                              : "border border-border hover:bg-cream"
                          }`}
                        >
                          {option}.2
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-center gap-3 px-6">
        <p className="text-sm font-semibold text-muted">
          اختر اللغة والشخصية اللي هيتكلم معاك
        </p>
        <div
          role="tablist"
          aria-label="اللغة"
          className="flex flex-wrap justify-center gap-2 rounded-full border border-border bg-card p-1.5"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="tab"
              aria-selected={l.code === language}
              onClick={() => chooseLanguage(l.code)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                l.code === language
                  ? "bg-espresso text-cream"
                  : "text-muted hover:bg-cream"
              }`}
            >
              <span aria-hidden>{l.flag}</span>
              {l.nameAr}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-lg flex-col items-center gap-3 px-6">
        <p className="text-sm font-semibold text-muted">سيناريو جاهز (اختياري)</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setScenario("")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              scenario === "" ? "bg-espresso text-cream" : "border border-border hover:bg-cream"
            }`}
          >
            حر
          </button>
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                scenario === s.id ? "bg-espresso text-cream" : "border border-border hover:bg-cream"
              }`}
            >
              {s.emoji} {s.titleAr}
            </button>
          ))}
        </div>
        <Link
          href={`/session?lang=${language}&level=${level}&persona=${personas[0]?.id}&minutes=5&part=${sublevel}`}
          className="rounded-full border border-terracotta/40 px-5 py-2 text-sm font-semibold text-terracotta transition hover:bg-terracotta-soft/30"
        >
          ⚡ وضع ٥ دقائق تحدي
        </Link>
      </div>

      <ul className="grid w-full max-w-lg grid-cols-1 gap-4 px-6 sm:grid-cols-2">
        {personas.map((persona) => {
          const isSelected = savedPersonaId === persona.id;
          const href = `/session?lang=${language}&level=${level}&persona=${persona.id}&part=${sublevel}${scenario ? `&scenario=${scenario}` : ""}`;
          return (
            <li key={persona.id}>
              <Link
                href={href}
                className={`flex flex-col gap-2 rounded-organic border p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-terracotta ${
                  isSelected
                    ? "border-terracotta bg-cream"
                    : "border-border bg-card"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-3xl">{persona.emoji}</span>
                  <span className="flex flex-col text-start">
                    <span className="font-semibold">{persona.name}</span>
                    <span className="text-sm text-muted">
                      {LANGUAGES.find((l) => l.code === persona.language)?.flag}{" "}
                      {LANGUAGES.find((l) => l.code === persona.language)?.nameAr}
                    </span>
                  </span>
                </span>
                <span className="text-sm text-muted">
                  {persona.traits.slice(0, 3).join(" · ")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
