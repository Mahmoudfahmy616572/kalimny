import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * بيولّد بنك أسئلة الاختبار لكل وحدة من سياق الوحدة ومفرداتها بس.
 *
 * الاستخدام (من packages/shared):
 *   node scripts/generate-exam-banks.mjs --dry-run --lang en --level A2 --unit 0
 *   node scripts/generate-exam-banks.mjs --lang en --level A2
 *   node scripts/generate-exam-banks.mjs --all
 *
 * الخيارات:
 *   --dry-run   يطبع البرومبت بتاع أول وحدة من غير ما يكلّم الموديل
 *   --lang      en | fr | es | de
 *   --level     A1 | A2 | B1 | B2 | C1 | C2
 *   --unit      رقم الوحدة (يبدأ من 0)، بيشتغل مع --lang و --level
 *   --all       كل اللغات والمستويات
 *   --force     يعيد توليد الوحدات اللي اتولّدت قبل كده
 *
 * المفتاح بيتقري من apps/web/.env.local (GEMINI_API_KEY) ومابيتطبعش أبداً.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, "..");
const repoRoot = path.resolve(packageRoot, "..", "..");
const require = createRequire(import.meta.url);
const tsc = path.join(
  path.dirname(require.resolve("typescript/lib/typescript.js")),
  "..",
  "bin",
  "tsc",
);

const OUT_DIR = path.join(packageRoot, "src", "exam-banks");
const MODEL = process.env.EXAM_MODEL || "gemini-3.8-flash";
const MAX_ATTEMPTS = 3;

const COUNTS = { vocab: 14, grammar: 10, speaking: 8, listening: 3 };
const PREFIX = { vocab: "v", grammar: "g", speaking: "s", listening: "l" };
const LANGUAGE_NAMES = { en: "English", fr: "French", es: "Spanish", de: "German" };
const ALL_LANGUAGES = ["en", "fr", "es", "de"];
const ALL_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function parseArgs(argv) {
  const args = { dryRun: false, all: false, force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--all") args.all = true;
    else if (a === "--force") args.force = true;
    else if (a === "--lang") args.lang = argv[++i];
    else if (a === "--level") args.level = argv[++i];
    else if (a === "--unit") args.unit = Number(argv[++i]);
  }
  return args;
}

function loadApiKey() {
  const envPath = path.join(repoRoot, "apps", "web", ".env.local");
  if (!existsSync(envPath)) return null;
  const line = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("GEMINI_API_KEY="));
  if (!line) return null;
  return line.slice("GEMINI_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
}

function loadShared() {
  const outDir = mkdtempSync(path.join(tmpdir(), "kalimny-exams-"));
  execFileSync(
    process.execPath,
    [
      tsc,
      "--module", "commonjs",
      "--moduleResolution", "node",
      "--target", "es2022",
      "--skipLibCheck",
      "--outDir", outDir,
      path.join(packageRoot, "src", "syllabus", "index.ts"),
    ],
    { stdio: "inherit" },
  );
  return { shared: require(path.join(outDir, "syllabus", "index.js")), outDir };
}

function unitContext(unit) {
  return {
    id: unit.id,
    level: unit.level,
    sublevel: unit.sublevel,
    titleNatural: unit.titleNatural,
    goal: unit.goal,
    coreGrammar: unit.coreGrammar,
    vocab: unit.vocab,
    phrases: unit.phrases,
    mustCover: unit.mustCover,
    canExplore: unit.canExplore,
  };
}

function buildPrompt(language, unit, feedback) {
  const L = LANGUAGE_NAMES[language];
  const lines = [
    `You write exam questions for an Egyptian Arabic speaker learning ${L}, after a voice lesson.`,
    `The ONLY source of content is the unit below. Do NOT use vocabulary, grammar, or sentences outside it, and do NOT reproduce textbook exercises.`,
    ``,
    `## Unit`,
    JSON.stringify(unitContext(unit), null, 2),
    ``,
    `## Counts (exact)`,
    `- "vocab": ${COUNTS.vocab}`,
    `- "grammar": ${COUNTS.grammar}`,
    `- "speaking": ${COUNTS.speaking}`,
    `- "listening": ${COUNTS.listening}`,
    ``,
    `## Language of text`,
    `- "prompt" (instructions to the learner): Egyptian Arabic (العامية المصرية), natural and friendly.`,
    `- Target content (words, options in ${L}, "text", speaking "answer"): ${L}.`,
    `- Options for vocab and listening are Arabic meanings when the question asks for meaning; otherwise ${L}.`,
    ``,
    `## Rules per kind`,
    `- vocab: test the meaning (Arabic options) or the correct English word in a context sentence (English options). The unit may have fewer terms than questions: use every term at least once, and a term may appear at most TWICE, once in each format. Never ask the same format for the same term twice.`,
    `- grammar: a fill-in or correct-form choice that tests one of the coreGrammar points. Exactly one correct option. Distractors must be plausible common mistakes, not obviously wrong.`,
    `- speaking: an Arabic situation the learner must answer in ${L}. "answer" is the ideal ${L} sentence (4 to 14 words). No "options". Do not make the situation identical to a unit phrase.`,
    `- listening: "text" is a short ${L} sentence (4 to 12 words) using unit vocab or grammar. "options" are 4 Arabic meanings, exactly one correct, the distractors clearly different in meaning.`,
    ``,
    `## Difficulty (1 easy, 2 medium, 3 hard)`,
    `- 1: recognize a single word or a simple form.`,
    `- 2: use the item inside one clear sentence.`,
    `- 3: contextual: combine grammar and vocab, or cover a mustCover point.`,
    `- Spread difficulties across all four kinds: about a third of each kind at each level.`,
    ``,
    `## Quality`,
    `- Every question tests something different. No two prompts or answers may be the same or almost the same.`,
    `- Options: exactly 4 for vocab, grammar, and listening; all distinct; the answer appears in options exactly once.`,
    `- Speaking has no options.`,
    ``,
    `## Output`,
    `Return JSON only, no markdown:`,
    `{"questions":[{"kind":"vocab|grammar|speaking|listening","difficulty":1,"prompt":"...","text":"(listening only)","options":["..."],"answer":"..."}]}`,
  ];
  if (feedback && feedback.length > 0) {
    lines.push(
      ``,
      `## Previous attempt was rejected. Fix ALL of these and return a complete new set:`,
      ...feedback.map((f) => `- ${f}`),
    );
  }
  return lines.join("\n");
}

const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
const wordCount = (s) => String(s ?? "").trim().split(/\s+/).filter(Boolean).length;

function validate(questions, unit) {
  const problems = [];
  if (!Array.isArray(questions)) return ["response has no questions array"];

  for (const kind of Object.keys(COUNTS)) {
    const n = questions.filter((q) => q?.kind === kind).length;
    if (n !== COUNTS[kind]) problems.push(`${kind}: expected ${COUNTS[kind]} questions, got ${n}`);
  }

  const prompts = new Set();
  const answersByKind = { vocab: new Set(), grammar: new Set(), speaking: new Set(), listening: new Set() };
  const unitTerms = unit.vocab.map((v) => norm(v.term));

  questions.forEach((q, i) => {
    const tag = `#${i + 1} (${q?.kind})`;
    if (!PREFIX[q?.kind]) {
      problems.push(`${tag}: unknown kind`);
      return;
    }
    if (![1, 2, 3].includes(q.difficulty)) problems.push(`${tag}: difficulty must be 1, 2 or 3`);
    if (!q.prompt || !String(q.prompt).trim()) problems.push(`${tag}: empty prompt`);
    if (!q.answer || !String(q.answer).trim()) problems.push(`${tag}: empty answer`);

    const p = norm(q.prompt);
    if (prompts.has(p)) problems.push(`${tag}: duplicate prompt "${q.prompt}"`);
    prompts.add(p);

    const a = norm(q.answer);
    if (answersByKind[q.kind]) {
      if (answersByKind[q.kind].has(a)) problems.push(`${tag}: duplicate answer "${q.answer}"`);
      answersByKind[q.kind].add(a);
    }

    if (q.kind === "speaking") {
      if (q.options && q.options.length) problems.push(`${tag}: speaking must not have options`);
      const w = wordCount(q.answer);
      if (w < 4 || w > 14) problems.push(`${tag}: speaking answer must be 4 to 14 words (got ${w})`);
    } else {
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        problems.push(`${tag}: must have exactly 4 options`);
      } else {
        const opts = q.options.map(norm);
        if (new Set(opts).size !== 4) problems.push(`${tag}: options must be distinct`);
        if (!opts.includes(a)) problems.push(`${tag}: answer must be one of the options exactly`);
      }
    }

    if (q.kind === "listening") {
      const w = wordCount(q.text);
      if (w < 4 || w > 12) problems.push(`${tag}: listening text must be 4 to 12 words (got ${w})`);
    }

    if (q.kind === "vocab") {
      const haystack = [q.prompt, q.answer, ...(q.options || [])].map(norm).join(" | ");
      const usesUnitTerm = unitTerms.some((t) => t && haystack.includes(t));
      const usesMeaning = unit.vocab.some((v) => norm(v.ar) && haystack.includes(norm(v.ar)));
      if (!usesUnitTerm && !usesMeaning) {
        problems.push(`${tag}: vocab question does not use any term from this unit`);
      }
    }
  });

  for (const d of [1, 2, 3]) {
    if (!questions.some((q) => q?.difficulty === d)) problems.push(`no question at difficulty ${d}`);
  }

  return problems;
}

function orderQuestions(questions, unitId) {
  const kindOrder = { vocab: 0, grammar: 1, speaking: 2, listening: 3 };
  const sorted = [...questions].sort(
    (x, y) => x.difficulty - y.difficulty || kindOrder[x.kind] - kindOrder[y.kind],
  );
  const seen = {};
  return sorted.map((q) => {
    seen[q.kind] = (seen[q.kind] || 0) + 1;
    const id = `${unitId}-${PREFIX[q.kind]}${String(seen[q.kind]).padStart(2, "0")}`;
    const out = { id, kind: q.kind, difficulty: q.difficulty, prompt: String(q.prompt).trim() };
    if (q.text) out.text = String(q.text).trim();
    if (Array.isArray(q.options) && q.options.length) out.options = q.options.map((o) => String(o).trim());
    out.answer = String(q.answer).trim();
    return out;
  });
}

function parseModelJson(text) {
  const cleaned = String(text ?? "")
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(cleaned);
}

async function callModel(apiKey, prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4,
          maxOutputTokens: 16000,
        },
      }),
      signal: AbortSignal.timeout(180000),
    },
  );
  if (!res.ok) throw new Error(`model request failed (${res.status})`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("");
  return parseModelJson(text);
}

function readBank(file) {
  if (!existsSync(file)) return {};
  return JSON.parse(readFileSync(file, "utf8"));
}

function syncMirrors() {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const language of ALL_LANGUAGES) {
    const bank = readBank(path.join(OUT_DIR, `${language}.json`));
    const questions = Object.fromEntries(
      Object.entries(bank).map(([unitId, entry]) => [unitId, entry.questions]),
    );
    writeFileSync(
      path.join(OUT_DIR, `${language}.ts`),
      `import type { ExamQuestion } from "../exams";\n\n` +
        `// توليد تلقائي من scripts/generate-exam-banks.mjs. ماتعدّلهوش بيدك.\n` +
        `export const EXAM_BANK_${language.toUpperCase()}: Record<string, ExamQuestion[]> = ${JSON.stringify(questions, null, 2)};\n`,
      "utf8",
    );
  }
  writeFileSync(
    path.join(OUT_DIR, "index.ts"),
    `import type { ExamQuestion } from "../exams";\n` +
      ALL_LANGUAGES.map(
        (l) => `import { EXAM_BANK_${l.toUpperCase()} } from "./${l}";`,
      ).join("\n") +
      `\n\n` +
      `export const EXAM_BANKS: Record<string, Record<string, ExamQuestion[]>> = {\n` +
      ALL_LANGUAGES.map((l) => `  ${l}: EXAM_BANK_${l.toUpperCase()},`).join("\n") +
      `\n};\n`,
    "utf8",
  );
}

async function generateUnit(apiKey, language, unit) {
  let feedback = [];
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let parsed;
    try {
      parsed = await callModel(apiKey, buildPrompt(language, unit, feedback));
    } catch (error) {
      feedback = [`the response was not valid JSON (${error instanceof Error ? error.message : "error"})`];
      console.warn(`  attempt ${attempt}: ${feedback[0]}`);
      continue;
    }
    const problems = validate(parsed?.questions, unit);
    if (problems.length === 0) {
      return orderQuestions(parsed.questions, unit.id);
    }
    feedback = problems;
    console.warn(`  attempt ${attempt} rejected: ${problems.length} problem(s)`);
  }
  return null;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.all && !args.lang) {
    console.log("usage: --dry-run --lang en --level A2 --unit 0 | --lang en --level A2 | --all");
    process.exit(1);
  }

  const { shared, outDir } = loadShared();
  const { getSyllabusUnits } = shared;

  const languages = args.all ? ALL_LANGUAGES : [args.lang];
  const levels = args.all || !args.level ? ALL_LEVELS : [args.level];

  if (args.dryRun) {
    const language = languages[0];
    const level = levels[0];
    const index = Number.isInteger(args.unit) ? args.unit : 0;
    const unit = (getSyllabusUnits(language, level) ?? [])[index];
    if (!unit) throw new Error(`no unit ${language}/${level}/${index}`);
    console.log(buildPrompt(language, unit, []));
    rmSync(outDir, { recursive: true, force: true });
    return;
  }

  const apiKey = loadApiKey();
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing in apps/web/.env.local");

  mkdirSync(OUT_DIR, { recursive: true });
  let failed = 0;

  for (const language of languages) {
    const file = path.join(OUT_DIR, `${language}.json`);
    const bank = readBank(file);

    for (const level of levels) {
      const units = getSyllabusUnits(language, level) ?? [];
      for (let index = 0; index < units.length; index++) {
        if (Number.isInteger(args.unit) && args.unit !== index) continue;
        const unit = units[index];

        if (bank[unit.id] && !args.force) {
          console.log(`skip ${unit.id} (already generated)`);
          continue;
        }

        console.log(`generating ${unit.id} ...`);
        const questions = await generateUnit(apiKey, language, unit);
        if (!questions) {
          failed++;
          console.error(`FAILED ${unit.id} after ${MAX_ATTEMPTS} attempts`);
          continue;
        }

        bank[unit.id] = { model: MODEL, generatedAt: new Date().toISOString(), questions };
        writeFileSync(file, JSON.stringify(bank, null, 2) + "\n", "utf8");
        console.log(`saved ${unit.id} (${questions.length} questions)`);
      }
    }
  }

  syncMirrors();
  rmSync(outDir, { recursive: true, force: true });
  if (failed > 0) {
    console.error(`${failed} unit(s) failed. Re-run the same command to retry them.`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
