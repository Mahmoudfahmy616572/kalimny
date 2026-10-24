import { redirect } from "next/navigation";

import { ExamPanel } from "@/components/exam/exam-panel";
import { requireUser } from "@/lib/auth";

export const instant = false;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pick(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ExamPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const sessionId = pick(params.session);

  await requireUser();

  if (!sessionId || !UUID.test(sessionId)) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-4 py-8">
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold">اختبار الوحدة</h1>
        <p className="mt-1 text-xs text-muted">
          عشرة أسئلة على اللي اتكلمتوا فيه في الجلسة. عدّي ٧٠٪ عشان تفتح اللي
          بعدها.
        </p>
      </div>
      <ExamPanel sessionId={sessionId} />
    </main>
  );
}
