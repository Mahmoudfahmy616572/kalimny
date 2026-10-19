import type { PersonaSpec } from "@kalimny/shared";
export type HairStyle =
  | "short"
  | "long"
  | "bun"
  | "curly"
  | "buzz"
  | "ponytail";

/** الهوية البصرية لكل شخصية — ألوان وملامح تفضل ثابتة في كل الجلسات. */
export type PersonaLook = {
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  shirt: string;
  shirtAccent: string;
  eye: string;
  lip: string;
  brow: string;
  glasses: boolean;
  earrings: boolean;
};

const FALLBACK: PersonaLook = {
  skin: "#e6b28c",
  hair: "#33241c",
  hairStyle: "short",
  shirt: "#4a7c74",
  shirtAccent: "#e8f2ee",
  eye: "#4a3226",
  lip: "#a2564f",
  brow: "#2a1e17",
  glasses: false,
  earrings: false,
};

export const PERSONA_LOOKS: Record<string, PersonaLook> = {
  "en-layla": {
    skin: "#e8b48f",
    hair: "#3b2a20",
    hairStyle: "long",
    shirt: "#c96f4a",
    shirtAccent: "#f6e3d3",
    eye: "#5a3a26",
    lip: "#a8534f",
    brow: "#2e211a",
    glasses: false,
    earrings: true,
  },
  "en-karim": {
    skin: "#d9a273",
    hair: "#221b16",
    hairStyle: "short",
    shirt: "#4a7c74",
    shirtAccent: "#dff0ea",
    eye: "#3f2a1e",
    lip: "#8a4a42",
    brow: "#1b1511",
    glasses: false,
    earrings: false,
  },
  "fr-camille": {
    skin: "#f0c9a8",
    hair: "#6b4a35",
    hairStyle: "short",
    shirt: "#7a6aa8",
    shirtAccent: "#eae5f6",
    eye: "#5a4030",
    lip: "#a85a5a",
    brow: "#54392a",
    glasses: true,
    earrings: false,
  },
  "fr-nadine": {
    skin: "#e9bb9a",
    hair: "#2b2b33",
    hairStyle: "bun",
    shirt: "#8a9a68",
    shirtAccent: "#eef3e2",
    eye: "#3c2f2a",
    lip: "#b05a60",
    brow: "#241f22",
    glasses: false,
    earrings: true,
  },
  "es-sofia": {
    skin: "#d8a07a",
    hair: "#4a2418",
    hairStyle: "curly",
    shirt: "#d94f70",
    shirtAccent: "#fbe1e8",
    eye: "#4a2c1c",
    lip: "#a8434f",
    brow: "#33180f",
    glasses: false,
    earrings: true,
  },
  "es-diego": {
    skin: "#c98f63",
    hair: "#171310",
    hairStyle: "buzz",
    shirt: "#e0a63c",
    shirtAccent: "#fbf0d8",
    eye: "#2f1f16",
    lip: "#8f463f",
    brow: "#14100d",
    glasses: false,
    earrings: false,
  },
  "de-jonas": {
    skin: "#f0c6a4",
    hair: "#b98a4f",
    hairStyle: "short",
    shirt: "#4a6b8a",
    shirtAccent: "#e2edf5",
    eye: "#44607a",
    lip: "#a45a52",
    brow: "#8a6437",
    glasses: true,
    earrings: false,
  },
  "de-lina": {
    skin: "#e7b491",
    hair: "#d9b26a",
    hairStyle: "ponytail",
    shirt: "#a34a56",
    shirtAccent: "#f7e0e4",
    eye: "#4d3a22",
    lip: "#ae5550",
    brow: "#b3914f",
    glasses: false,
    earrings: true,
  },
};

export function getPersonaLook(persona: Pick<PersonaSpec, "id">): PersonaLook {
  return PERSONA_LOOKS[persona.id] ?? FALLBACK;
}
