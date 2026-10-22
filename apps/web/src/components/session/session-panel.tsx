"use client";

import {
  DEFAULT_LESSON_MINUTES,
  LESSON_DURATIONS_MINUTES,
  PCM_INPUT_RATE,
  PCM_OUTPUT_RATE,
  PLAN_MONTHLY_MINUTES,
  PLAN_MONTHLY_PRICE_EGP,
  QUICK_CHALLENGE_MINUTES,
  TRIAL_LESSON_MINUTES,
  getUnit,
  getScenario,
  type LanguageCode,
  type LessonDurationMinutes,
  type LessonPlan,
  type PersonaSpec,
  type VoiceEvent,
} from "@kalimny/shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { LessonAccount } from "@/lib/lessons/quota";
import {
  PcmPlayer,
  startMicCapture,
  toArrayBuffer,
  type MicStop,
} from "@/lib/voice/audio";
import { GeminiLiveProvider } from "@/lib/voice/gemini-live-provider";

import { Avatar, type AvatarMood } from "./avatar/avatar";
import type { AvatarProbe } from "./avatar/types";
import { type OrbState } from "./orb";

type Phase = "idle" | "connecting" | "live" | "ended";
type Role = "user" | "tutor";
type Correction = { original: string; corrected: string; noteAr: string };
type Turn = { id: number; role: Role; text: string; corrections?: Correction[] };

/** حالة كارت الملخص اللي بيظهر بعد نهاية الجلسة */
type SummaryState = {
  sessionId: string;
  status: "preparing" | "ready" | "incomplete";
};

let turnId = 0;
const nextId = () => ++turnId;

const MIN_DURATION = Math.min(...LESSON_DURATIONS_MINUTES);

type SessionPanelProps = {
  persona: PersonaSpec;
  initialAccount: LessonAccount;
  /** خطة الدرس الحالية (الوحدة + الهدف + الاهتمامات) — بتيجي من onboarding */
  lessonPlan?: LessonPlan;
};

/** رسالة الرفض حسب السبب الجاي من السيرفر — بتوجّه الطالب للإجراء الصح. */
function rejectionMessage(reason: string | undefined): string {
  switch (reason) {
    case "no_credit":
      return `خلصت دروسك التجريبية — اشترك بـ ${PLAN_MONTHLY_PRICE_EGP} ج/شهر وخد ${PLAN_MONTHLY_MINUTES} دقيقة`;
    case "insufficient_minutes":
      return "خلصت دقايق اشتراكك الشهري — جدّده عشان تكمّل";
    case "trial_requires_minutes":
      return `التجربة ${TRIAL_LESSON_MINUTES} دقيقة بس — الاشتراك يفتح لك 30 و 50 دقيقة`;
    default:
      return "مفيش رصيد كافي دلوقتي";
  }
}

export function SessionPanel({
  persona,
  initialAccount,
  lessonPlan,
}: SessionPanelProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [micOn, setMicOn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [liveUser, setLiveUser] = useState("");
  const [liveTutor, setLiveTutor] = useState("");
  const [correctionsByTurn, setCorrectionsByTurn] = useState<Record<number, Correction[]>>({});
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [draft, setDraft] = useState("");
  const [account, setAccount] = useState<LessonAccount>(initialAccount);
  const [lessonMinutes, setLessonMinutes] = useState<LessonDurationMinutes>(
    DEFAULT_LESSON_MINUTES,
  );
  const [sessionSource, setSessionSource] = useState<"trial" | "paid" | null>(null);
  const [summary, setSummary] = useState<SummaryState | null>(null);
  /**
   * رقم الوحدة اللي بنشتغل عليها — بيتحدّث من السيرفر بعد ما الجلسة
   * تخلّص وتتقدّم، عشان الخريطة والجلسة اللي بعدها ما يقلّدوش الوحدة القديمة.
   */
  const [unitIndexOverride, setUnitIndexOverride] = useState<number | null>(null);
  /** عدّادات بتفجّر حركات الأفاتار: تلويحة عند بداية الجلسة، ورفع إيدين عند الحماس. */
  const [waveKey, setWaveKey] = useState(0);
  const [cheerKey, setCheerKey] = useState(0);
  const prevMoodRef = useRef<AvatarMood>("neutral");
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const avatarBoxRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<AvatarProbe>({ raw: 0, level: 0, mouth: 0, arm: 0 });
  const reportProbe = useCallback((values: AvatarProbe) => {
    probeRef.current = values;
  }, []);
  const debugRef = useRef<HTMLDivElement>(null);
  const debug = useSearchParams().get("debug") === "1";
  const scenarioId = useSearchParams().get("scenario");
  const minutesParam = useSearchParams().get("minutes");

  const providerRef = useRef<GeminiLiveProvider | null>(null);
  const playerRef = useRef<PcmPlayer | null>(null);
  const micStopRef = useRef<MicStop | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const stopRef = useRef<(() => Promise<void>) | null>(null);
  const liveUserRef = useRef("");
  const liveTutorRef = useRef("");
  const micOnRef = useRef(true);
  // تسوية الرصيد: الدرس المفتوح ولحظة ما الصوت اشتغل فعلاً.
  const sessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef<number | null>(null);
  // نسخة refs من turns عشان settle() تقدر تبعت transcript من غير ما تبقى قديمة.
  const turnsRef = useRef<Turn[]>([]);
  // بيانات الجلسة الحالية عشان settle() تبعتها مع التسوية (ترجمة الملخص).
  const lessonMetaRef = useRef<{
    language: LanguageCode;
    unitIndex: number;
    lessonMinutes: number;
  } | null>(null);
  // بيمنع إنهاء الجلسة أكتر من مرة لما التايمر يعدّي الحد.
  const autoEndedRef = useRef(false);

  // الوحدة الفعلية اللي بنشتغل عليها دلوقتي (بتحوّل بعد ما الجلسة تتقدّم).
  const activeUnitIndex = unitIndexOverride ?? lessonPlan?.unitIndex ?? 0;
  const activeLessonPlan = useMemo<LessonPlan | undefined>(() => {
    if (!lessonPlan) {
      return undefined;
    }
    return {
      ...lessonPlan,
      unitIndex: activeUnitIndex,
      unit: getUnit(persona.language, persona.level, activeUnitIndex),
    };
  }, [lessonPlan, activeUnitIndex, persona.language, persona.level]);

  // هل الطالب لسه في التجربة؟ (مفيش اشتراك نشط + فاضل دروس)
  const isTrial = !account.hasActivePlan && account.trialLessonsLeft > 0;

  // المدد المتاحة: الاشتراك حسب الدقايق المتبقية، والتجربة 15 دقيقة بس.
  const allowedDurations: readonly LessonDurationMinutes[] = account.hasActivePlan
    ? LESSON_DURATIONS_MINUTES.filter((value) => value <= account.paidMinutesLeft)
    : isTrial
      ? LESSON_DURATIONS_MINUTES.filter((value) => value === TRIAL_LESSON_MINUTES)
      : [];

  const canStart = account.hasActivePlan
    ? account.paidMinutesLeft >= MIN_DURATION
    : account.trialLessonsLeft > 0;

  // المدة الفعلية مشتقة من الرصيد — من غير مزامنة state في effect.
  const requestedMinutes = minutesParam ? parseInt(minutesParam) : null;
  const effectiveLessonMinutes: LessonDurationMinutes = (requestedMinutes === QUICK_CHALLENGE_MINUTES
    ? QUICK_CHALLENGE_MINUTES
    : account.hasActivePlan
      ? allowedDurations.includes(lessonMinutes)
        ? lessonMinutes
        : (allowedDurations[allowedDurations.length - 1] ?? lessonMinutes)
      : TRIAL_LESSON_MINUTES) as LessonDurationMinutes;

  const commit = useCallback((role: Role, text: string, corrections?: Correction[]) => {
    const trimmed = text.trim();
    if (trimmed) {
      const last = turnsRef.current[turnsRef.current.length - 1];
      if (last && last.role === role && last.text === trimmed) {
        // نفس الرسالة اتكررت — متجاهلها
        if (role === "user") {
          liveUserRef.current = "";
          setLiveUser("");
        } else {
          liveTutorRef.current = "";
          setLiveTutor("");
        }
        return;
      }
      const turn: Turn = { id: nextId(), role, text: trimmed, corrections };
      setTurns((prev) => [...prev, turn]);
      turnsRef.current = [...turnsRef.current, turn];
      // بنبعت كل رسالة مكتوبة/منطوقة للخارج — الصفحة الخارجية (وضع تحديد
      // المستوى) بتجمّعهم عشان تقيّم الترانسكريبت.
      window.dispatchEvent(
        new CustomEvent("kalimny:transcript", {
          detail: { role: role === "user" ? "user" : "assistant", content: trimmed },
        }),
      );
      if (role === "user" && corrections && corrections.length > 0) {
        setCorrectionsByTurn((prev) => ({ ...prev, [turn.id]: corrections }));
      }
    }
    if (role === "user") {
      liveUserRef.current = "";
      setLiveUser("");
    } else {
      liveTutorRef.current = "";
      setLiveTutor("");
    }
  }, []);

  const handleEvent = useCallback(
    (event: VoiceEvent) => {
      switch (event.type) {
        case "status": {
          if (event.status === "connecting") setPhase("connecting");
          else if (event.status === "live") {
            setPhase("live");
            setWaveKey((key) => key + 1);
            setSessionStartedAt((prev) => prev ?? Date.now());
          } else if (event.status === "idle") setPhase("idle");
          else if (event.status === "ended") {
            // الموديل قفل الجلسة (خلص وقتها) — نسوّي الرصيد ونعرض الملخص.
            setPhase("ended");
            void stopRef.current?.();
          } else if (event.status === "error") setPhase("idle");
          break;
        }
        case "user-transcript": {
          liveUserRef.current = event.final ? "" : event.text;
          if (event.final) commit("user", event.text);
          else setLiveUser(event.text);
          break;
        }
        case "tutor-transcript": {
          liveTutorRef.current = event.final ? "" : event.text;
          if (event.final) commit("tutor", event.text);
          else setLiveTutor(event.text);
          break;
        }
        case "audio-out": {
          playerRef.current?.enqueue(new Int16Array(event.chunk));
          setIsSpeaking(true);
          break;
        }
        case "interrupted": {
          playerRef.current?.interrupt();
          setIsSpeaking(false);
          break;
        }
        case "correction": {
          setCorrectionsByTurn((prev) => {
            const lastUser = [...turnsRef.current].reverse().find((t) => t.role === "user");
            if (!lastUser) return prev;
            return { ...prev, [lastUser.id]: [{ original: event.original, corrected: event.corrected, noteAr: event.noteAr }] };
          });
          break;
        }
        case "turn-complete": {
          setIsSpeaking(false);
          if (liveUserRef.current) {
            const lastCorrections = (() => {
              const lastUser = [...turnsRef.current].reverse().find((t) => t.role === "user");
              if (!lastUser) return undefined;
              return correctionsByTurn[lastUser.id] || turns.find((t) => t.id === lastUser.id)?.corrections;
            })();
            commit("user", liveUserRef.current, lastCorrections);
          }
          if (liveTutorRef.current) commit("tutor", liveTutorRef.current);
          break;
        }
        case "error": {
          setError(event.message);
          if (event.fatal) {
            setPhase("idle");
            // حصة انتهت فعلاً — نقفل الميكروفون والمشغّل معاً
            void stopRef.current?.();
          }
          break;
        }
        default:
          break;
      }
    },
    [commit],
  );

  /**
   * بيقفل الدرس المفتوح مع السيرفر — تسوية بالدقايق الفعلية، أو إلغاء كامل
   * لو الصوت ما وصلش لحالة live أصلًا، عشان ما يتحسبش عليه حتى الدقيقة الدنيا.
   *
   * بيصفّر الـ refs أول حاجة، فالتنطيف أو قفل الصفحة مش هيبعتوا نفس الدرس مرتين.
   */
  const settle = useCallback(async () => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) {
      return;
    }
    sessionIdRef.current = null;

    const startedAt = startedAtRef.current;
    startedAtRef.current = null;

    const meta = lessonMetaRef.current;
    lessonMetaRef.current = null;

    const transcript = turnsRef.current.map((t) => ({
      role: t.role,
      text: t.text,
    }));
    turnsRef.current = [];

    const payload =
      startedAt === null || meta === null
        ? { sessionId, void: true }
        : {
            sessionId,
            usedSeconds: Math.max(
              0,
              Math.round((Date.now() - startedAt) / 1000),
            ),
            transcript,
            language: meta.language,
            unitIndex: meta.unitIndex,
            lessonMinutes: meta.lessonMinutes,
          };

    try {
      const response = await fetch("/api/voice/lesson/end", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (!response.ok) {
        return;
      }
      const data = (await response.json()) as {
        account?: LessonAccount;
        summaryStatus?: "pending" | "incomplete" | "none";
      };
      if (data.account) {
        setAccount(data.account);
      }
      if (data.summaryStatus === "pending") {
        setSummary({ sessionId, status: "preparing" });
      } else if (data.summaryStatus === "incomplete") {
        setSummary({ sessionId, status: "incomplete" });
      }
    } catch {
      /* التسوية بتتأجل للفتحة اللي بعدها أو للتنطيف التالي */
    }
  }, []);

  const stop = useCallback(async () => {
    void settle();

    micStopRef.current?.();
    micStopRef.current = null;
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;

    const provider = providerRef.current;
    providerRef.current = null;
    if (provider) {
      try {
        await provider.disconnect();
      } catch {
        /* خلاص قفل */
      }
    }

    const player = playerRef.current;
    playerRef.current = null;
    if (player) {
      await player.close();
    }

    liveUserRef.current = "";
    liveTutorRef.current = "";
    setLiveUser("");
    setLiveTutor("");
    setIsSpeaking(false);
    setPhase("idle");
    setSessionStartedAt(null);
    setElapsed(0);
  }, [settle]);

  useEffect(() => {
    stopRef.current = stop;
  }, [stop]);

  // كارت الملخص: بنسأل السيرفر كل شوية لحد ما الملخص يتولّد فعلاً (بدل ما نخمّن).
  // backoff تصاعدي: أول سؤال بعد ١.٢ ثانية وبعدين بيزيد تدريجيًا لحد ٤ ثواني،
  // فبيقلل عدد الطلبات بنسبة ~٤٠٪ عن الفاصل الثابت ٢٫٥ ثانية لمدة انتظار متوقعة مشابهة.
  useEffect(() => {
    if (!summary || summary.status !== "preparing") {
      return;
    }
    const { sessionId } = summary;
    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const POLL_DELAYS_MS = [1200, 1500, 2000, 2500, 3000, 3000, 3500, 4000];
    const MAX_ATTEMPTS = POLL_DELAYS_MS.length + 6;

    const poll = async () => {
      attempts += 1;
      try {
        const response = await fetch(
          `/api/voice/summary-status?sessionId=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        if (response.ok) {
          const data = (await response.json()) as {
            ready?: boolean;
            unitIndex?: number;
          };
          if (!cancelled && data.ready) {
            // بنسحب رقم الوحدة من السيرفر (مش بنخمّنه) — الحقيقة هي اللي
            // بتفرق سواء الدرس اتقدّم فعلًا ولا لسه.
            if (typeof data.unitIndex === "number") {
              setUnitIndexOverride(data.unitIndex);
            }
            setSummary((prev) =>
              prev && prev.sessionId === sessionId
                ? { ...prev, status: "ready" }
                : prev,
            );
            return;
          }
        }
      } catch {
        /* نجرّب تاني في اللفة اللي بعدها */
      }

      if (cancelled || attempts >= MAX_ATTEMPTS) return;
      const delay =
        POLL_DELAYS_MS[Math.min(attempts - 1, POLL_DELAYS_MS.length - 1)];
      timer = setTimeout(() => void poll(), delay);
    };

    timer = setTimeout(() => void poll(), POLL_DELAYS_MS[0]);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [summary]);

  // لو الطالب قفل الصفحة أو راح على تاب تاني في نص الدرس، نقفل الرصيد.
  useEffect(() => {
    const onHide = () => {
      void settle();
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, [settle]);

  const start = useCallback(async () => {
    setError(null);
    setSummary(null);
    autoEndedRef.current = false;
    setPhase("connecting");

    let provider: GeminiLiveProvider | null = null;

    try {
      const { getSessionRecap } = await import("@/app/(app)/session/recap-actions");
      const recap = await getSessionRecap(persona.language);
      const response = await fetch("/api/voice/token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ minutes: effectiveLessonMinutes }),
      });

      if (response.status === 401) {
        throw new Error("لازم تسجّل دخول الأول");
      }
      if (response.status === 403) {
        const data = (await response.json()) as {
          reason?: string;
          account?: LessonAccount;
        };
        if (data.account) {
          setAccount(data.account);
        }
        throw new Error(rejectionMessage(data.reason));
      }
      if (!response.ok) {
        throw new Error("مقدرّش نجهّز جلسة الصوت دلوقتي");
      }

      const data = (await response.json()) as {
        token: string;
        model: string;
        sessionId: string;
        source: "trial" | "paid";
        account: LessonAccount;
      };

      sessionIdRef.current = data.sessionId;
      lessonMetaRef.current = {
        language: persona.language,
        unitIndex: activeUnitIndex,
        lessonMinutes: effectiveLessonMinutes,
      };
      setSessionSource(data.source);
      if (data.account) {
        setAccount(data.account);
      }

      provider = new GeminiLiveProvider();
      playerRef.current = new PcmPlayer(PCM_OUTPUT_RATE);
      unsubscribeRef.current = provider.on(handleEvent);
      providerRef.current = provider;

      const scenario = getScenario(scenarioId);
      const scenarioLine = scenario
        ? `\n\n## SCENARIO (ROLEPLAY)\nAct as if you're in this real situation: ${scenario.titleAr}.\n${scenario.promptAr}\nKeep it natural, Egyptian Arabic friendly, teach ${persona.language.toUpperCase()} inside it.\nStay in this scenario unless learner clearly changes it.`
        : "";
      // السياق: ٤ رسايل آخر مقصوصة. إرسال ٦ كاملة كان بياكل tokens من
      // غير فايدة ومبيحافظش على تناسق أطول.
      const contextMsgs = [...turnsRef.current]
        .slice(-4)
        .map((t) => {
          const text = t.text.length > 400 ? `${t.text.slice(0, 400)}…` : t.text;
          return `${t.role === "user" ? "Learner" : "Tutor"}: ${text}`;
        })
        .join("\n");
      const contextLine = contextMsgs ? `\n\n## RECENT CONTEXT\nKeep continuity with this recent conversation:\n${contextMsgs}` : "";
      const planWithRecap = {
        ...(activeLessonPlan ?? {
          unit: getUnit(persona.language, persona.level, activeUnitIndex),
          goal: null,
          interests: [],
          recapWords: [],
          unitIndex: activeUnitIndex,
        }),
        durationMinutes: effectiveLessonMinutes,
        recapWords: [
          ...(activeLessonPlan?.recapWords ?? []),
          ...(recap ? [recap] : []),
          ...(scenarioLine ? [scenarioLine] : []),
          ...(contextLine ? [contextLine] : []),
        ],
      };
      await provider.connect({
        persona,
        token: data.token,
        model: data.model,
        lessonPlan: planWithRecap,
      });

      if (micOnRef.current) {
        micStopRef.current = await startMicCapture({
          sampleRate: PCM_INPUT_RATE,
          onChunk: (chunk) => provider?.sendAudio(toArrayBuffer(chunk)),
        });
      }

      // من هنا بس نعدّ الوقت — قبل كده الدرس ما اشتغلش.
      startedAtRef.current = Date.now();
      setPhase("live");
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "حصل خطأ غير متوقع";
      setError(message);

      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      if (provider) {
        try {
          await provider.disconnect();
        } catch {
          /* لا شيء */
        }
      }
      providerRef.current = null;
      const player = playerRef.current;
      playerRef.current = null;
      if (player) await player.close();

      // نقفل الرصيد: settle() بتعرف لوحده هل الصوت وصل لحالة live ولا لأ —
      // لو لأ بتلغي الدرس بالكامل، ولو ايوه بتخصم الدقايق الفعلية.
      void settle();

      setPhase("idle");
    }
  }, [handleEvent, effectiveLessonMinutes, persona, activeLessonPlan, activeUnitIndex, settle]);

  const toggleMic = useCallback(async () => {
    const next = !micOnRef.current;
    micOnRef.current = next;
    setMicOn(next);

    if (next) {
      const provider = providerRef.current;
      if (provider && !micStopRef.current) {
        try {
          micStopRef.current = await startMicCapture({
            sampleRate: PCM_INPUT_RATE,
            onChunk: (chunk) => provider.sendAudio(toArrayBuffer(chunk)),
          });
        } catch (err) {
          micOnRef.current = false;
          setMicOn(false);
          const error = err as Error & { name?: string };
          const message = error?.message?.toLowerCase() || "";
          const inApp =
            typeof navigator !== "undefined" &&
            /fbav|fban|instagram|whatsapp|line|twitter|linkedinapp|wv/i.test(
              navigator.userAgent,
            );

          if (
            error?.name === "NotAllowedError" ||
            message.includes("permission") ||
            message.includes("denied")
          ) {
            setError(
              inApp
                ? "المتصفح جوه التطبيق ده مش بيسمح بطلب إذن الميكروفون.\n\n١) دوس على الثلاث نقاط (⋮) → افتح في المتصفح\n٢) أو افتح kalimny.vercel.app مباشرة في Chrome / Safari\n٣) جرب تشغل الميكروفون تاني"
                : "المتصفح مانع طلب إذن الميكروفون.\n\n١) دوس على قفل الموقع 🔒 جنب العنوان\n٢) الميكروفون → السماح\n٣) اعمل تحديث للصفحة وجرب تاني\n\nلو مفيش خيار السماح، افتح إعدادات المتصفح → إعدادات الموقع → الميكروفون واحذف الموقع من المحظور وحطّه على السماح.",
            );
            return;
          }

          if (error?.name === "NotFoundError") {
            setError("مفيش ميكروفون متصل بالجهاز. تأكد إن المايك شغال أو جرب جهاز تاني.");
            return;
          }

          if (error?.name === "NotSupportedError") {
            setError("المتصفح ده مش بيدعم الميكروفون. جرب تفتح الموقع في Chrome أو Safari.");
            return;
          }

          setError(
            "مقدرّش نفتح الميكروفون.\n\nلو فاتح من جوه واتساب أو فيسبوك افتح الموقع في متصفح لوحده، ده بيحل المشكلة جدًا.",
          );
        }
      }
    } else {
      micStopRef.current?.();
      micStopRef.current = null;
    }
  }, []);

  const sendDraft = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    providerRef.current?.sendText(text);
    setDraft("");
  }, [draft]);

  const endSession = useCallback(() => {
    const mins = startedAtRef.current ? Math.max(1, Math.round((Date.now() - startedAtRef.current) / 60000)) : effectiveLessonMinutes;
    type XpModule = {
      awardXp?: (minutes: number) => Promise<unknown>;
      getXp?: () => Promise<{ streak?: number }>;
    };
    import("@/lib/xp/actions").then(async (mod: XpModule) => {
      if (mod.awardXp) await mod.awardXp(mins);
      const xp = await (mod.getXp ? mod.getXp() : Promise.resolve({ streak: 0 }));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("kalimny:xp", { detail: { gained: Math.max(10, Math.round(mins * 2)), streak: xp.streak || 0 } }));
      }
    }).catch(() => {});
    void stop();
  }, [stop, effectiveLessonMinutes]);

  useEffect(() => {
    if (phase !== "live" || !sessionStartedAt) return;
    const limitMs = effectiveLessonMinutes * 60 * 1000;
    const tick = () => {
      const value = Date.now() - sessionStartedAt;
      setElapsed(value);
      if (!autoEndedRef.current && value >= limitMs) {
        autoEndedRef.current = true;
        endSession();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [phase, sessionStartedAt, effectiveLessonMinutes, endSession]);

  useEffect(() => {
    return () => {
      void stop();
    };
  }, [stop]);

  const orbState: OrbState =
    phase === "connecting"
      ? "connecting"
      : phase !== "live"
        ? "idle"
        : !micOn
          ? "muted"
          : isSpeaking
            ? "speaking"
            : "listening";

  const getLevel = useCallback(() => playerRef.current?.getLevel() ?? 0, []);

  const latestTutorText =
    liveTutor ||
    [...turns].reverse().find((turn) => turn.role === "tutor")?.text ||
    "";

  const mood: AvatarMood = useMemo(() => {
    if (phase === "live" && isSpeaking) {
      if (
        /(?:برافو|أحسنت|ممتاز|رائع|عظيم|جامد|تحفة|يلا+|🎉|👏)/.test(
          latestTutorText,
        )
      ) {
        return "excited";
      }
      if (/[؟?]\s*$/.test(latestTutorText)) return "thinking";
      return "happy";
    }
    return phase === "live" ? "listening" : "neutral";
  }, [phase, isSpeaking, latestTutorText]);

  useEffect(() => {
    if (mood === "excited" && prevMoodRef.current !== "excited") {
      setCheerKey((key) => key + 1);
    }
    prevMoodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, liveUser, liveTutor]);

  // تتبّع مستوى صوت المدرّس (من غير setState) — للتنقيب والاختبارات والتشخيص.
  useEffect(() => {
    const timer = setInterval(() => {
      const el = avatarBoxRef.current;
      const player = playerRef.current;
      const level = player?.getLevel() ?? 0;
      if (el) {
        el.dataset.level = level.toFixed(3);
        el.dataset.audio = player ? player.audioState : "closed";
        el.dataset.mouth = probeRef.current.mouth.toFixed(3);
        el.dataset.arm = probeRef.current.arm.toFixed(3);
        el.dataset.raw = probeRef.current.raw.toFixed(3);
      }
      if (debug && debugRef.current) {
        const p = probeRef.current;
        debugRef.current.textContent =
          `debug · level=${level.toFixed(2)} · raw=${p.raw.toFixed(2)} · avatarLevel=${p.level.toFixed(2)}` +
          ` · mouth=${p.mouth.toFixed(2)} · arm=${p.arm.toFixed(2)}` +
          ` · audio=${player?.audioState ?? "closed"} · phase=${phase}` +
          ` · speaking=${isSpeaking ? 1 : 0} · mic=${micOn ? 1 : 0}`;
      }
    }, 120);
    return () => clearInterval(timer);
  }, [debug, phase, isSpeaking, micOn]);

  // أي ضغطة من المستخدم بتفتح سياق الصوت — علاج لسياقات بتفضل معلّقة
  // على بعض المتصفحات/الإعدادات فتفضل قراءة مستوى الصوت صفر.
  useEffect(() => {
    const unlock = () => {
      void playerRef.current?.unlock();
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const balanceLabel = account.hasActivePlan
    ? `اشتراكك: فاضل ${account.paidMinutesLeft} دقيقة`
    : account.trialLessonsLeft > 0
      ? `تجربة مجانية: فاضل ${account.trialLessonsLeft} دروس × ${TRIAL_LESSON_MINUTES} دقيقة`
      : "مفيش رصيد متتبقّي";

  const elapsedSeconds = Math.floor(elapsed / 1000);
  const remainingSeconds = Math.max(0, effectiveLessonMinutes * 60 - elapsedSeconds);
  const clock = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  // مستوى الوحدة الحالية (A1.1 / A1.2) لو المنهج محدّده.
  const levelLabel = activeLessonPlan?.unit.sublevel
    ? `${activeLessonPlan.unit.level ?? persona.level}.${activeLessonPlan.unit.sublevel}`
    : persona.level;

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col gap-3 overflow-hidden px-3 py-3 lg:flex-row lg:gap-6 lg:px-6 lg:py-5">
      <section className="flex min-h-0 w-full max-h-[36dvh] flex-col items-center gap-1 overflow-hidden lg:max-h-none lg:flex-1 lg:gap-4">
      <header className="flex w-full flex-col items-center gap-0.5 text-center lg:gap-1">
        <p className="hidden text-sm text-muted lg:block">
          {persona.emoji} {persona.name} · {persona.language.toUpperCase()} ·
          المستوى {levelLabel} · {effectiveLessonMinutes} دقيقة
        </p>
        <h1 className="hidden text-2xl font-bold lg:block">محادثة طبيعية</h1>
        <p className="hidden text-sm text-muted lg:block">
          {account.hasActivePlan ? (
            <>
              فاضل لك{" "}
              <span className="font-semibold text-foreground">
                {account.paidMinutesLeft}
              </span>{" "}
              دقيقة من اشتراكك
            </>
          ) : account.trialLessonsLeft > 0 ? (
            <>
              فاضل لك{" "}
              <span className="font-semibold text-foreground">
                {account.trialLessonsLeft}
              </span>{" "}
              دروس تجريبية · {TRIAL_LESSON_MINUTES} دقيقة لكل درس
            </>
          ) : (
            <span className="font-semibold text-foreground">{balanceLabel}</span>
          )}
        </p>
      </header>

      {phase === "live" && sessionStartedAt ? (
        <div className="flex w-full items-center justify-between gap-2 rounded-full border border-border px-3 py-1 text-[11px]">
          <span className="text-muted">استغرقنا {clock(elapsedSeconds)}</span>
          <span
            className={
              remainingSeconds <= 60
                ? "font-semibold text-red-600"
                : "font-semibold"
            }
          >
            متبقي {clock(remainingSeconds)}
          </span>
        </div>
      ) : null}

      <div className="flex w-full items-center justify-between gap-2 lg:hidden">
        <p className="min-w-0 truncate text-xs text-muted">
          {persona.emoji} {persona.name} · {levelLabel}
        </p>
        <span className="shrink-0 rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-muted">
          {account.hasActivePlan
            ? `فاضل ${account.paidMinutesLeft} دقيقة`
            : account.trialLessonsLeft > 0
              ? `فاضل ${account.trialLessonsLeft} دروس تجريبية`
              : balanceLabel}
        </span>
      </div>

      <div
        ref={avatarBoxRef}
        className="relative flex min-h-0 w-full flex-[0.8] items-center justify-center"
      >
        <Avatar
          personaId={persona.id}
          state={orbState}
          mood={mood}
          speaking={phase === "live" && isSpeaking}
          silent={phase === "live" && isSpeaking}
          getLevel={getLevel}
          onProbe={reportProbe}
          waveKey={waveKey}
          cheerKey={cheerKey}
        />
        {debug ? (
          <div
            ref={debugRef}
            data-testid="avatar-debug"
            className="pointer-events-none absolute top-0 left-0 rounded-md bg-black/75 px-2 py-1 text-[10px] text-white"
          >
            debug…
          </div>
        ) : null}
      </div>

      {sessionSource === "trial" && phase !== "idle" ? (
        <p className="mx-auto rounded-full border border-terracotta/40 bg-terracotta-soft/30 px-4 py-1 text-center text-xs font-semibold">
          دي جلسة تجريبية
        </p>
      ) : null}

      {error ? (
        <p className="mx-auto max-w-md whitespace-pre-line rounded-2xl bg-terracotta-soft/50 px-4 py-3 text-center text-sm leading-relaxed">
          {error}
        </p>
      ) : null}

      <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
        {summary && phase === "idle" ? (
          <div
            className={`rounded-organic border px-5 py-4 text-center ${
              summary.status === "incomplete"
                ? "border-terracotta/40 bg-terracotta-soft/25"
                : "border-sage/40 bg-sage-soft/40"
            }`}
          >
            {summary.status === "incomplete" ? (
              <>
                <p className="text-sm font-semibold">قفلت الجلسة بدري</p>
                <p className="mt-1 text-xs text-muted">
                  الملخص بيتجهّز بس لما تكمّل الجلسة للنهاية (٦٠٪ من وقتها على
                  الأقل). كمّل الجلسة وهيتجهّز لوحده.
                </p>
              </>
            ) : summary.status === "ready" ? (
              <>
                <p className="text-sm font-semibold">✅ ملخص جلستك جاهز!</p>
                <Link
                  href="/review"
                  className="mt-3 inline-block rounded-full bg-terracotta px-5 py-2 text-xs font-semibold text-white transition hover:brightness-95"
                >
                  شوف الملخصات ←
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold">📝 بنجهّز ملخص جلستك…</p>
                <p className="mt-1 text-xs text-muted">
                  ثواني بس وهتلاقيه في صفحة الملخصات.
                </p>
                <Link
                  href="/review"
                  className="mt-3 inline-block rounded-full border border-border px-5 py-2 text-xs font-semibold transition hover:bg-cream"
                >
                  افتح الملخصات ←
                </Link>
              </>
            )}
          </div>
        ) : null}

        {phase !== "live" && account.hasActivePlan && allowedDurations.length > 0 ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-muted">مدة الجلسة</span>
            {LESSON_DURATIONS_MINUTES.map((value) => {
              const enabled = value <= account.paidMinutesLeft;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLessonMinutes(value)}
                  disabled={!enabled}
                  className={
                    value === effectiveLessonMinutes
                      ? "rounded-full border border-terracotta bg-terracotta px-4 py-1.5 text-xs font-semibold text-white transition disabled:opacity-40"
                      : "rounded-full border border-border px-4 py-1.5 text-xs font-semibold transition hover:bg-cream disabled:opacity-40"
                  }
                >
                  {value} د
                </button>
              );
            })}
          </div>
        ) : null}

        {!canStart ? (
          <div className="rounded-organic border border-terracotta/40 bg-terracotta-soft/25 px-5 py-4 text-center">
            <p className="text-sm font-semibold">
              اشترك بـ {PLAN_MONTHLY_PRICE_EGP} ج/شهر وخد {PLAN_MONTHLY_MINUTES}{" "}
              دقيقة محادثة
            </p>
            <p className="mt-1 text-xs text-muted">
              {account.hasActivePlan
                ? "خلّصت دقايق الشهر — التجديد قريبًا."
                : "دروسين تجريبيين ما خلصوش؟ لازم اشتراك عشان تكمّل."}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col items-center gap-2">
          {phase === "live" && micOn ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage-soft/40 px-3 py-1 text-xs font-semibold shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />
              بسمعك دلوقتي...
            </div>
          ) : null}
          <div className="flex w-full justify-center gap-2 px-1 lg:gap-3">
            {phase === "live" ? (
              <>
                <button
                  type="button"
                  onClick={() => void toggleMic()}
                  className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-cream"
                >
                  {micOn ? "اكتم الميكروفون" : "شغّل الميكروفون"}
                </button>
                <button
                  type="button"
                  onClick={endSession}
                  className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  إنهاء الجلسة
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => void start()}
                disabled={phase === "connecting" || !canStart}
                className="rounded-full bg-terracotta px-8 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
              >
                {phase === "connecting"
                  ? "بتتجهّز…"
                  : !canStart
                    ? "مفيش رصيد — اشترك"
                    : turns.length > 0
                      ? "ابدأ تاني"
                      : "ابدأ المحادثة"}
              </button>
            )}
          </div>
        </div>
      </div>
      </section>

      <aside className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-organic border border-border bg-card lg:h-full lg:w-[360px] lg:flex-none lg:shrink-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2 lg:px-4 lg:py-3">
          <p className="text-sm font-semibold">
            {persona.emoji} {persona.name}
          </p>
          <span className="text-[11px] text-muted">المحادثة</span>
        </div>

        <div
          ref={chatScrollRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 lg:p-4"
        >
          {turns.length === 0 && !liveTutor && !liveUser ? (
            <p className="text-center text-sm text-muted">
              لسه المحادثة ما ابتدتش — دوس ابدأ وابدأ تتكلم.
            </p>
          ) : null}

          <ul className="flex flex-col gap-3">
          {turns.map((turn) => (
            <li
              key={turn.id}
              className="flex flex-col"
            >
              <div
                className={
                  turn.role === "user"
                    ? "self-start rounded-3xl rounded-ss-sm bg-cream px-4 py-2 text-sm"
                    : "self-end rounded-3xl rounded-se-sm bg-sage-soft/60 px-4 py-2 text-sm"
                }
              >
                <span className="mb-0.5 block text-[11px] font-semibold text-muted">
                  {turn.role === "user" ? "أنت" : persona.name}
                </span>
                {turn.text}
              </div>
              {turn.role === "user" ? (
                <div className="mt-1.5 self-start space-y-1 px-1">
                  {(correctionsByTurn[turn.id] || turn.corrections || []).map((c, idx) => (
                    <div key={idx} className="max-w-[280px] rounded-2xl border border-border bg-card px-3 py-2 text-xs shadow-sm">
                      <p className="font-semibold text-terracotta">تصحيح: {c.corrected}</p>
                      {c.noteAr ? <p className="mt-0.5 text-muted">{c.noteAr}</p> : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </li>
          ))}

            {liveUser ? (
              <li className="self-start rounded-3xl rounded-ss-sm border border-dashed border-border px-4 py-2 text-sm text-muted">
                <span className="mb-0.5 block text-[11px] font-semibold text-muted">
                  أنت
                </span>
                {liveUser}
              </li>
            ) : null}

            {liveTutor ? (
              <li className="self-end rounded-3xl rounded-se-sm border border-dashed border-sage px-4 py-2 text-sm">
                <span className="mb-0.5 block text-[11px] font-semibold text-muted">
                  {persona.name}
                </span>
                {liveTutor}
              </li>
            ) : null}
          </ul>
        </div>

        <div className="flex gap-2 border-t border-border p-2 lg:p-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") sendDraft();
            }}
            placeholder="اكتب لو الميكروفون مقفول…"
            className="flex-1 rounded-2xl border border-border bg-card px-3 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta-soft lg:px-4 lg:py-3"
          />
          <button
            type="button"
            onClick={sendDraft}
            disabled={phase !== "live" || !draft.trim()}
            className="rounded-2xl border border-border px-3 py-2.5 text-sm font-semibold transition hover:bg-cream disabled:opacity-50 lg:px-4 lg:py-3"
          >
            إرسال
          </button>
        </div>
      </aside>
    </div>
  );
}
