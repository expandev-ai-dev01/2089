/**
 * @summary
 * Validation schemas for Morse Translator service.
 * Centralizes all Zod validation logic.
 *
 * @module services/morseTranslator/morseTranslatorValidation
 */

import { z } from 'zod';

/**
 * Maximum text length constant
 */
const MAX_TEXT_LENGTH = 1000;

/**
 * Schema for text to Morse translation request
 */
export const translateTextSchema = z.object({
  text: z
    .string()
    .min(1, 'Digite um texto para traduzir')
    .max(MAX_TEXT_LENGTH, `Texto excede o limite de ${MAX_TEXT_LENGTH} caracteres`),
});

/**
 * Inferred types from schemas
 */
export type TranslateTextInput = z.infer<typeof translateTextSchema>;
