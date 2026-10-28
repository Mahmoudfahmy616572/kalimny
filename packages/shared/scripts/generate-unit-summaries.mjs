// يولّد ملفات unit-summaries/{en,fr,es,de}.ts من بيانات الـ syllabus.
//
// كل محتوى أجنبي في المهارات مأخوذ مباشرة من جمل/مفردات الـ syllabus
// (صحيحة لغوياً أصلاً)، والـ overview بالعربي بيتجمّع من عنوان الوحدة
// وقواعدها ومحاورها. النتيجة بيانات ثابتة — من غير أي توليد وقت الجلسة.
//
// تشغيل: node --experimental-strip-types scripts/generate-unit-summaries.mjs

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { EN_SYLLABUS } from "../src/syllabus/en.ts";
import { FR_SYLLABUS } from "../src/syllabus/fr.ts";
import { ES_SYLLABUS } from "../src/syllabus/es.ts";
import { DE_SYLLABUS } from "../src/syllabus/de.ts";

const SYLLABI = {
  en: EN_SYLLABUS,
  fr: FR_SYLLABUS,
  es: ES_SYLLABUS,
  de: DE_SYLLABUS,
};

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function buildOverview(u) {
  const grammar = (u.coreGrammar || []).join("؛ ");
  const themes = (u.vocabThemes || []).join("، ");
  const p0 = u.phrases?.[0];
  const p1 = u.phrases?.[1];
  const firstPhrase = p0 ? `«${p0.text}»` : "";
  const secondPhrase = p1 ? ` و«${p1.text}»` : "";
  return (
    `في وحدة «${u.titleAr}» (${u.titleNatural ?? ""})، الهدف إنك ${u.goal ?? ""} ` +
    `غطّينا القواعد الأساسية: ${grammar}. ` +
    `وركّزنا على المفردات في محاور: ${themes}. ` +
    `ومن الجمل اللي اتدربنا عليها ${firstPhrase}${secondPhrase}. ` +
    `ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.`
  );
}

function buildSkills(u) {
  const phrases = u.phrases || [];
  const vocab = u.vocab || [];
  const p0 = phrases[0];
  const p1 = phrases[1] ?? phrases[0];
  const p2 = phrases[2] ?? phrases[0];
  const v0 = vocab[0];
  const theme = (u.vocabThemes || [])[0] ?? "الموضوع";

  const readingText = [p0, p1].filter(Boolean).map((p) => p.text).join(" ");
  const readingAnswer = [p0, p1].filter(Boolean).map((p) => p.ar).join(" / ");

  return {
    reading: {
      instruction: "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
      prompt: readingText,
      modelAnswer: readingAnswer,
    },
    writing: {
      instruction: `اكتب ٣ جمل قصيرة عن «${theme}»، زي المثال واستخدم نفس القواعد.`,
      prompt: p0 ? p0.text : "",
      modelAnswer: p0 ? p0.ar : "",
    },
    listening: {
      instruction: "اسمع الكلمة وقل معناها بالعربي:",
      prompt: v0 ? v0.term : "",
      modelAnswer: v0 ? v0.ar : "",
    },
    speaking: {
      instruction: "قول بالصوت:",
      prompt: p2 ? p2.text : "",
      modelAnswer: p2 ? p2.ar : "",
    },
  };
}

function buildMap(language) {
  const levels = SYLLABI[language] || {};
  const map = {};
  for (const level of LEVELS) {
    const units = levels[level] || [];
    for (const u of units) {
      if (!u || !u.id) continue;
      map[u.id] = {
        unitId: u.id,
        overview: buildOverview(u),
        skills: buildSkills(u),
      };
    }
  }
  return map;
}

function serialize(map) {
  return JSON.stringify(map, null, 2);
}

const HEADER = `// مولّد تلقائياً من الـ syllabus (scripts/generate-unit-summaries.mjs).
// المحتوى الأجنبي كله مأخوذ من جمل/مفردات الـ syllabus الصحيحة؛
// والـ overview بالعربي مبني من عنوان وقواعد ومحاور الوحدة. بيانات ثابتة.
import type { UnitHandAuthored } from "../unit-summary/types";

`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "src", "unit-summaries");

const FILES = {
  en: "UNIT_SUMMARY_EN",
  fr: "UNIT_SUMMARY_FR",
  es: "UNIT_SUMMARY_ES",
  de: "UNIT_SUMMARY_DE",
};

for (const [language, varName] of Object.entries(FILES)) {
  const map = buildMap(language);
  const content = `${HEADER}export const ${varName}: Record<string, UnitHandAuthored> = ${serialize(map)};
`;
  const outPath = resolve(OUT_DIR, `${language}.ts`);
  writeFileSync(outPath, content, "utf8");
  console.log(`${language}: ${Object.keys(map).length} وحدة ← ${outPath}`);
}
