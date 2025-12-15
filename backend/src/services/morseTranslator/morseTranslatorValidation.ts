/**
 * @summary
 * Validation schemas for Morse Translator service.
 * Centralizes all Zod validation logic.
 *
 * @module services/morseTranslator/morseTranslatorValidation
 */

import { z } from 'zod';

/**
 * Maximum input length constant
 */
const MAX_INPUT_LENGTH = 1000;

/**
 * Schema for text to Morse translation request
 */
export const translateTextSchema = z.object({
  text: z
    .string()
    .min(1, 'Digite um texto para traduzir')
    .max(MAX_INPUT_LENGTH, `Texto excede o limite de ${MAX_INPUT_LENGTH} caracteres`),
});

/**
 * Schema for Morse to text translation request
 */
export const translateMorseSchema = z.object({
  morseCode: z
    .string()
    .min(1, 'Digite um código Morse para traduzir')
    .max(MAX_INPUT_LENGTH, `Código Morse excede o limite de ${MAX_INPUT_LENGTH} caracteres`),
});

/**
 * Inferred types from schemas
 */
export type TranslateTextInput = z.infer<typeof translateTextSchema>;
export type TranslateMorseInput = z.infer<typeof translateMorseSchema>;
