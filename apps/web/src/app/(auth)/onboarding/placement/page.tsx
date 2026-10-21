import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import type { CefrLevel, LanguageCode } from "@kalimny/shared";

import { requireUser } from "@/lib/auth";
import { EMPTY_ACCOUNT, getLessonAccount } from "@/lib/lessons/quota";
import { createClient } from "@/lib/supabase/server";
import { PlacementClient } from "./placement-client";

export const instant = false;

function pick(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function PlacementPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const language = pick(params.lang) as LanguageCode | undefined;

  if (language !== "en" && language !== "ar") {
    redirect("/onboarding");
  }

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-muted">جارٍ التحميل...</div>}>
      <PlacementLoader language={language} />
    </Suspense>
  );
}

async function PlacementLoader({ language }: { language: LanguageCode }) {
  await connection();
  await requireUser();

  const supabase = await createClient();
  const { data: prefs } = await supabase
    .from("user_preferences")
    .select("level")
    .eq("user_id", (await requireUser()).id)
    .maybeSingle();

  let account = EMPTY_ACCOUNT;
  try {
    account = await getLessonAccount();
  } catch (e) {
    console.error(e);
  }

  return (
    <PlacementClient
      language={language}
      level={(prefs?.level as CefrLevel | undefined) ?? "A1"}
      account={account}
    />
  );
}
