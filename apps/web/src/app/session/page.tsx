import {
  CEFR_LEVELS,
  getPersona,
  getPersonaById,
  getUnit,
  type CefrLevel,
  type LanguageCode,
  type LessonPlan,
  type PersonaSpec,
} from "@kalimny/shared";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { SessionPanel } from "@/components/session/session-panel";
import { requireUser } from "@/lib/auth";
import { EMPTY_ACCOUNT } from "@/lib/lessons/quota";
import {
  getLessonPlanContext,
  getSessionBootstrap,
  type LessonPlanContext,
} from "@/lib/preferences";
import { createClient } from "@/lib/supabase/server";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * الصفحة دي بالكامل بتعتمد على الجلسة والرصيد في كل طلب، فمفيش ليها
 * static shell مفيد. `instant = false` بيقول لـ Next إنها route حجبان
 * (blocking) فمتتحاولش تـ prerenderها — وده بيلغي تحذير `searchParams`
 * و`Date.now()` من auth-js وقت الـ prerender.
 */
export const instant = false;

function pick(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SessionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const language = pick(params.lang) as LanguageCode | undefined;
  const level = pick(params.level) as CefrLevel | undefined;
  const personaParam = pick(params.persona);

  if (!language || !level || !CEFR_LEVELS.includes(level)) {
    redirect("/");
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-muted">
          جارٍ تحميل الجلسة…
        </div>
      }
    >
      <SessionLoader
        language={language}
        level={level}
        personaParam={personaParam}
      />
    </Suspense>
  );
}

/**
 * قراءة الجلسة والرصيد وسياق المنهج بتتعمل هنا (خلف حدود Suspense)
 * عشان متندخلش في الـ static shell.
 */
async function SessionLoader({
  language,
  level,
  personaParam,
}: {
  language: LanguageCode;
  level: CefrLevel;
  personaParam?: string;
}) {
  await connection();

  await requireUser();

  // مستخدم جديد لسه ما خلّصش onboarding → نحوّله.
  // نداء واحد بيجيب سياق الدرس + رصيد الدروس (بدل نداءين).
  const bootstrap = await getSessionBootstrap(language);
  let planContext = bootstrap.context;

  if (!planContext?.onboarded) {
    // fallback: لو الـ RPC الجديدة مش متطبّقة لسه، نرجع للطريقة القديمة.
    planContext = await getLessonPlanContext(language);
    if (!planContext?.onboarded) {
      redirect("/onboarding");
    }
  }

  // رابط الجلسة بمستوى مختلف عن المحفوظ (مستوى قديم محفوظ أو اتغير من
  // الرئيسية) → نزامن الحساب عشان خريطة التقدّم والوحدات تكون لمستوى واحد.
  if (planContext.level && planContext.level !== level) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.rpc("save_home_preferences", {
        p_level: level,
        p_language: language,
      });
      if (error) {
        console.error("[session] save_home_preferences failed:", error.message);
      } else {
        planContext = (await getLessonPlanContext(language)) ?? planContext;
      }
    } catch (error) {
      console.error(
        "[session] save_home_preferences failed:",
        error instanceof Error ? error.message : error,
      );
    }
  }

  const persona = await resolvePersona(
    language,
    level,
    personaParam,
    planContext,
  );

  // لو الـ migration لسه ما اتطبّقتش، منكسرش الصفحة — نعرض رصيد تجربة
  // افتراضي والتوثيق بيوضّح الخطوة الناقصة.
  const account = bootstrap.account ?? EMPTY_ACCOUNT;

  const lessonPlan = buildLessonPlan(language, level, planContext);

  return (
    <SessionPanel
      persona={persona}
      initialAccount={account}
      lessonPlan={lessonPlan}
    />
  );
}

/**
 * بيجمّع الوحدة الحالية + اهتمامات المستخدم وهدفه + أهم كلمات آخر ملخص
 * عشان تتبعت للمدرّس في بداية الجلسة.
 */
function buildLessonPlan(
  language: LanguageCode,
  level: CefrLevel,
  context: LessonPlanContext | null,
): LessonPlan {
  const unitIndex = context?.unitIndex ?? 0;
  return {
    unit: getUnit(language, level, unitIndex),
    goal: context?.goal ?? null,
    interests: context?.interests ?? [],
    recapWords: context?.recapWords ?? [],
    unitIndex,
  };
}

/**
 * ترتيب الأولوية في اختيار الشخصية:
 *   1) المعرّف الجاي في الرابط (?persona=...) — لو صحيح ومضبوط على لغة الجلسة.
 *   2) الاختيار المحفوظ في حساب المستخدم — بنفس شرط اللغتين.
 *   3) الشخصية الافتراضية للغة الجلسة.
 *
 * الاختيار الصريح الصح بيتحفظ في الحساب عشان الجلسات الجاية ترجع عليه.
 */
async function resolvePersona(
  language: LanguageCode,
  level: CefrLevel,
  personaParam: string | undefined,
  planContext: LessonPlanContext,
): Promise<PersonaSpec> {
  const matches = (p: PersonaSpec | null): p is PersonaSpec =>
    p !== null && p.language === language;

  const explicit = personaParam ? getPersonaById(personaParam, level) : null;
  if (matches(explicit)) {
    if (explicit.id !== planContext.personaId) {
      try {
        const supabase = await createClient();
        const { error } = await supabase.rpc("save_persona", {
          p_persona_id: explicit.id,
        });
        if (error) {
          console.error("[session] save_persona failed:", error.message);
        }
      } catch (error) {
        console.error(
          "[session] save_persona failed:",
          error instanceof Error ? error.message : error,
        );
      }
    }
    return explicit;
  }

  const saved = planContext.personaId
    ? getPersonaById(planContext.personaId, level)
    : null;
  if (matches(saved)) {
    return saved;
  }

  return getPersona(language, level);
}
