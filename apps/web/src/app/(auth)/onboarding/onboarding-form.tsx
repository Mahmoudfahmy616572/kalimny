"use client";

import {
  CEFR_LEVELS,
  DAILY_MINUTES_OPTIONS,
  DEFAULT_PERSONAS,
  GOAL_IDS,
  GOAL_LABELS,
  INTEREST_IDS,
  INTEREST_LABELS,
  LANGUAGES,
  pickLevelByGoal,
  type CefrLevel,
  type GoalId,
  type InterestId,
  type LanguageCode,
} from "@kalimny/shared";
import { useActionState, useState } from "react";

import { saveOnboardingAction, type OnboardingState } from "./actions";

const STEPS = ["اللغة والمستوى", "الهدف", "الاهتمامات", "الوقت اليومي"] as const;

export function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [level, setLevel] = useState<CefrLevel>("A1");
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [interests, setInterests] = useState<InterestId[]>([]);
  const [dailyMinutes, setDailyMinutes] = useState<number | null>(null);

  const [state, formAction, pending] = useActionState<OnboardingState, FormData>(
    saveOnboardingAction,
    { error: null },
  );

  const canNext =
    (step === 0 && language && level) ||
    (step === 1 && goal) ||
    (step === 2 && interests.length >= 1 && interests.length <= 3) ||
    (step === 3 && dailyMinutes);

  function toggleInterest(id: InterestId) {
    setInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  }

  function handleGoalSelect(g: GoalId) {
    setGoal(g);
    setLevel(pickLevelByGoal(g));
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 px-6 py-16">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`h-2 rounded-full transition-all ${
              i === step ? "w-8 bg-terracotta" : i < step ? "w-4 bg-espresso" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <p className="text-center text-sm font-semibold text-muted">
        الخطوة {step + 1} من {STEPS.length} — {STEPS[step]}
      </p>

      {/* Step 0: Language + Level */}
      {step === 0 && (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-bold">إيه اللغة اللي عايز تتعلمها؟</h2>
            <div className="grid w-full grid-cols-2 gap-3">
              {LANGUAGES.map((l) => {
                const persona = DEFAULT_PERSONAS[l.code];
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`flex items-center gap-3 rounded-organic border p-4 text-start transition ${
                      language === l.code
                        ? "border-terracotta bg-cream shadow-sm"
                        : "border-border bg-card hover:border-terracotta"
                    }`}
                  >
                    <span className="text-3xl">{l.flag}</span>
                    <span className="flex flex-col">
                      <span className="font-semibold">{l.nameAr}</span>
                      <span className="text-sm text-muted">
                        {persona.emoji} {persona.name}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-muted">مستواك فيها دلوقتي</p>
            <div className="flex flex-wrap justify-center gap-2 rounded-full border border-border bg-card p-1.5">
              {CEFR_LEVELS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLevel(option)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    option === level
                      ? "bg-espresso text-cream"
                      : "text-muted hover:bg-cream"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 1: Goal */}
      {step === 1 && (
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">عايز تتعلم اللغة ليه؟</h2>
          <p className="text-center text-muted">ده بيحدّد الأمثلة والسيناريوهات اللي هتتعلمها.</p>
          <div className="flex w-full flex-col gap-3">
            {GOAL_IDS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleGoalSelect(g)}
                className={`rounded-organic border p-4 text-start font-semibold transition ${
                  goal === g
                    ? "border-terracotta bg-cream shadow-sm"
                    : "border-border bg-card hover:border-terracotta"
                }`}
              >
                {GOAL_LABELS[g]}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 2: Interests */}
      {step === 2 && (
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">إيه اللي بتحب تتكلم فيه؟</h2>
          <p className="text-center text-muted">اختار من 1 لـ 3 اهتمامات — هنستخدمها في الأمثلة.</p>
          <div className="grid w-full grid-cols-2 gap-3">
            {INTEREST_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleInterest(id)}
                className={`rounded-organic border p-4 text-center font-semibold transition ${
                  interests.includes(id)
                    ? "border-terracotta bg-cream shadow-sm"
                    : "border-border bg-card hover:border-terracotta"
                }`}
              >
                {INTEREST_LABELS[id]}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted">اختارت {interests.length} من 3</p>
        </section>
      )}

      {/* Step 3: Daily minutes + Submit */}
      {step === 3 && (
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">تقدر تخصّص كام وقت للتعلم يوميًا؟</h2>
          <p className="text-center text-muted">ده بيحدّد وتيرة الدروس.</p>
          <div className="flex w-full flex-col gap-3">
            {DAILY_MINUTES_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDailyMinutes(opt.value)}
                className={`rounded-organic border p-4 text-center font-semibold transition ${
                  dailyMinutes === opt.value
                    ? "border-terracotta bg-cream shadow-sm"
                    : "border-border bg-card hover:border-terracotta"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {state.error && (
        <p className="text-center text-sm font-semibold text-red-600">{state.error}</p>
      )}

      {/* Nav buttons */}
      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border border-border px-6 py-2.5 font-semibold transition hover:bg-cream"
          >
            رجوع
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            className="rounded-full bg-terracotta px-8 py-2.5 font-semibold text-white transition hover:brightness-95 disabled:opacity-40"
          >
            التالي
          </button>
        ) : (
          <form action={formAction}>
            <input type="hidden" name="language" value={language} />
            <input type="hidden" name="level" value={level} />
            <input type="hidden" name="goal" value={goal ?? ""} />
            <input type="hidden" name="dailyMinutes" value={dailyMinutes ?? ""} />
            {interests.map((id) => (
              <input key={id} type="hidden" name="interests" value={id} />
            ))}
            <button
              type="submit"
              disabled={pending || !dailyMinutes || !goal}
              className="rounded-full bg-terracotta px-8 py-2.5 font-semibold text-white transition hover:brightness-95 disabled:opacity-40"
            >
              {pending ? "جارٍ الحفظ..." : "ابدأ التعلم"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
