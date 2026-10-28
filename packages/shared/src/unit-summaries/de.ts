import type { UnitHandAuthored } from "../unit-summary/types";

/**
 * الجزء اللي بنألّفه بإيدي لوحدات الألماني — overview شامل + المهارات الأربعة.
 * المفردات/الجمل/القواعد بتتجاب تلقائياً من المنهج (getUnit).
 * المفتاح هو unitId: `${lang}-${level}-u${nn}`.
 */
export const UNIT_SUMMARY_DE: Record<string, UnitHandAuthored> = {
  "de-a1-u01": {
    unitId: "de-a1-u01",
    overview:
      "في الوحدة دي اتعلمنا نحيّي حد (Hallo / Guten Morgen / Guten Abend)، ونعرّف بنفسنا (Ich heiße Ahmed / Ich komme aus Ägypten)، ونقول وداع (Tschüss / Bis bald). كمان غطّينا فعل sein (ich bin, du bist, er/sie ist) وأفعال التعريف (ich heiße, ich wohne, ich komme) وضماير الفاعل. ده الأساس لأي محادثة ألمانية.",
    skills: {
      reading: {
        instruction: "اقرأ النص وجاوب: أحمد اسمه إيه وجاي منين؟",
        prompt:
          "Hallo! Ich heiße Ahmed. Ich komme aus Ägypten und wohne in Kairo. Freut mich!",
        modelAnswer: "أحمد اسمه أحمد، وجاي من مصر وعايش في القاهرة.",
      },
      writing: {
        instruction: "اكتب ٣ جمل تعرّف فيها بنفسك: اسمك، بلدك، ومكان سكنك.",
        prompt: "Ich heiße ___ . Ich komme aus ___ . Ich wohne in ___ .",
        modelAnswer: "Ich heiße Mona. Ich komme aus Ägypten. Ich wohne in Alexandria.",
      },
      listening: {
        instruction: "اسمع الجملة وقول معناها بالعربي:",
        prompt: "Wie heißt du?",
        modelAnswer: "اسمك إيه؟",
      },
      speaking: {
        instruction: "قول بالصوت: اسمي مونا وأنا من إسكندرية.",
        prompt: "Ich heiße Mona und ich komme aus Alexandria.",
        modelAnswer: "Ich heiße Mona und ich komme aus Alexandria.",
      },
    },
  },
};
