import type { UnitHandAuthored } from "../unit-summary/types";

/**
 * الجزء اللي بنألّفه بإيدي لوحدات الإنجليزي — overview شامل + المهارات الأربعة.
 * المفردات/الجمل/القواعد بتتجاب تلقائياً من المنهج (getUnit).
 * المفتاح هو unitId: `${lang}-${level}-u${nn}` (زي بنوك الامتحانات).
 */
export const UNIT_SUMMARY_EN: Record<string, UnitHandAuthored> = {
  "en-a1-u01": {
    unitId: "en-a1-u01",
    overview:
      "في الوحدة دي اتعلمنا نحيّي الناس بأدب (Hello / Good morning / Good evening)، ونعرّف بنفسنا بالاسم والبلد (I'm Ahmed / I'm from Egypt)، ونقول وداع مهذّب (Goodbye / See you later). كمان غطّينا ضماير الفاعل (I, you, he, she...) وفعل be (am/are/is) وصفات الملكية (my/your/his/her) عشان نركّب جمل صح عن نفسنا وغيرنا. ده الأساس اللي هتبني عليه أي محادثة إنجليزية بعد كده.",
    skills: {
      reading: {
        instruction: "اقرأ النص وجاوب: منين سارة وعايشة فين؟",
        prompt:
          "Hello! My name is Sara. I am from Egypt and I live in Cairo. Nice to meet you!",
        modelAnswer: "سارة من مصر، وعايشة في القاهرة.",
      },
      writing: {
        instruction:
          "اكتب ٣ جمل قصيرة تعرّف فيها بنفسك: اسمك، بلدك، ومكان سكنك.",
        prompt: "I'm ___ . I'm from ___ . I live in ___ .",
        modelAnswer: "I'm Mona. I'm from Egypt. I live in Alexandria.",
      },
      listening: {
        instruction: "اسمع الجملة وقول معناها بالعربي:",
        prompt: "Where are you from?",
        modelAnswer: "أنت منين؟",
      },
      speaking: {
        instruction: "قول بالصوت: اسمي مونا وأنا من إسكندرية.",
        prompt: "I'm Mona and I'm from Alexandria.",
        modelAnswer: "I'm Mona and I'm from Alexandria.",
      },
    },
  },
};
