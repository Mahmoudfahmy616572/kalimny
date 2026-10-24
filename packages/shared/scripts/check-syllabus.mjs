import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * فحص سلامة المنهج المكتوب لكل لغة.
 *
 * بيترجم `packages/shared/src` مؤقتًا لـCommonJS ويستوردها، عشان يقدر
 * يتحقق من المحتوى الفعلي من غير ما نضيف أي dependency جديدة.
 *
 * التشغيل: npm run check:syllabus --workspace=packages/shared
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, "..");
const require = createRequire(import.meta.url);
const tsc = path.join(
  path.dirname(require.resolve("typescript/lib/typescript.js")),
  "..",
  "bin",
  "tsc",
);

const EXPECTED_UNITS = {
  A1: 12,
  A2: 12,
  B1: 12,
  B2: 12,
  C1: 6,
  C2: 6,
};

// الإنجليزي C1 = وحدات كتاب English File C1.1 (10 Files).
const EXPECTED_UNITS_BY_LANGUAGE = {
  en: { C1: 10 },
};

const LEVELS = Object.keys(EXPECTED_UNITS);
const LANGUAGES = ["en", "fr", "es", "de"];

const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

const outDir = mkdtempSync(path.join(tmpdir(), "kalimny-syllabus-"));
try {
  execFileSync(
    process.execPath,
    [
      tsc,
      "--module",
      "commonjs",
      "--moduleResolution",
      "node",
      "--target",
      "es2022",
      "--skipLibCheck",
      "--outDir",
      outDir,
      path.join(packageRoot, "src", "index.ts"),
    ],
    { stdio: "inherit" },
  );

  const shared = require(path.join(outDir, "index.js"));
  const { EN_SYLLABUS, getUnitCount, getUnit } = shared;

  for (const language of LANGUAGES) {
    for (const level of LEVELS) {
      const expected = EXPECTED_UNITS_BY_LANGUAGE[language]?.[level] ?? EXPECTED_UNITS[level];
      check(
        getUnitCount(language, level) === expected,
        `${language}/${level}: expected ${expected} units, got ${getUnitCount(language, level)}`,
      );
    }
  }

  const enA1 = EN_SYLLABUS?.A1;
  check(Array.isArray(enA1), "en/A1: syllabus is missing");

  if (Array.isArray(enA1)) {
    const ids = new Set();
    const sublevels = { "1": 0, "2": 0 };

    for (const [index, unit] of enA1.entries()) {
      const at = `en/A1 unit ${index + 1} (${unit?.id ?? "no-id"})`;

      check(nonEmptyString(unit?.id), `${at}: missing id`);
      check(!ids.has(unit?.id), `${at}: duplicate id`);
      ids.add(unit?.id);

      check(unit?.level === "A1", `${at}: level must be A1`);
      check(
        unit?.sublevel === "1" || unit?.sublevel === "2",
        `${at}: sublevel must be "1" or "2"`,
      );
      if (unit?.sublevel === "1" || unit?.sublevel === "2") {
        sublevels[unit.sublevel] += 1;
      }

      check(nonEmptyString(unit?.titleAr), `${at}: missing titleAr`);
      check(nonEmptyString(unit?.titleNatural), `${at}: missing titleNatural`);
      check(nonEmptyString(unit?.goal), `${at}: missing goal`);

      check(
        Array.isArray(unit?.coreGrammar) && unit.coreGrammar.length >= 1,
        `${at}: need at least 1 coreGrammar item`,
      );
      check(
        Array.isArray(unit?.vocabThemes) && unit.vocabThemes.length >= 1,
        `${at}: need at least 1 vocabTheme`,
      );
      check(
        Array.isArray(unit?.vocab) && unit.vocab.length >= 6,
        `${at}: need at least 6 vocab items`,
      );
      check(
        Array.isArray(unit?.phrases) && unit.phrases.length >= 3,
        `${at}: need at least 3 phrases`,
      );
      check(
        Array.isArray(unit?.mustCover) && unit.mustCover.length >= 3,
        `${at}: need at least 3 mustCover items`,
      );
      check(
        Array.isArray(unit?.canExplore) && unit.canExplore.length >= 2,
        `${at}: need at least 2 canExplore items`,
      );

      for (const item of unit?.vocab ?? []) {
        check(nonEmptyString(item?.term), `${at}: vocab term is empty`);
        check(nonEmptyString(item?.ar), `${at}: vocab translation is empty`);
      }
      for (const item of unit?.phrases ?? []) {
        check(nonEmptyString(item?.text), `${at}: phrase text is empty`);
        check(nonEmptyString(item?.ar), `${at}: phrase translation is empty`);
      }

      const merged = getUnit("en", "A1", index);
      check(
        Array.isArray(merged?.coreVocab) && merged.coreVocab.length >= 6,
        `${at}: merged coreVocab is missing`,
      );
      check(
        Array.isArray(merged?.samplePhrases) && merged.samplePhrases.length >= 3,
        `${at}: merged samplePhrases is missing`,
      );
      check(
        merged?.sublevel === unit?.sublevel,
        `${at}: merged unit lost sublevel`,
      );
    }

    check(
      sublevels["1"] === 6 && sublevels["2"] === 6,
      `en/A1: expected 6 units per sublevel, got A1.1=${sublevels["1"]} A1.2=${sublevels["2"]}`,
    );
  }

  // التأكد إن الـprompt فعلًا بيوصل للمدرّس بمدة الجلسة والمحتوى والارتجال.
  const { buildSystemInstructions, getPersona } = shared;
  const prompt = buildSystemInstructions(getPersona("en", "A1"), {
    unit: getUnit("en", "A1", 0),
    goal: null,
    interests: [],
    recapWords: [],
    unitIndex: 0,
    durationMinutes: 15,
  });
  for (const needle of [
    "Session length: 15 minutes",
    "MUST COVER",
    "improv-first",
    "Hi, I'm...",
  ]) {
    check(prompt.includes(needle), `prompt is missing: ${needle}`);
  }
} finally {
  rmSync(outDir, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`\nSyllabus check failed (${failures.length}):`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}

console.log("Syllabus check passed.");
