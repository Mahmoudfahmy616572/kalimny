import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { requireUser } from "@/lib/auth";
import { getUserPreferences } from "@/lib/preferences";

import { OnboardingForm } from "./onboarding-form";

export const instant = false;

export default function OnboardingPage() {
  return (
    <main className="flex-1">
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center text-muted">
            جارٍ التحميل…
          </div>
        }
      >
        <OnboardingLoader />
      </Suspense>
    </main>
  );
}

async function OnboardingLoader() {
  await connection();
  await requireUser();

  // لو خلص الـ onboarding قبل كده، نرجّعه للرئيسية.
  const prefs = await getUserPreferences();
  if (prefs) {
    redirect("/");
  }

  return <OnboardingForm />;
}
