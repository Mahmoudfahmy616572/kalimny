export type OrbState =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "muted";

export const ORB_LABELS: Record<OrbState, string> = {
  idle: "جاهز",
  connecting: "بتتجهّز…",
  listening: "بنسمعك",
  speaking: "بتتكلم",
  muted: "الميكروفون مطفي",
};

export function Orb({ state }: { state: OrbState }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`orb orb--${state}`}
        role="img"
        aria-label={ORB_LABELS[state]}
        data-state={state}
      >
        <span className="orb__ring" />
        <span className="orb__ring orb__ring--outer" />
        <span className="orb__core" />
      </div>
      <p className="text-sm font-medium text-muted">{ORB_LABELS[state]}</p>
    </div>
  );
}
