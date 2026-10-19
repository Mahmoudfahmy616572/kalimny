"use client";

import { Canvas } from "@react-three/fiber";

import { Character } from "./character";
import type { AvatarProps } from "./types";

export function AvatarScene(props: AvatarProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 1.42, 5.4], fov: 32 }}
      onCreated={({ camera }) => camera.lookAt(0, 1.12, 0)}
      style={{ touchAction: "none" }}
    >
      <hemisphereLight args={["#fff6ea", "#d8bba6", 1.15]} />
      <directionalLight
        position={[2.4, 3.6, 2.8]}
        intensity={1.5}
        color="#fff2df"
      />
      <directionalLight
        position={[-2.8, 1.8, 1.2]}
        intensity={0.5}
        color="#f3b391"
      />
      <pointLight position={[0, 2.2, 2.4]} intensity={0.5} color="#ffffff" />
      <Character {...props} />
    </Canvas>
  );
}
