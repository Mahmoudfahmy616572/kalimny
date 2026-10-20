import { getUnit, getUnitCount } from "@kalimny/shared";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { StartPanel } from "@/components/start-panel";
import { getCurrentUser } from "@/lib/auth";
import { getLessonPlanContext, getUserPreferences } from "@/lib/preferences";
import { StreakAlert } from "@/app/(app)/streak-alert";

/**
 * الصفحة الرئيسية بتقرأ الجلسة والتفضيلات في كل طلب —
 * عشان تعرف تحوّل المستخدم الجديد لـ onboarding وتقدّم المستخدم
 * المسجّل بمستواه ولغته المحفوظين.
 */
export const instant = false;

export default async function Home() {
  return (
    <main className="flex-1">
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-muted">
            جارٍ التحميل…
          </div>
        }
      >
        <HomeLoader />
      </Suspense>
    </main>
  );
}

async function HomeLoader() {
  await connection();
  const user = await getCurrentUser();

  if (!user) {
    // زائر عادي — الصفحة التسويقية مع StartPanel.
    return <StartPanel />;
  }

  // مستخدم مسجّل — نجيب تفضيلاته.
  const prefs = await getUserPreferences();

  if (!prefs) {
    // لسه ما عملش onboarding → نحوّله.
    redirect("/onboarding");
  }

  // مسجّل وخلّص onboarding → نعرض StartPanel بمستواه ولغته المحفوظين
  // كاختيار افتراضي، مع خريطة تقدّمه في المسار الحالي.
  const planContext = await getLessonPlanContext(prefs.language);
  const unitIndex = planContext?.unitIndex ?? 0;

  return (
    <>
      <Suspense fallback={null}>
        <StreakAlert />
      </Suspense>
      <StartPanel
        defaultLanguage={prefs.language}
        defaultLevel={prefs.level}
        defaultPersonaId={prefs.personaId}
        progress={{
          level: prefs.level,
          unitIndex,
          unitCount: getUnitCount(prefs.level),
          titleAr: getUnit(prefs.level, unitIndex).titleAr,
        }}
      />
    </>
  );
}
