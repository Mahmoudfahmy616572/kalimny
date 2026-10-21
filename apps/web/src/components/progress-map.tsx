import type { CefrLevel } from "@kalimny/shared";
import { Fragment } from "react";

type ProgressMapProps = {
  level: CefrLevel;
  /** رقم الوحدة الحالية (0-based) */
  unitIndex: number;
  /** إجمالي وحدات المستوى */
  unitCount: number;
  /** عنوان الوحدة الحالية من المنهج */
  titleAr?: string;
  /** نسخة مضغوطة لرأس الجلسة */
  compact?: boolean;
};

/**
 * خريطة تقدّم بسيطة: خط أفقي بنقاط لكل وحدة في المستوى.
 * المنجزة أخضر، الحالية بلون تراكوتا متوهّج، والجاية باهتة.
 * الاتجاه RTL — الوحدة الأولى على اليمين والمستوى بيتقدّم ناحية الشمال.
 */
export function ProgressMap({
  level,
  unitIndex,
  unitCount,
  titleAr,
  compact = false,
}: ProgressMapProps) {
  const total = Math.max(1, unitCount);
  const current = Math.max(0, Math.min(unitIndex, total));
  const finished = current >= total;

  const dot = compact ? "h-2 w-2" : "h-2.5 w-2.5";
  const currentDot = compact ? "h-3 w-3" : "h-3.5 w-3.5";

  const progressLabel = finished
    ? `خلصت مستوى ${level} كله`
    : `وحدة ${current + 1} من ${total}`;

  return (
    <div
      className={`flex flex-col gap-3 rounded-organic border border-border bg-card ${
        compact ? "px-4 py-3" : "px-5 py-4"
      }`}
    >
      <div className="flex w-full items-baseline justify-between gap-3">
        <span className="text-xs font-semibold text-muted">مستوى {level}</span>
        <span className="text-xs font-semibold">
          {finished ? `${progressLabel} 🎉` : progressLabel}
        </span>
      </div>

      <div
        role="img"
        aria-label={`تقدّمك: ${progressLabel}`}
        className="flex w-full min-w-0 items-center gap-1 sm:gap-1.5"
      >
        {Array.from({ length: total }, (_, index) => {
          const isDone = index < current;
          const isCurrent = index === current && !finished;
          return (
            <Fragment key={index}>
              {index > 0 ? (
                <span
                  aria-hidden
                  className={`h-0.5 min-w-0 flex-1 rounded-full ${
                    index <= current ? "bg-sage" : "bg-border"
                  }`}
                />
              ) : null}
              <span
                aria-hidden
                className={`shrink-0 rounded-full ${
                  isCurrent
                    ? `${currentDot} bg-terracotta ring-4 ring-terracotta-soft`
                    : isDone
                      ? `${dot} bg-sage`
                      : `${dot} border border-border bg-card`
                }`}
              />
            </Fragment>
          );
        })}
      </div>

      {titleAr ? (
        <p
          className={`text-center font-semibold ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {finished ? "كمّل المستوى اللي بعده 💪" : titleAr}
        </p>
      ) : null}
    </div>
  );
}
