import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { LANGUAGES, type CefrLevel, type LanguageCode } from "@kalimny/shared";

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
  const raw = pick(params.lang);
  const language = LANGUAGES.find((l) => l.code === raw)?.code;

  if (!language) {
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
  const user = await requireUser();

  const supabase = await createClient();
  const { data: prefs } = await supabase
    .from("user_preferences")
    .select("level")
    .eq("user_id", user.id)
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
