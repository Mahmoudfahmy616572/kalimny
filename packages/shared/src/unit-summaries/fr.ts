import type { UnitHandAuthored } from "../unit-summary/types";

/**
 * الجزء اللي بنألّفه بإيدي لوحدات الفرنساوي — overview شامل + المهارات الأربعة.
 * المفردات/الجمل/القواعد بتتجاب تلقائياً من المنهج (getUnit).
 * المفتاح هو unitId: `${lang}-${level}-u${nn}`.
 */
export const UNIT_SUMMARY_FR: Record<string, UnitHandAuthored> = {
  "fr-a1-u01": {
    unitId: "fr-a1-u01",
    overview:
      "في الوحدة دي اتعلمنا نحيّي حد بأدب (Bonjour / Bonsoir / Salut)، ونعرّف بنفسنا (Je m'appelle Sara / Je viens d'Égypte)، ونقول وداع (Au revoir / À bientôt). كمان غطّينا فعل être (je suis, tu es, il/elle est) وأفعال التعريف (je m'appelle, j'habite, je viens) وضماير الفاعل. ده الأساس لأي محادثة فرنساوية محترمة.",
    skills: {
      reading: {
        instruction: "اقرأ النص وجاوب: سارة منين وبتيجي منين؟",
        prompt:
          "Bonjour ! Je m'appelle Sara. Je suis d'Égypte et j'habite au Caire. Enchanté !",
        modelAnswer: "سارة من مصر وعايشة في القاهرة.",
      },
      writing: {
        instruction: "اكتب ٣ جمل تعرّف فيها بنفسك: اسمك، بلدك، ومكان سكنك.",
        prompt: "Je m'appelle ___ . Je suis de ___ . J'habite à ___ .",
        modelAnswer: "Je m'appelle Mona. Je suis d'Égypte. J'habite à Alexandrie.",
      },
      listening: {
        instruction: "اسمع الجملة وقول معناها بالعربي:",
        prompt: "Comment tu t'appelles ?",
        modelAnswer: "اسمك إيه؟",
      },
      speaking: {
        instruction: "قول بالصوت: اسمي مونا وأنا من إسكندرية.",
        prompt: "Je m'appelle Mona et je viens d'Alexandrie.",
        modelAnswer: "Je m'appelle Mona et je viens d'Alexandrie.",
      },
    },
  },
};
