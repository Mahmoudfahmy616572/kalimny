import type { CurriculumUnit, Sublevel } from "../curriculum";
import type { CefrLevel, LanguageCode } from "../languages";

/**
 * طبقة المنهج لكل لغة.
 *
 * الـspine المشترك في curriculum.ts بيدي الموضوع وهدف الجلسة بالعربي،
 * والملفات اللي هنا بتضيف المحتوى الحقيقي للغة نفسها: القاعدة، المفردات،
 * والجُمل — مأخوذة من فهرس كتاب مرجعي (Scope & Sequence) ومكتوبة بأيدينا.
 */

export type SyllabusVocab = {
  /** الكلمة/التعبير في اللغة المستهدفة */
  term: string;
  /** المعنى بالعامية المصرية */
  ar: string;
};

export type SyllabusPhrase = {
  /** جملة كاملة في اللغة المستهدفة */
  text: string;
  /** معناها بالعامية المصرية */
  ar: string;
};

export interface SyllabusUnit {
  /** معرف فريد، مثال: "en-a1-u01" */
  id: string;
  level: CefrLevel;
  /** تقسيم المستوى لنصين — A1.1 = "1" و A1.2 = "2" */
  sublevel?: Sublevel;
  titleAr: string;
  /** عنوان طبيعي باللغة المستهدفة */
  titleNatural: string;
  /** هدف الجلسة بصيغة Can-Do بالعامية */
  goal: string;
  /** القواعد الأساسية، بصياغة إنجليزية + توضيح عربي قصير */
  coreGrammar: string[];
  /** محاور المفردات بالعربي — بتستخدمها summaries */
  vocabThemes: string[];
  vocab: SyllabusVocab[];
  phrases: SyllabusPhrase[];
  /** الحد الأدنى اللي لازم المتعلم يخرج بيه من الجلسة */
  mustCover: string[];
  /** مواضيع مسموح الارتجال فيها */
  canExplore: string[];
  tone?: "playful" | "neutral" | "warm";
}

/** وحدات مستوى واحد لكل لغة. */
export type SyllabusLevelMap = Partial<Record<CefrLevel, SyllabusUnit[]>>;

/** وحدات كل اللغات. */
export type SyllabusMap = Partial<Record<LanguageCode, SyllabusLevelMap>>;

/**
 * بيحوّل وحدة المنهج المكتوبة (اللي فيها مفردات وجُمل مترجمة) للشكل
 * الموحّد اللي الـpersona والـsummary بيستهلكوه.
 *
 * بنحوّل المفردات والجُمل لنص "term — معنى" بدل ما نغيّر شكل الحقول
 * القديمة، عشان الـprompt يفضل يقدر يقراها من غير أي تعديل تاني.
 */
export function toCurriculumUnit(unit: SyllabusUnit): CurriculumUnit {
  return {
    id: unit.id,
    level: unit.level,
    sublevel: unit.sublevel,
    titleAr: unit.titleAr,
    titleNatural: unit.titleNatural,
    goal: unit.goal,
    grammarAr: unit.coreGrammar.join(" · "),
    coreGrammar: unit.coreGrammar,
    vocabThemes: unit.vocabThemes,
    coreVocab: unit.vocab.map((item) => `${item.term} — ${item.ar}`),
    samplePhrases: unit.phrases.map((item) => `${item.text} — ${item.ar}`),
    mustCover: unit.mustCover,
    canExplore: unit.canExplore,
    tone: unit.tone,
  };
}
