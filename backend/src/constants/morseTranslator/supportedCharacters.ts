/**
 * @summary
 * List of all supported characters for Morse translation.
 * Consolidates dictionary characters and normalizable accents.
 *
 * @module constants/morseTranslator/supportedCharacters
 */

import { MORSE_DICTIONARY } from './morseDictionary';
import { NORMALIZATION_MAP } from './normalizationMap';

/**
 * @constant SUPPORTED_CHARACTERS
 * @description Complete list of characters accepted by the system
 *
 * Includes:
 * - All characters from MORSE_DICTIONARY (A-Z, 0-9, special chars)
 * - All accented characters from NORMALIZATION_MAP
 * - Space character (word separator)
 */
export const SUPPORTED_CHARACTERS: readonly string[] = [
  ...Object.keys(MORSE_DICTIONARY),
  ...Object.keys(NORMALIZATION_MAP),
  ' ', // Space for word separation
] as const;

/**
 * Type representing the SUPPORTED_CHARACTERS constant
 */
export type SupportedCharactersType = typeof SUPPORTED_CHARACTERS;
