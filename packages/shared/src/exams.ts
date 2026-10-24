/**
 * بنك أسئلة الاختبار بعد كل جلسة. كل وحدة ليها بنك فيه BANK_SIZE سؤال،
 * والاختبار الواحد بيسحب EXAM_LENGTH سؤال منه بالتوزيع اللي فوق.
 */
export type ExamKind = "vocab" | "grammar" | "speaking" | "listening";

export interface ExamQuestion {
  id: string;
  kind: ExamKind;
  /** التعليمات بالعامية المصرية */
  prompt: string;
  /** الكلام اللي الطالب بيسمعه (للسمع) أو الهدف اللي بيقوله (للكلام) */
  text?: string;
  /** اختيارات (للمفردات والقواعد والسمع). ما فيش للكلام. */
  options?: string[];
  /** الإجابة الصح: من options، أو الجملة المستهدفة للكلام */
  answer: string;
}

export const BANK_SIZE = 35;
export const EXAM_LENGTH = 10;

export const EXAM_DISTRIBUTION: Record<ExamKind, number> = {
  vocab: 4,
  grammar: 3,
  speaking: 2,
  listening: 1,
};

export const EXAM_BANK_TARGET: Record<ExamKind, number> = {
  vocab: 14,
  grammar: 10,
  speaking: 8,
  listening: 3,
};

export const EXAM_BANKS: Record<string, ExamQuestion[]> = {
  "en-a2-u01": [
    { id: "en-a2-u01-v01", kind: "vocab", prompt: "اختار معنى relative", options: ["قريب", "جار", "صاحب", "زميل"], answer: "قريب" },
    { id: "en-a2-u01-v02", kind: "vocab", prompt: "اختار الكلمة اللي معناها: ابن أو بنت عمّك أو خالك", options: ["cousin", "nephew", "neighbour", "partner"], answer: "cousin" },
    { id: "en-a2-u01-v03", kind: "vocab", prompt: "اختار معنى generous", options: ["كريم", "متوتر", "خجول", "مضحك"], answer: "كريم" },
    { id: "en-a2-u01-v04", kind: "vocab", prompt: "اختار معنى shy", options: ["خجول", "مضحك", "متوتر", "قريب"], answer: "خجول" },
    { id: "en-a2-u01-v05", kind: "vocab", prompt: "اختار معنى funny", options: ["مضحك", "كريم", "خجول", "جنب"], answer: "مضحك" },
    { id: "en-a2-u01-v06", kind: "vocab", prompt: "اختار معنى nervous", options: ["متوتر", "قدام", "زي", "مثلاً"], answer: "متوتر" },
    { id: "en-a2-u01-v07", kind: "vocab", prompt: "اختار معنى next to", options: ["جنب", "قدام", "زي", "تأخير"], answer: "جنب" },
    { id: "en-a2-u01-v08", kind: "vocab", prompt: "اختار معنى opposite", options: ["قدام/مقابل", "جنب", "مثلاً", "يفوّت"], answer: "قدام/مقابل" },
    { id: "en-a2-u01-v09", kind: "vocab", prompt: "اختار معنى for example", options: ["مثلاً", "زي", "إجازة", "رحلة"], answer: "مثلاً" },
    { id: "en-a2-u01-v10", kind: "vocab", prompt: "اختار معنى like في \"He's like his brother\"", options: ["زي", "مثلاً", "جنب", "قريب"], answer: "زي" },
    { id: "en-a2-u01-v11", kind: "vocab", prompt: "كمّل الجملة: She shares everything with her friends. She is very ___.", options: ["generous", "shy", "nervous", "opposite"], answer: "generous" },
    { id: "en-a2-u01-v12", kind: "vocab", prompt: "كمّل الجملة: He doesn't talk at parties. He is very ___.", options: ["shy", "funny", "generous", "relative"], answer: "shy" },
    { id: "en-a2-u01-v13", kind: "vocab", prompt: "كمّل الجملة: The cinema is ___ the bank.", options: ["next to", "nervous", "funny", "relative"], answer: "next to" },
    { id: "en-a2-u01-v14", kind: "vocab", prompt: "كمّل الجملة: I'm really ___ before my exam.", options: ["nervous", "generous", "shy", "opposite"], answer: "nervous" },
    { id: "en-a2-u01-g01", kind: "grammar", prompt: "اختار الجملة الصح للسؤال: بتعيش فين؟", options: ["Where do you live?", "Where you live do?", "Where live you do?", "Do where you live?"], answer: "Where do you live?" },
    { id: "en-a2-u01-g02", kind: "grammar", prompt: "كمّل: She ___ in a bank.", options: ["works", "work", "working", "is work"], answer: "works" },
    { id: "en-a2-u01-g03", kind: "grammar", prompt: "كمّل: They ___ to the gym every day.", options: ["go", "goes", "going", "are go"], answer: "go" },
    { id: "en-a2-u01-g04", kind: "grammar", prompt: "كمّل: I'm ___ a book right now.", options: ["reading", "read", "reads", "am read"], answer: "reading" },
    { id: "en-a2-u01-g05", kind: "grammar", prompt: "كمّل: What ___ you doing?", options: ["are", "do", "is", "did"], answer: "are" },
    { id: "en-a2-u01-g06", kind: "grammar", prompt: "كمّل (للشخص): He's the man ___ lives next door.", options: ["who", "which", "whose", "where"], answer: "who" },
    { id: "en-a2-u01-g07", kind: "grammar", prompt: "كمّل (للشيء): This is the book ___ I told you about.", options: ["which", "who", "whose", "when"], answer: "which" },
    { id: "en-a2-u01-g08", kind: "grammar", prompt: "كمّل في سؤال: Do you have ___ brothers?", options: ["any", "some", "a", "much"], answer: "any" },
    { id: "en-a2-u01-g09", kind: "grammar", prompt: "كمّل: My sister ___ very tall.", options: ["is", "are", "am", "be"], answer: "is" },
    { id: "en-a2-u01-g10", kind: "grammar", prompt: "كمّل: They ___ waiting for the bus now.", options: ["are", "is", "do", "have"], answer: "are" },
    { id: "en-a2-u01-s01", kind: "speaking", prompt: "اسأل صاحبك بتشتغل فين", answer: "Where do you work?" },
    { id: "en-a2-u01-s02", kind: "speaking", prompt: "قول إن صاحبتك دي صاحبة بتخليك تضحك دايماً", answer: "She's a friend who always makes me laugh." },
    { id: "en-a2-u01-s03", kind: "speaking", prompt: "اسأل صاحبك بيعمل إيه دلوقتي", answer: "What are you doing right now?" },
    { id: "en-a2-u01-s04", kind: "speaking", prompt: "قول إن أخوك كريم زي أخوه", answer: "He's very generous, like his brother." },
    { id: "en-a2-u01-s05", kind: "speaking", prompt: "قول إنك مهندس (وإنك بتشتغل في شركة)", answer: "I work as an engineer in a company." },
    { id: "en-a2-u01-s06", kind: "speaking", prompt: "قول إن صاحبك طويل وخجول", answer: "He's tall and shy." },
    { id: "en-a2-u01-s07", kind: "speaking", prompt: "اسأل صاحبك لو عنده إخوات", answer: "Do you have any brothers?" },
    { id: "en-a2-u01-s08", kind: "speaking", prompt: "قول إنك دلوقتي بتذاكر", answer: "I'm studying right now." },
    { id: "en-a2-u01-l01", kind: "listening", prompt: "اسمع الجملة واختار المعنى الصح", text: "She's always so generous.", options: ["هي دايماً كريمة", "هي دايماً متوترة", "هي دايماً مضحكة", "هي دايماً بعيدة"], answer: "هي دايماً كريمة" },
    { id: "en-a2-u01-l02", kind: "listening", prompt: "اسمع السؤال واختار المعنى الصح", text: "Where do they work?", options: ["بيشتغلوا فين؟", "بيعملوا إيه؟", "بيسكنوا فين؟", "فين الأكل؟"], answer: "بيشتغلوا فين؟" },
    { id: "en-a2-u01-l03", kind: "listening", prompt: "اسمع الجملة واختار المعنى الصح", text: "He's waiting next to the door.", options: ["هو واقف جنب الباب", "هو قاعد جوه الأوضة", "هو خارج من الباب", "هو بيفتح الشباك"], answer: "هو واقف جنب الباب" },
  ],
};
