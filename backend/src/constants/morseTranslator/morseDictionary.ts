/**
 * @summary
 * Complete Morse code dictionary following ITU-R M.1677-1 standard.
 * Maps characters to their Morse code equivalents.
 *
 * @module constants/morseTranslator/morseDictionary
 */

/**
 * @interface MorseDictionary
 * @description Complete mapping of characters to Morse code patterns
 *
 * Standard: ITU-R M.1677-1
 * Format: . (dot/dit) and - (dash/dah)
 */
export const MORSE_DICTIONARY: Record<string, string> = {
  // Letters A-Z
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',

  // Numbers 0-9
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',

  // Special characters
  ',': '--..--',
  '.': '.-.-.-',
  '?': '..--..',
  '!': '-.-.--',
  ':': '---...',
  ';': '-.-.-.',
  '(': '-.--.',
  ')': '-.--.-',
  '-': '-....-',
  '/': '-..-.',
  '"': '.-..-.',
  "'": '.----.',
  '@': '.--.-.',
  '=': '-...-',
  '+': '.-.-.',
} as const;

/**
 * Type representing the MORSE_DICTIONARY constant
 */
export type MorseDictionaryType = typeof MORSE_DICTIONARY;

/**
 * Type representing valid Morse code characters
 */
export type MorseCharacter = keyof typeof MORSE_DICTIONARY;
