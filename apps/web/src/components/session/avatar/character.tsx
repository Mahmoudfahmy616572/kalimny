"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { getPersonaLook, type PersonaLook } from "./persona-look";
import type { AvatarMood, AvatarProbe } from "./types";

type CharacterProps = {
  personaId: string;
  mood: AvatarMood;
  speaking: boolean;
  silent?: boolean;
  getLevel: () => number;
  onProbe?: (values: AvatarProbe) => void;
  waveKey: number;
  cheerKey: number;
};

const SMILE: Record<AvatarMood, number> = {
  neutral: 0.8,
  happy: 1.15,
  excited: 1.3,
  thinking: 0.5,
  listening: 0.9,
};

const BROW: Record<AvatarMood, number> = {
  neutral: 0,
  happy: 0.03,
  excited: 0.055,
  thinking: -0.03,
  listening: 0.015,
};

const TILT: Record<AvatarMood, number> = {
  neutral: 0,
  happy: 0.02,
  excited: 0.03,
  thinking: -0.1,
  listening: 0.07,
};

function lerp(current: number, target: number, delta: number, speed = 9) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta));
}

export function Character({
  personaId,
  mood,
  speaking,
  silent,
  getLevel,
  onProbe,
  waveKey,
  cheerKey,
}: CharacterProps) {
  const look = useMemo<PersonaLook>(() => getPersonaLook({ id: personaId }), [personaId]);
  const mouthColor = useMemo(
    () => new THREE.Color(look.lip).multiplyScalar(0.5).getStyle(),
    [look.lip],
  );

  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const browL = useRef<THREE.Mesh>(null);
  const browR = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);
  const smile = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const elbowR = useRef<THREE.Group>(null);
  const elbowL = useRef<THREE.Group>(null);

  const anim = useRef({
    mouth: 0,
    level: 0,
    lastLoud: -1,
    tracksAudio: true,
    smile: 0.8,
    brow: 0,
    tilt: 0,
    blinkAt: 0,
    nextBlink: 2.2,
    waveUntil: -1,
    cheerUntil: -1,
    wave: -1,
    cheer: -1,
  });

  useFrame((state, deltaArg) => {
    // نستخدم delta اللي R3F بيمرّره — قراءة getDelta() بنفسنا بترجّع صفر
    // لأن حلقة R3F بتستهلكها قبل الكولباك، وده بيجمّد كل الإليرب.
    const delta = Math.min(deltaArg, 0.05);
    const t = state.clock.elapsedTime;
    const a = anim.current;

    if (a.wave !== waveKey) {
      a.wave = waveKey;
      a.waveUntil = t + 2.6;
    }
    if (a.cheer !== cheerKey) {
      a.cheer = cheerKey;
      a.cheerUntil = t + 1.5;
    }

    // الحركة مش مربوطة بحالة React — مبنية على مستوى الصوت نفسه،
    // فالفم والأيدي بيتتحركوا طول ما صوت المدرّس طالع فعلاً.
    const rawLevel = Math.min(1, getLevel());
    if (rawLevel > 0.03) {
      a.lastLoud = t;
    }
    a.level = lerp(a.level, rawLevel, delta, 14);
    let level = a.level;
    const audioIsQuiet = level <= 0.03;
    if (audioIsQuiet && (speaking || silent) && t - a.lastLoud > 0.35) {
      // مفيش قراءة صوت موثوقة مع إن فيه كلام — محاكاة حركة كلام.
      level = Math.min(
        1,
        Math.max(0, 0.45 + 0.3 * Math.sin(t * 9.1) + 0.15 * Math.sin(t * 17.3) + 0.1 * Math.sin(t * 23.7)),
      );
    }
    const trackingAudio = level > 0.03 && !audioIsQuiet;
    a.tracksAudio = trackingAudio;
    const talking = level > 0.08;

    a.mouth = lerp(
      a.mouth,
      level > 0.02 ? 0.16 + level * 0.95 : 0,
      delta,
      16,
    );
    a.smile = lerp(a.smile, SMILE[mood], delta, 6);
    a.brow = lerp(a.brow, BROW[mood], delta, 6);
    a.tilt = lerp(a.tilt, TILT[mood], delta, 5);

    if (t > a.nextBlink) {
      a.blinkAt = t;
      a.nextBlink = t + 2.4 + Math.random() * 3.2;
    }
    const blinkProgress = (t - a.blinkAt) / 0.16;
    const blink =
      blinkProgress >= 0 && blinkProgress <= 1
        ? Math.sin(blinkProgress * Math.PI)
        : 0;

    if (eyes.current) {
      eyes.current.scale.y = 1 - blink * 0.9;
    }
    if (mouth.current) {
      mouth.current.scale.y = 0.05 + a.mouth * 2.35;
    }
    if (smile.current) {
      smile.current.scale.set(0.85 + a.smile * 0.15, a.smile, 1);
    }
    if (browL.current) {
      browL.current.position.y = 0.245 + a.brow;
      browL.current.rotation.z = 0.12 - a.brow * 3;
    }
    if (browR.current) {
      browR.current.position.y = 0.245 + a.brow;
      browR.current.rotation.z = -0.12 + a.brow * 3;
    }
    if (head.current) {
      head.current.rotation.z = a.tilt;
      head.current.rotation.x =
        Math.sin(t * 0.9) * 0.015 +
        (talking
          ? Math.sin(t * 6.5) * 0.05 * (0.3 + a.mouth) +
            Math.sin(t * 2.2) * 0.03
          : 0);
      head.current.rotation.y = talking
        ? Math.sin(t * 1.6) * 0.08
        : Math.sin(t * 0.5) * 0.05;
    }
    if (root.current) {
      root.current.position.y =
        Math.sin(t * 1.5) * 0.015 +
        (t < a.cheerUntil ? Math.abs(Math.sin(t * 9)) * 0.07 : 0);
      root.current.rotation.y = Math.sin(t * 0.35) * 0.03;
      root.current.rotation.z = talking ? Math.sin(t * 1.1) * 0.03 : 0;
    }
    if (body.current) {
      body.current.scale.y = 1 + Math.sin(t * 1.5) * 0.012;
    }

    const waving = t < a.waveUntil;
    const cheering = t < a.cheerUntil;
    const talkingGestures = talking && !waving && !cheering;
    const sway = Math.sin(t * 1.2) * 0.03;
    // إيماءات واضحة وقت الكلام — الدراعات بتتحرك مع إيقاع حركة الفم.
    const talkWave = talkingGestures ? Math.sin(t * 2.4) * 0.38 : 0;
    const talkWave2 = talkingGestures ? Math.sin(t * 2.4 + 1.1) * 0.28 : 0;

    let armRTarget = 0.24 + sway + talkWave;
    let armLTarget = -0.24 - sway - talkWave2;
    let elbowRTarget = 0.14 + (talkingGestures ? Math.sin(t * 3.1) * 0.3 : 0);
    let elbowLTarget = -0.14 - (talkingGestures ? Math.sin(t * 3.1 + 0.7) * 0.22 : 0);

    if (mood === "thinking") {
      // وضع التفكير مش ثابت — حركة خفيفة عشان الأفاتار يبان حي.
      armRTarget = -0.55 + Math.sin(t * 1.3) * 0.07;
      elbowRTarget = 2.35 + Math.sin(t * 1.7) * 0.1;
    }
    if (cheering) {
      armRTarget = 2.4;
      armLTarget = -2.4;
      elbowRTarget = 0.1;
      elbowLTarget = -0.1;
    }
    if (waving) {
      armRTarget = 2.3;
      elbowRTarget = 0.25 + Math.sin(t * 10) * 0.5;
    }

    const armSpeed = waving || cheering ? 12 : 7;
    if (armR.current) {
      armR.current.rotation.z = lerp(
        armR.current.rotation.z,
        armRTarget,
        delta,
        armSpeed,
      );
    }
    if (armL.current) {
      armL.current.rotation.z = lerp(
        armL.current.rotation.z,
        armLTarget,
        delta,
        armSpeed,
      );
    }
    if (elbowR.current) {
      elbowR.current.rotation.z = lerp(
        elbowR.current.rotation.z,
        elbowRTarget,
        delta,
        armSpeed,
      );
    }
    if (elbowL.current) {
      elbowL.current.rotation.z = lerp(
        elbowL.current.rotation.z,
        elbowLTarget,
        delta,
        armSpeed,
      );
    }

    if (onProbe) {
      onProbe({
        raw: rawLevel,
        level,
        mouth: a.mouth,
        arm: armR.current?.rotation.z ?? 0,
      });
    }
  });

  return (
    <group ref={root}>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.95, 48]} />
        <meshBasicMaterial color="#3a2a20" transparent opacity={0.09} />
      </mesh>

      <group ref={body}>
        <mesh position={[0, 0.62, 0]}>
          <capsuleGeometry args={[0.34, 0.46, 8, 20]} />
          <meshStandardMaterial color={look.shirt} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.97, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.17, 0.035, 10, 28]} />
          <meshStandardMaterial color={look.shirtAccent} roughness={0.6} />
        </mesh>
        <mesh position={[0.36, 0.9, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color={look.shirt} roughness={0.7} />
        </mesh>
        <mesh position={[-0.36, 0.9, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color={look.shirt} roughness={0.7} />
        </mesh>
      </group>

      <mesh position={[0, 1.06, 0]}>
        <cylinderGeometry args={[0.11, 0.12, 0.18, 20]} />
        <meshStandardMaterial color={look.skin} roughness={0.75} />
      </mesh>

      <group ref={armR} position={[0.44, 0.92, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <capsuleGeometry args={[0.095, 0.26, 6, 14]} />
          <meshStandardMaterial color={look.shirt} roughness={0.7} />
        </mesh>
        <group ref={elbowR} position={[0, -0.32, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.085, 0.24, 6, 14]} />
            <meshStandardMaterial color={look.skin} roughness={0.75} />
          </mesh>
          <mesh position={[0, -0.31, 0]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color={look.skin} roughness={0.75} />
          </mesh>
        </group>
      </group>

      <group ref={armL} position={[-0.44, 0.92, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <capsuleGeometry args={[0.095, 0.26, 6, 14]} />
          <meshStandardMaterial color={look.shirt} roughness={0.7} />
        </mesh>
        <group ref={elbowL} position={[0, -0.32, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.085, 0.24, 6, 14]} />
            <meshStandardMaterial color={look.skin} roughness={0.75} />
          </mesh>
          <mesh position={[0, -0.31, 0]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color={look.skin} roughness={0.75} />
          </mesh>
        </group>
      </group>

      <group ref={head} position={[0, 1.48, 0]}>
        <mesh scale={[1, 1.06, 0.95]}>
          <sphereGeometry args={[0.52, 40, 32]} />
          <meshStandardMaterial color={look.skin} roughness={0.72} />
        </mesh>

        <mesh position={[0.51, 0, 0]} scale={[0.45, 0.8, 0.55]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color={look.skin} roughness={0.72} />
        </mesh>
        <mesh position={[-0.51, 0, 0]} scale={[0.45, 0.8, 0.55]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color={look.skin} roughness={0.72} />
        </mesh>

        <Hair style={look.hairStyle} color={look.hair} />

        <group ref={eyes} position={[0, 0.07, 0]}>
          <Eye x={0.2} eyeColor={look.eye} />
          <Eye x={-0.2} eyeColor={look.eye} />
        </group>

        <mesh ref={browL} position={[0.2, 0.245, 0.44]} rotation={[0, 0, 0.12]}>
          <boxGeometry args={[0.19, 0.035, 0.04]} />
          <meshStandardMaterial color={look.brow} roughness={0.8} />
        </mesh>
        <mesh ref={browR} position={[-0.2, 0.245, 0.44]} rotation={[0, 0, -0.12]}>
          <boxGeometry args={[0.19, 0.035, 0.04]} />
          <meshStandardMaterial color={look.brow} roughness={0.8} />
        </mesh>

        <mesh position={[0, -0.08, 0.5]} scale={[1, 0.85, 0.8]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={look.skin} roughness={0.72} />
        </mesh>

        <group position={[0, -0.2, 0.44]}>
          <mesh ref={smile} position={[0, -0.015, 0.015]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.115, 0.017, 8, 24, Math.PI]} />
            <meshStandardMaterial color={look.lip} roughness={0.6} />
          </mesh>
          <mesh ref={mouth} position={[0, -0.01, 0.02]} scale={[1, 0.55, 0.5]}>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color={mouthColor} roughness={0.55} />
          </mesh>
        </group>

        {look.glasses ? <Glasses /> : null}
        {look.earrings ? <Earrings /> : null}
      </group>
    </group>
  );
}

function Eye({ x, eyeColor }: { x: number; eyeColor: string }) {
  return (
    <group position={[x, 0, 0.43]}>
      <mesh scale={[1, 1, 0.55]}>
        <sphereGeometry args={[0.115, 24, 24]} />
        <meshStandardMaterial color="#fdfdfb" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.06]} scale={[1, 1, 0.5]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color={eyeColor} roughness={0.35} />
      </mesh>
      <mesh position={[0.018, 0.02, 0.088]} scale={[1, 1, 0.4]}>
        <sphereGeometry args={[0.017, 12, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function Hair({ style, color }: { style: PersonaLook["hairStyle"]; color: string }) {
  return (
    <group>
      <mesh position={[0, 0.07, -0.02]} scale={[1.04, 0.98, 1.04]}>
        <sphereGeometry args={[0.53, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>

      <mesh position={[0, 0, 0]} scale={[1.02, 1.04, 1.02]}>
        <sphereGeometry
          args={[0.52, 32, 24, Math.PI * 1.02, Math.PI * 0.96, 0, Math.PI * 0.85]}
        />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>

      {style === "bun" ? (
        <mesh position={[0, 0.42, -0.2]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color={color} roughness={0.78} />
        </mesh>
      ) : null}

      {style === "ponytail" ? (
        <mesh position={[0, 0.02, -0.5]} rotation={[0.45, 0, 0]}>
          <capsuleGeometry args={[0.09, 0.5, 6, 14]} />
          <meshStandardMaterial color={color} roughness={0.78} />
        </mesh>
      ) : null}

      {style === "long" ? (
        <>
          <mesh position={[0.37, -0.16, -0.14]} rotation={[0, 0, 0.06]}>
            <capsuleGeometry args={[0.13, 0.66, 6, 14]} />
            <meshStandardMaterial color={color} roughness={0.78} />
          </mesh>
          <mesh position={[-0.37, -0.16, -0.14]} rotation={[0, 0, -0.06]}>
            <capsuleGeometry args={[0.13, 0.66, 6, 14]} />
            <meshStandardMaterial color={color} roughness={0.78} />
          </mesh>
        </>
      ) : null}

      {style === "curly" ? (
        <>
          {[
            [0.34, 0.22, -0.06],
            [-0.34, 0.22, -0.06],
            [0.38, -0.02, -0.16],
            [-0.38, -0.02, -0.16],
            [0.22, 0.34, -0.2],
            [-0.22, 0.34, -0.2],
            [0, 0.42, -0.05],
            [0, 0.05, -0.45],
          ].map(([x, y, z], index) => (
            <mesh key={index} position={[x, y, z]}>
              <sphereGeometry args={[0.17, 20, 20]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
          ))}
        </>
      ) : null}

    </group>
  );
}

function Glasses() {
  return (
    <group position={[0, 0.07, 0.1]}>
      {[0.2, -0.2].map((x) => (
        <mesh key={x} position={[x, 0, 0.42]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.145, 0.014, 8, 28]} />
          <meshStandardMaterial color="#3c3a38" roughness={0.4} metalness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.42]}>
        <boxGeometry args={[0.12, 0.018, 0.018]} />
        <meshStandardMaterial color="#3c3a38" roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  );
}

function Earrings() {
  return (
    <group>
      <mesh position={[0.5, -0.22, 0.05]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#d8b25e" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.5, -0.22, 0.05]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#d8b25e" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
