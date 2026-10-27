import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * فحص سلامة بنوك الاختبارات الثابتة (src/exam-content).
 *
 * بيتأكد إن كل وحدة: التوزيع صح، الخيارات سليمة، الإجابة موجودة في الخيارات،
 * وكل نقطة في الوحدة (mustCover / coreGrammar / العبارات) ليها سؤال يختبرها،
 * وإن `covers` بتشاور على نصوص موجودة فعلاً في الوحدة (مفيش أخطاء كتابة).
 *
 * التشغيل: npm run check:exam-content --workspace=packages/shared
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

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
const wordCount = (s) => String(s ?? "").trim().split(/\s+/).filter(Boolean).length;

const outDir = mkdtempSync(path.join(tmpdir(), "kalimny-exam-content-"));
try {
  execFileSync(
    process.execPath,
    [
      tsc,
      "--module", "commonjs",
      "--moduleResolution", "node",
      "--target", "es2022",
      "--skipLibCheck",
      "--outDir", outDir,
      path.join(packageRoot, "src", "index.ts"),
    ],
    { stdio: "inherit" },
  );

  const { EXAM_BANK_TARGET, EXAM_DISTRIBUTION } = require(path.join(outDir, "index.js"));

  const LANGS = ["en", "fr", "es", "de"];
  const SYLLABUS_EXPORT = { en: "EN_SYLLABUS", fr: "FR_SYLLABUS", es: "ES_SYLLABUS", de: "DE_SYLLABUS" };
  const CONTENT_EXPORT = { en: "EXAM_CONTENT_EN", fr: "EXAM_CONTENT_FR", es: "EXAM_CONTENT_ES", de: "EXAM_CONTENT_DE" };

  for (const lang of LANGS) {
    const syllabusMod = require(path.join(outDir, "syllabus", lang + ".js"));
    const contentMod = require(path.join(outDir, "exam-content", lang + ".js"));
    const syllabusByLevel = syllabusMod[SYLLABUS_EXPORT[lang]];
    const contentByUnit = contentMod[CONTENT_EXPORT[lang]];
    if (!syllabusByLevel) {
      console.error(`(skipping ${lang}: no syllabus export)`);
      continue;
    }

    const unitsById = new Map();
    for (const units of Object.values(syllabusByLevel)) {
      for (const unit of units) unitsById.set(unit.id, unit);
    }

    for (const [unitId, items] of Object.entries(contentByUnit || {})) {
      const unit = unitsById.get(unitId);
      const at = `${lang}/${unitId}`;
      check(Boolean(unit), `${at}: unit id not found in the syllabus`);
      if (!unit) continue;

      const phrases = (unit.phrases || []).map((p) => p.text);
      const required = [...(unit.mustCover || []), ...(unit.coreGrammar || []), ...phrases];
      const allowed = new Set(required.map(norm));

      for (const kind of Object.keys(EXAM_BANK_TARGET)) {
        const n = items.filter((q) => q.kind === kind).length;
        check(
          n === EXAM_BANK_TARGET[kind],
          `${at}: ${kind} expected ${EXAM_BANK_TARGET[kind]} questions, got ${n}`,
        );
      }
      check(items.length === Object.values(EXAM_BANK_TARGET).reduce((a, b) => a + b, 0), `${at}: wrong total`);
      for (const d of [1, 2, 3]) {
        check(items.some((q) => q.difficulty === d), `${at}: no question at difficulty ${d}`);
      }

      const ids = new Set();
      const prompts = new Set();
      const answers = new Map();
      const covered = new Set();

      for (const q of items) {
        const tag = `${at} ${q.id}`;
        check(!ids.has(q.id), `${tag}: duplicate id`);
        ids.add(q.id);
        check(!prompts.has(norm(q.prompt)), `${tag}: duplicate prompt`);
        prompts.add(norm(q.prompt));
        check(q.prompt && String(q.prompt).trim().length > 0, `${tag}: empty prompt`);
        check(q.answer && String(q.answer).trim().length > 0, `${tag}: empty answer`);

        if (q.kind === "speaking") {
          check(!q.options, `${tag}: speaking must not have options`);
          const w = wordCount(q.answer);
          check(w >= 4 && w <= 14, `${tag}: speaking answer must be 4 to 14 words (got ${w})`);
        } else {
          check(Array.isArray(q.options) && q.options.length === 4, `${tag}: must have exactly 4 options`);
          if (Array.isArray(q.options)) {
            const opts = q.options.map(norm);
            check(new Set(opts).size === 4, `${tag}: options must be distinct`);
            check(opts.includes(norm(q.answer)), `${tag}: answer must be one of the options exactly`);
          }
        }

        if (q.kind === "listening") {
          const w = wordCount(q.text);
          check(w >= 4 && w <= 12, `${tag}: listening text must be 4 to 12 words (got ${w})`);
        }

        const a = norm(q.answer);
        if (!answers.has(q.kind)) answers.set(q.kind, new Set());
        check(!answers.get(q.kind).has(a), `${tag}: duplicate answer "${q.answer}"`);
        answers.get(q.kind).add(a);

        for (const c of q.covers ?? []) {
          check(allowed.has(norm(c)), `${tag}: covers "${c}" is not an exact unit item`);
          covered.add(norm(c));
        }
      }

      for (const text of required) {
        check(covered.has(norm(text)), `${at}: not covered by any question: "${text}"`);
      }
    }
  }

  check(
    Object.keys(EXAM_DISTRIBUTION).length === 4,
    "EXAM_DISTRIBUTION must define the four kinds",
  );
} finally {
  rmSync(outDir, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`\nExam content check failed (${failures.length}):`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}

console.log("Exam content check passed.");
