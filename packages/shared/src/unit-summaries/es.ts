import type { UnitHandAuthored } from "../unit-summary/types";

/**
 * الجزء اللي بنألّفه بإيدي لوحدات الإسباني — overview شامل + المهارات الأربعة.
 * المفردات/الجمل/القواعد بتتجاب تلقائياً من المنهج (getUnit).
 * المفتاح هو unitId: `${lang}-${level}-u${nn}`.
 */
export const UNIT_SUMMARY_ES: Record<string, UnitHandAuthored> = {
  "es-a1-u01": {
    unitId: "es-a1-u01",
    overview:
      "في الوحدة دي اتعلمنا نحيّي حد (Hola / Buenos días / Buenas tardes)، ونعرّف بنفسنا (Me llamo Ahmed / Soy de Egipto)، ونقول وداع (Adiós / Hasta luego). كمان غطّينا فعل ser (soy, eres, es, somos) وأفعال التعريف (me llamo, vivo, vengo) وضماير الفاعل. ده الأساس لأي محادثة إسبانية.",
    skills: {
      reading: {
        instruction: "اقرأ النص وجاوب: أحمد اسمه إيه وجاي منين؟",
        prompt:
          "¡Hola! Me llamo Ahmed. Soy de Egipto y vivo en El Cairo. ¡Mucho gusto!",
        modelAnswer: "أحمد اسمه أحمد، وجاي من مصر وعايش في القاهرة.",
      },
      writing: {
        instruction: "اكتب ٣ جمل تعرّف فيها بنفسك: اسمك، بلدك، ومكان سكنك.",
        prompt: "Me llamo ___ . Soy de ___ . Vivo en ___ .",
        modelAnswer: "Me llamo Mona. Soy de Egipto. Vivo en Alejandría.",
      },
      listening: {
        instruction: "اسمع الجملة وقول معناها بالعربي:",
        prompt: "¿Cómo te llamas?",
        modelAnswer: "اسمك إيه؟",
      },
      speaking: {
        instruction: "قول بالصوت: اسمي مونا وأنا من إسكندرية.",
        prompt: "Me llamo Mona y vengo de Alejandría.",
        modelAnswer: "Me llamo Mona y vengo de Alejandría.",
      },
    },
  },
};
