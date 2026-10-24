import type { ExamQuestion } from "../exams";
import { EXAM_BANK_EN } from "./en";
import { EXAM_BANK_FR } from "./fr";
import { EXAM_BANK_ES } from "./es";
import { EXAM_BANK_DE } from "./de";

export const EXAM_BANKS: Record<string, Record<string, ExamQuestion[]>> = {
  en: EXAM_BANK_EN,
  fr: EXAM_BANK_FR,
  es: EXAM_BANK_ES,
  de: EXAM_BANK_DE,
};
