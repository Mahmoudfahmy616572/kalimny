/**
 * Ø¨Ù†Ùƒ Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø¨Ø¹Ø¯ ÙƒÙ„ Ø¬Ù„Ø³Ø©. ÙƒÙ„ ÙˆØ­Ø¯Ø© Ù„ÙŠÙ‡Ø§ Ø¨Ù†Ùƒ ÙÙŠÙ‡ BANK_SIZE Ø³Ø¤Ø§Ù„ØŒ
 * ÙˆØ§Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„ÙˆØ§Ø­Ø¯ Ø¨ÙŠØ³Ø­Ø¨ EXAM_LENGTH Ø³Ø¤Ø§Ù„ Ù…Ù†Ù‡ Ø¨Ø§Ù„ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù„ÙŠ ÙÙˆÙ‚.
 */
export type ExamKind = "vocab" | "grammar" | "speaking" | "listening";

export interface ExamQuestion {
  id: string;
  kind: ExamKind;
  /** Ø§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª Ø¨Ø§Ù„Ø¹Ø§Ù…ÙŠØ© Ø§Ù„Ù…ØµØ±ÙŠØ© */
  prompt: string;
  /** Ø§Ù„ÙƒÙ„Ø§Ù… Ø§Ù„Ù„ÙŠ Ø§Ù„Ø·Ø§Ù„Ø¨ Ø¨ÙŠØ³Ù…Ø¹Ù‡ (Ù„Ù„Ø³Ù…Ø¹) Ø£Ùˆ Ø§Ù„Ù‡Ø¯Ù Ø§Ù„Ù„ÙŠ Ø¨ÙŠÙ‚ÙˆÙ„Ù‡ (Ù„Ù„ÙƒÙ„Ø§Ù…) */
  text?: string;
  /** Ø§Ø®ØªÙŠØ§Ø±Ø§Øª (Ù„Ù„Ù…ÙØ±Ø¯Ø§Øª ÙˆØ§Ù„Ù‚ÙˆØ§Ø¹Ø¯ ÙˆØ§Ù„Ø³Ù…Ø¹). Ù…Ø§ ÙÙŠØ´ Ù„Ù„ÙƒÙ„Ø§Ù…. */
  options?: string[];
  /** Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ø§Ù„ØµØ­: Ù…Ù† optionsØŒ Ø£Ùˆ Ø§Ù„Ø¬Ù…Ù„Ø© Ø§Ù„Ù…Ø³ØªÙ‡Ø¯ÙØ© Ù„Ù„ÙƒÙ„Ø§Ù… */
  answer: string;
  /** 1 Ø³Ù‡Ù„ØŒ 2 Ù…ØªÙˆØ³Ø·ØŒ 3 ØµØ¹Ø¨. Ø¨ÙŠØªØ­Ø¯Ø¯ ÙˆÙ‚Øª Ø§Ù„ØªÙˆÙ„ÙŠØ¯. */
  difficulty?: 1 | 2 | 3;
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

