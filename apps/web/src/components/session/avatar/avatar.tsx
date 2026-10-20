"use client";

import dynamic from "next/dynamic";

import { Orb, ORB_LABELS, type OrbState } from "../orb";
import type { AvatarProps } from "./types";

export type { AvatarMood } from "./types";

const AvatarScene = dynamic(
  () => import("./avatar-scene").then((mod) => mod.AvatarScene),
  {
    ssr: false,
    loading: () => <AvatarSkeleton />,
  },
);

export function Avatar(props: AvatarProps) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-3"
      role="img"
      aria-label={ORB_LABELS[props.state]}
      data-state={props.state}
    >
      <div className="relative h-full max-h-[240px] min-h-[120px] w-full max-w-[240px] flex-1 lg:max-h-[340px] lg:max-w-[340px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(201,111,74,0.18),transparent_66%)]" />
        <AvatarScene {...props} />
      </div>
      <p className="hidden text-sm font-medium text-muted lg:block">
        {ORB_LABELS[props.state]}
      </p>
    </div>
  );
}

function AvatarSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Orb state="connecting" />
    </div>
  );
}

export type { AvatarProps, OrbState };
