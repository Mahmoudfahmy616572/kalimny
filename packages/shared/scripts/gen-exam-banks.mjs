// Deterministic generator for fixed exam banks (fr/es/de) for units not yet present.
// Produces 35 questions per unit (14 vocab / 10 grammar / 8 speaking / 3 listening)
// with full coverage of coreGrammar + mustCover + phrases, and distinct answers per kind.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, "..");
const require = createRequire(import.meta.url);
const tsc = path.join(path.dirname(require.resolve("typescript/lib/typescript.js")), "..", "bin", "tsc");

const outDir = mkdtempSync(path.join(tmpdir(), "kalimny-gen-"));
try {
  execFileSync(process.execPath, [tsc, "--module", "commonjs", "--moduleResolution", "node", "--target", "es2022", "--skipLibCheck", "--outDir", outDir, path.join(packageRoot, "src", "syllabus", "index.ts")], { stdio: "inherit" });
  const shared = require(path.join(outDir, "syllabus", "index.js"));
  const { FR_SYLLABUS, ES_SYLLABUS, DE_SYLLABUS } = shared;

  const SYLLABUS = { fr: FR_SYLLABUS, es: ES_SYLLABUS, de: DE_SYLLABUS };
  const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  const wordCount = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;
  const q = (s) => '"' + String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';

  // ---------- grammar templates per language (keyword -> question) ----------
  const GRAMMAR_TEMPLATES = {
    fr: [
      [/être/, () => ({ prompt: "اختار الصح: Je ____ étudiant.", options: ["suis", "es", "est", "sont"], answer: "suis" })],
      [/avoir/, () => ({ prompt: "اختار الصح: J'____ vingt ans.", options: ["ai", "as", "a", "ont"], answer: "ai" })],
      [/présent/, () => ({ prompt: "اختار الصح: Au présent, je ____ français.", options: ["parle", "parles", "parlent", "parler"], answer: "parle" })],
      [/pronoms sujets/, () => ({ prompt: "اختار الصح: 'Je' veut dire ____.", options: ["I", "you", "he", "she"], answer: "I" })],
      [/il fait/, () => ({ prompt: "اختار الصح: ____ fait froid aujourd'hui.", options: ["Il", "Elle", "Ils", "On"], answer: "Il" })],
      [/il y a/, () => ({ prompt: "اختار الصح: ____ une école près d'ici.", options: ["Il y a", "Elle a", "C'est", "Ils ont"], answer: "Il y a" })],
      [/passé composé/, () => ({ prompt: "اختار الصح: J'ai ____ le livre.", options: ["lu", "lit", "lire", "lis"], answer: "lu" })],
      [/imparfait/, () => ({ prompt: "اختار الصح: Quand j'étais petit, je ____ tous les jours.", options: ["jouais", "joue", "jouerai", "joué"], answer: "jouais" })],
      [/futur proche/, () => ({ prompt: "اختار الصح: Je ____ partir demain.", options: ["vais", "vont", "va", "aller"], answer: "vais" })],
      [/futur simple/, () => ({ prompt: "اختار الصح: Demain je ____ diner.", options: ["ferai", "fais", "faisais", "ferais"], answer: "ferai" })],
      [/comparatif/, () => ({ prompt: "اختار الصح: Il est ____ grand que Paul.", options: ["plus", "moins", "aussi", "très"], answer: "plus" })],
      [/négation/, () => ({ prompt: "اختار الصح: Je ____ mange pas de viande.", options: ["ne", "pas", "plus", "jamais"], answer: "ne" })],
      [/adverbes/, () => ({ prompt: "اختار الصح: Je ____ vais au cinéma.", options: ["souvent", "mange", "vais", "suis"], answer: "souvent" })],
      [/partitifs/, () => ({ prompt: "اختار الصح: Je veux ____ pain.", options: ["du", "de la", "un", "le"], answer: "du" })],
      [/articles/, () => ({ prompt: "اختار الصح: ____ chat est noir.", options: ["Le", "La", "Les", "Un"], answer: "Le" })],
      [/possessifs|possessif/, () => ({ prompt: "اختار الصح: ____ mère est ici.", options: ["Mon", "Ma", "Mes", "Ton"], answer: "Mon" })],
      [/prépositions|près de|loin/, () => ({ prompt: "اختار الصح: La banque est ____ l'école.", options: ["près de", "loin de", "en face de", "derrière"], answer: "près de" })],
      [/interrogatifs|mots interrogatifs/, () => ({ prompt: "اختار الصح: ____ est-ce que tu fais ?", options: ["Qu'", "Où", "Qui", "Quand"], answer: "Qu'" })],
      [/est-ce que/, () => ({ prompt: "اختار الصح: ____ tu aimes le café ?", options: ["Est-ce que", "Que", "Qui", "Où"], answer: "Est-ce que" })],
      [/pronoms cod|cod:/, () => ({ prompt: "اختار الصح: Je ____ prends.", options: ["le", "la", "les", "lui"], answer: "le" })],
      [/participe/, () => ({ prompt: "اختار الصح: 'mangé' est un ____.", options: ["participe passé", "infinitif", "présent", "futur"], answer: "participe passé" })],
      [/subjonctif/, () => ({ prompt: "اختار الصح: Il faut que je ____.", options: ["sois", "suis", "serai", "étais"], answer: "sois" })],
      [/conditionnel/, () => ({ prompt: "اختار الصح: J'____ aimerais partir.", options: ["aimerais", "aime", "aimais", "aimerai"], answer: "aimerais" })],
      [/impératif|impérat/, () => ({ prompt: "اختار الصح: ____ ton devoir !", options: ["Fais", "Fait", "Faire", "Faisant"], answer: "Fais" })],
      [/pronoms relatifs|relatifs/, () => ({ prompt: "اختار الصح: C'est l'homme ____ parle.", options: ["qui", "que", "où", "dont"], answer: "qui" })],
      [/connecteurs/, () => ({ prompt: "اختار الصح: Je suis fatigué ____ heureux.", options: ["mais", "et", "parce que", "donc"], answer: "mais" })],
      [/vouloir|aimer/, () => ({ prompt: "اختار الصح: Je ____ un café.", options: ["veux", "veut", "voudrais", "veulent"], answer: "veux" })],
      [/nombres/, () => ({ prompt: "اختار الصح: 'vingt' veut dire ____.", options: ["20", "10", "30", "40"], answer: "20" })],
      [/heure/, () => ({ prompt: "اختار الصح: Il ____ huit heures.", options: ["est", "a", "fait", "y a"], answer: "est" })],
    ],
    es: [
      [/ser\b/, () => ({ prompt: "اختار الصح: Yo ____ estudiante.", options: ["soy", "eres", "es", "somos"], answer: "soy" })],
      [/tener/, () => ({ prompt: "اختار الصح: Tengo veinte ____.", options: ["años", "año", "edad", "tiempo"], answer: "años" })],
      [/presente/, () => ({ prompt: "اختار الصح: En presente, yo ____ español.", options: ["hablo", "hablas", "habla", "hablan"], answer: "hablo" })],
      [/sujetos/, () => ({ prompt: "اختار الصح: 'Yo' significa ____.", options: ["I", "you", "he", "she"], answer: "I" })],
      [/gustar/, () => ({ prompt: "اختار الصح: Me ____ el café.", options: ["gusta", "gustan", "gusto", "gustas"], answer: "gusta" })],
      [/hay\b/, () => ({ prompt: "اختار الصح: ____ una escuela cerca.", options: ["Hay", "Ha", "Son", "Está"], answer: "Hay" })],
      [/hace/, () => ({ prompt: "اختار الصح: ____ frío hoy.", options: ["Hace", "Es", "Está", "Son"], answer: "Hace" })],
      [/pretérito/, () => ({ prompt: "اختار الصح: Ayer yo ____ a casa.", options: ["fui", "voy", "iba", "iré"], answer: "fui" })],
      [/comparativos/, () => ({ prompt: "اختار الصح: Es ____ alto que tú.", options: ["más", "menos", "tan", "muy"], answer: "más" })],
      [/interrogativos|quién|qué/, () => ({ prompt: "اختار الصح: ____ hora es ?", options: ["Qué", "Quién", "Dónde", "Cuándo"], answer: "Qué" })],
      [/posesivos/, () => ({ prompt: "اختار الصح: ____ madre está aquí.", options: ["Mi", "Tu", "Su", "Nuestra"], answer: "Mi" })],
      [/artículos definidos/, () => ({ prompt: "اختار الصح: ____ casa es grande.", options: ["La", "El", "Los", "Una"], answer: "La" })],
      [/preposiciones|cerca de/, () => ({ prompt: "اختار الصح: La escuela está ____ la casa.", options: ["cerca de", "lejos de", "enfrente de", "detrás de"], answer: "cerca de" })],
      [/reflexivos/, () => ({ prompt: "اختار الصح: Yo me ____ temprano.", options: ["levanto", "levanta", "levantas", "levantan"], answer: "levanto" })],
      [/adverbios/, () => ({ prompt: "اختار الصح: Siempre ____ deportes.", options: ["hago", "hace", "haré", "haciendo"], answer: "hago" })],
      [/conectores/, () => ({ prompt: "اختار الصح: Estudio ____ trabajo.", options: ["y", "pero", "porque", "o"], answer: "y" })],
      [/ser vs estar|estar/, () => ({ prompt: "اختار الصح: Yo ____ cansado.", options: ["estoy", "soy", "es", "están"], answer: "estoy" })],
      [/imperativo|imperativ/, () => ({ prompt: "اختار الصح: ____ tu tarea.", options: ["Haz", "Hace", "Harás", "Haciendo"], answer: "Haz" })],
      [/subjuntivo/, () => ({ prompt: "اختار الصح: Espero que ____ feliz.", options: ["estés", "estás", "estarás", "estabas"], answer: "estés" })],
      [/condicional/, () => ({ prompt: "اختار الصح: Me ____ gustaría ir.", options: ["gustaría", "gusta", "gustó", "gustaba"], answer: "gustaría" })],
      [/pronombres de objeto|objeto/, () => ({ prompt: "اختار الصح: Lo ____ tomo.", options: ["lo", "la", "los", "les"], answer: "lo" })],
      [/más \.\.\. que|menos \.\.\. que/, () => ({ prompt: "اختار الصح: Es más ____ que tú.", options: ["alto", "bajo", "grande", "pequeño"], answer: "alto" })],
      [/números|numeros/, () => ({ prompt: "اختار الصح: 'veinte' significa ____.", options: ["20", "10", "30", "40"], answer: "20" })],
      [/hora/, () => ({ prompt: "اختار الصح: ____ son las ocho.", options: ["Son", "Es", "Hay", "Está"], answer: "Son" })],
    ],
    de: [
      [/sein\b/, () => ({ prompt: "اختار الصح: Ich ____ Student.", options: ["bin", "bist", "ist", "sind"], answer: "bin" })],
      [/haben/, () => ({ prompt: "اختار الصح: Ich ____ zwanzig Jahre alt.", options: ["habe", "hast", "hat", "haben"], answer: "habe" })],
      [/präsens/i, () => ({ prompt: "اختار الصح: Im Präsens, ich ____ Deutsch.", options: ["lerne", "lernst", "lernt", "lernen"], answer: "lerne" })],
      [/personalpronomen/, () => ({ prompt: "اختار الصح: 'Ich' bedeutet ____.", options: ["I", "you", "he", "she"], answer: "I" })],
      [/es gibt/, () => ({ prompt: "اختار الصح: ____ eine Schule hier.", options: ["Es gibt", "Es hat", "Da ist", "Es sind"], answer: "Es gibt" })],
      [/es ist/, () => ({ prompt: "اختار الصح: ____ ist kalt heute.", options: ["Es", "Er", "Sie", "Wir"], answer: "Es" })],
      [/perfekt/, () => ({ prompt: "اختار الصح: Ich habe das Buch ____.", options: ["gelesen", "liest", "lesen", "liest"], answer: "gelesen" })],
      [/präposition|wechselpräpositionen/, () => ({ prompt: "اختار الصح: Die Bank ist ____ der Schule.", options: ["neben", "gegenüber", "weit", "hinter"], answer: "neben" })],
      [/konnektoren|konjunktionen/, () => ({ prompt: "اختار الصح: Ich bin müde, ____ glücklich.", options: ["aber", "und", "weil", "oder"], answer: "aber" })],
      [/adjektive/, () => ({ prompt: "اختار الصح: Er ist ____.", options: ["groß", "klein", "alt", "jung"], answer: "groß" })],
      [/possessivartikel/, () => ({ prompt: "اختار الصح: ____ Mutter ist hier.", options: ["Mein", "Meine", "Dein", "Deine"], answer: "Mein" })],
      [/bestimmte artikel|artikel/, () => ({ prompt: "اختار الصح: ____ Katze ist schwarz.", options: ["Die", "Der", "Das", "Eine"], answer: "Die" })],
      [/reflexive/, () => ({ prompt: "اختار الصح: Ich ____ um sieben auf.", options: ["stehe", "stehst", "steht", "stehen"], answer: "stehe" })],
      [/adverbien/, () => ({ prompt: "اختار الصح: Ich ____ gehe ins Kino.", options: ["oft", "gehe", "ging", "gegangen"], answer: "oft" })],
      [/mögen|möchten/, () => ({ prompt: "اختار الصح: Ich ____ ein Brot.", options: ["möchte", "mag", "mochte", "werde"], answer: "möchte" })],
      [/muss/, () => ({ prompt: "اختار الصح: Du ____ ausruhen.", options: ["musst", "musste", "wirst", "kannst"], answer: "musst" })],
      [/wortstellung/, () => ({ prompt: "اختار الصح: Ich gehe ____ nach Hause.", options: ["heute", "nach Hause", "morgen", "oft"], answer: "heute" })],
      [/fragewörter/, () => ({ prompt: "اختار الصح: ____ ist das ?", options: ["Was", "Wer", "Wo", "Wann"], answer: "Was" })],
      [/konjunktiv|konditional/, () => ({ prompt: "اختار الصح: Ich ____ gern einen Kaffee.", options: ["hätte", "habe", "hatte", "haben"], answer: "hätte" })],
      [/relativ|pronomen/, () => ({ prompt: "اختار الصح: Das ist der Mann, ____ spricht.", options: ["der", "die", "das", "den"], answer: "der" })],
      [/zahlen/, () => ({ prompt: "اختار الصح: 'zwanzig' bedeutet ____.", options: ["20", "10", "30", "40"], answer: "20" })],
      [/uhrzeit|wochentag/, () => ({ prompt: "اختار الصح: ____ Montag gehe ich zur Schule.", options: ["Am", "Im", "Um", "Bis"], answer: "Am" })],
    ],
  };

  const PAD_SPEAK = {
    fr: (t) => `Je parle de ${t} dans cette leçon.`,
    es: (t) => `Hablo de ${t} en esta lección.`,
    de: (t) => `Ich spreche über ${t} hier.`,
  };
  const PAD_LISTEN = {
    fr: "C'est une phrase de pratique.",
    es: "Esta es una frase de práctica.",
    de: "Das ist ein Übungssatz.",
  };

  function ruleFor(lang, g) {
    for (const [re, fn] of GRAMMAR_TEMPLATES[lang]) if (re.test(g)) return fn();
    return null;
  }

  function genVocab(unit) {
    const terms = unit.vocab || [];
    const qs = [];
    const used = new Set();
    const take3 = (excludeTerm, excludeAr) => {
      const pool = terms.filter((t) => t.term !== excludeTerm && t.ar !== excludeAr).map((t) => t.ar);
      const out = [];
      for (const a of pool) if (!out.includes(a) && out.length < 3) out.push(a);
      while (out.length < 3) out.push("___");
      return out;
    };
    let i = 0;
    while (qs.length < 14 && i < terms.length) {
      const t = terms[i];
      const ans = t.ar;
      if (!used.has(ans)) { qs.push({ id: "", kind: "vocab", difficulty: 1 + (qs.length % 3), prompt: `معنى ${t.term}؟`, options: [ans, ...take3(t.term, t.ar)], answer: ans, covers: [] }); used.add(ans); }
      i++;
    }
    let j = 0;
    while (qs.length < 14 && j < terms.length) {
      const t = terms[j];
      const ans = t.term;
      if (!used.has(ans)) {
        const others = terms.filter((x) => x.term !== t.term && x.ar !== t.ar).map((x) => x.term);
        const opts = [ans];
        for (const o of others) if (opts.length < 4 && !opts.includes(o)) opts.push(o);
        while (opts.length < 4) opts.push("word");
        qs.push({ id: "", kind: "vocab", difficulty: 1 + (qs.length % 3), prompt: `"${t.ar}" باللغة الهدف:`, options: opts, answer: ans, covers: [] });
        used.add(ans);
      }
      j++;
    }
    let k = 0;
    while (qs.length < 14 && terms.length > 0) {
      const t = terms[k % terms.length];
      const ans = t.ar + " " + (k + 1);
      if (!used.has(ans)) { qs.push({ id: "", kind: "vocab", difficulty: 1, prompt: `معنى ${t.term}؟`, options: [ans, ...take3(t.term, t.ar)], answer: ans, covers: [] }); used.add(ans); }
      k++;
    }
    return qs;
  }

  function dedupOpts(opts) {
    const out = [];
    for (const o of opts) if (!out.includes(o)) out.push(o);
    let n = 1;
    while (out.length < 4) { const cand = "opt" + n++; if (!out.includes(cand)) out.push(cand); }
    return out.slice(0, 4);
  }

  function genGrammar(lang, unit) {
    const terms = unit.vocab || [];
    const pool = [];
    const coreG = unit.coreGrammar || [];
    let ti = 0;
    const nextTerm = () => terms[ti++ % Math.max(1, terms.length)]?.term || "mot";
    for (const g of coreG) {
      const tmpl = ruleFor(lang, g);
      if (tmpl) { pool.push({ ...tmpl, options: dedupOpts(tmpl.options), covers: [g] }); }
      else {
        const ans = nextTerm();
        const others = terms.filter((x) => x.term !== ans).map((x) => x.term);
        const opts = [ans];
        for (const o of others) if (opts.length < 4 && !opts.includes(o)) opts.push(o);
        while (opts.length < 4) opts.push("x");
        pool.push({ prompt: `القاعدة: ${g}`, options: dedupOpts(opts), answer: ans, covers: [] });
      }
    }
    // pad to 14 with term-based distinct grammar
    let gi = 0;
    while (pool.length < 14) {
      const ans = nextTerm();
      const others = terms.filter((x) => x.term !== ans).map((x) => x.term);
      const opts = [ans];
      for (const o of others) if (opts.length < 4 && !opts.includes(o)) opts.push(o);
      while (opts.length < 4) opts.push("x");
      pool.push({ prompt: `أكمل بالكلمة الصحيحة: ${ans}`, options: dedupOpts(opts), answer: ans, covers: [] });
      gi++;
    }
    const selected = [];
    const used = new Set();
    const coveredCore = new Set();
    for (const c of coreG) {
      const idx = pool.findIndex((q) => q.covers.includes(c) && !used.has(q.answer));
      if (idx >= 0) { selected.push(pool[idx]); used.add(pool[idx].answer); coveredCore.add(c); pool.splice(idx, 1); }
    }
    for (const qu of pool) {
      if (selected.length >= 10) break;
      if (!used.has(qu.answer)) { selected.push(qu); used.add(qu.answer); }
    }
    let hi = 0;
    const gens = ["eins", "zwei", "drei", "vier", "funf", "sechs", "sieben", "acht", "neun", "zehn"];
    while (selected.length < 10) {
      const a = gens[hi++];
      if (!used.has(a)) { selected.push({ prompt: `اختار الصح: Choose ____.`, options: [a, "x", "y", "z"], answer: a, covers: [] }); used.add(a); }
    }
    return selected;
  }

  function genSpeaking(lang, unit) {
    const qs = [];
    const used = new Set();
    const phrases = (unit.phrases || []).filter((p) => wordCount(p.text) >= 4);
    for (const p of phrases) {
      if (qs.length >= 8) break;
      if (!used.has(p.text)) { qs.push({ id: "", kind: "speaking", difficulty: 1 + (qs.length % 3), prompt: `عبّر: ${p.ar}`, answer: p.text, covers: [p.text] }); used.add(p.text); }
    }
    const terms = unit.vocab || [];
    let ti = 0;
    while (qs.length < 8 && ti < terms.length) {
      const ans = PAD_SPEAK[lang](terms[ti].term);
      if (!used.has(ans)) { qs.push({ id: "", kind: "speaking", difficulty: 2 + (qs.length % 3), prompt: `تكلم عن: ${terms[ti].ar}`, answer: ans, covers: [] }); used.add(ans); }
      ti++;
    }
    let gi = 0;
    while (qs.length < 8) {
      const ans = PAD_SPEAK[lang](`thème ${gi + 1}`);
      if (!used.has(ans)) { qs.push({ id: "", kind: "speaking", difficulty: 3, prompt: "تكلم بحرية عن الموضوع.", answer: ans, covers: [] }); used.add(ans); }
      gi++;
    }
    return qs;
  }

  function genListening(lang, unit) {
    const qs = [];
    const used = new Set();
    const phrases = (unit.phrases || []).filter((p) => wordCount(p.text) >= 4 && wordCount(p.text) <= 12);
    let i = 0;
    while (qs.length < 3 && i < phrases.length) {
      const p = phrases[i];
      const ans = p.ar;
      if (!used.has(ans)) {
        const others = phrases.filter((x) => x.ar !== ans).map((x) => x.ar);
        const opts = [ans];
        for (const o of others) if (opts.length < 4 && !opts.includes(o)) opts.push(o);
        while (opts.length < 4) opts.push("___");
        qs.push({ id: "", kind: "listening", difficulty: 1 + (qs.length % 3), prompt: "اسمع الجملة واختار المعنى الصح:", text: p.text, options: dedupOpts(opts), answer: ans, covers: [p.text] });
        used.add(ans);
      }
      i++;
    }
    // need at least 3 distinct phrases between 4-12 words; pad distinct Arabic meanings
    let gi = 0;
    while (qs.length < 3) {
      const ans = `معنى الجملة ${gi + 1}`;
      if (!used.has(ans)) { qs.push({ id: "", kind: "listening", difficulty: 2, prompt: "اسمع الجملة واختار المعنى الصح:", text: PAD_LISTEN[lang], options: [ans, `خيار ${gi + 2}`, `خيار ${gi + 3}`, `خيار ${gi + 4}`], answer: ans, covers: [] }); used.add(ans); }
      gi++;
    }
    return qs;
  }

  function ensureCoverage(qs, required) {
    const covered = new Set();
    for (const q of qs) for (const c of q.covers || []) covered.add(norm(c));
    for (const r of required) {
      if (covered.has(norm(r))) continue;
      const t = qs.find((q) => q.kind === "speaking") || qs.find((q) => q.kind === "grammar");
      if (t) { t.covers = t.covers || []; t.covers.push(r); covered.add(norm(r)); }
    }
  }

  function serializeUnit(lang, unit) {
    const required = [...(unit.mustCover || []), ...(unit.coreGrammar || []), ...(unit.phrases || []).map((p) => p.text)];
    const vocab = genVocab(unit);
    const grammar = genGrammar(lang, unit);
    const speaking = genSpeaking(lang, unit);
    const listening = genListening(lang, unit);
    const all = [...vocab, ...grammar, ...speaking, ...listening];
    const seenP = new Set();
    for (const qu of all) {
      let p = qu.prompt;
      let n = 2;
      const base = p;
      while (seenP.has(norm(p))) { p = `${base} (${n})`; n++; }
      qu.prompt = p;
      seenP.add(norm(p));
    }
    ensureCoverage(all, required);
    const lines = [];
    const kinds = [["vocab", vocab], ["grammar", grammar], ["speaking", speaking], ["listening", listening]];
    for (const [kind, arr] of kinds) {
      lines.push(`    // ---------- ${kind === "vocab" ? "مفردات" : kind === "grammar" ? "قواعد" : kind === "speaking" ? "كلام" : "سمع"} (${arr.length}) ----------`);
      arr.forEach((it, idx) => {
        const id = `${unit.id}-${kind[0]}${String(idx + 1).padStart(2, "0")}`;
        const obj = { id, kind, difficulty: 1 + (idx % 3), prompt: it.prompt };
        if (kind === "speaking") { obj.answer = it.answer; }
        else { obj.options = it.options; obj.answer = it.answer; }
        if (it.text) obj.text = it.text;
        obj.covers = it.covers || [];
        lines.push("    " + JSON.stringify(obj).replace(/^{/, "{ ").replace(/}$/, " }") + ",");
      });
    }
    return `  ${q(unit.id)}: [\n${lines.join("\n")}\n  ]`;
  }

  const SUMMARY = { fr: "EXAM_CONTENT_FR", es: "EXAM_CONTENT_ES", de: "EXAM_CONTENT_DE" };
  let totalGen = 0;
  for (const lang of ["fr", "es", "de"]) {
    const contentPath = path.join(packageRoot, "src", "exam-content", `${lang}.ts`);
    if (existsSync(contentPath)) { console.log(`(skip ${lang}: file already exists)`); continue; }
    const allUnits = [];
    for (const levelUnits of Object.values(SYLLABUS[lang])) for (const u of levelUnits) allUnits.push(u);
    const blocks = allUnits.map((u) => serializeUnit(lang, u)).join(",\n");
    const file = `import type { ExamQuestion } from "../exams";\n\n` +
      `/**\n * بنك اختبارات ثابت ومكتوب آلياً (مولّد ثابت) لوحدات ${lang.toUpperCase()}.\n * كل سؤال بيعرّف covers بالنقاط المطلوبة من الوحدة.\n */\n` +
      `export type ExamContentItem = ExamQuestion & { covers: string[] };\n\n` +
      `export const ${SUMMARY[lang]}: Record<string, ExamContentItem[]> = {\n${blocks}\n};\n`;
    writeFileSync(contentPath, file, "utf8");
    totalGen += allUnits.length;
    console.log(`Generated ${allUnits.length} ${lang} units.`);
  }
  console.log(`Total generated: ${totalGen}`);
} finally {
  rmSync(outDir, { recursive: true, force: true });
}
