export const LANGUAGES = [
  {
    code: "en",
    nameAr: "الإنجليزية",
    nameEn: "English",
    locale: "en-US",
    flag: "🇬🇧",
  },
  {
    code: "fr",
    nameAr: "الفرنسية",
    nameEn: "French",
    locale: "fr-FR",
    flag: "🇫🇷",
  },
  {
    code: "es",
    nameAr: "الإسبانية",
    nameEn: "Spanish",
    locale: "es-ES",
    flag: "🇪🇸",
  },
  {
    code: "de",
    nameAr: "الألمانية",
    nameEn: "German",
    locale: "de-DE",
    flag: "🇩🇪",
  },
] as const;

export type Language = (typeof LANGUAGES)[number];
export type LanguageCode = Language["code"];

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export function getLanguage(code: LanguageCode): Language {
  const found = LANGUAGES.find((language) => language.code === code);
  if (!found) {
    throw new Error(`Unsupported language code: ${code}`);
  }
  return found;
}
