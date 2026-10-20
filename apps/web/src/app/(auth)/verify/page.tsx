import { redirect } from "next/navigation";
import { Suspense } from "react";

import { VerifyForm } from "./verify-form";

export const instant = false;

export default function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-muted">
          جارٍ التحميل…
        </div>
      }
    >
      <VerifyLoader searchParams={searchParams} />
    </Suspense>
  );
}

async function VerifyLoader({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params.email?.trim().toLowerCase();

  if (!email) {
    redirect("/signup");
  }

  return <VerifyForm email={email} />;
}
