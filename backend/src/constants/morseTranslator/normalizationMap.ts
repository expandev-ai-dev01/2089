/**
 * @summary
 * Character normalization map for accented characters.
 * Maps accented characters to their ASCII equivalents.
 *
 * @module constants/morseTranslator/normalizationMap
 */

/**
 * @interface NormalizationMap
 * @description Complete mapping of accented characters to ASCII equivalents
 *
 * Supports Portuguese and common European accents
 */
export const NORMALIZATION_MAP: Record<string, string> = {
  // Lowercase vowels with accents
  á: 'A',
  à: 'A',
  â: 'A',
  ã: 'A',
  ä: 'A',
  é: 'E',
  è: 'E',
  ê: 'E',
  ë: 'E',
  í: 'I',
  ì: 'I',
  î: 'I',
  ï: 'I',
  ó: 'O',
  ò: 'O',
  ô: 'O',
  õ: 'O',
  ö: 'O',
  ú: 'U',
  ù: 'U',
  û: 'U',
  ü: 'U',

  // Uppercase vowels with accents
  Á: 'A',
  À: 'A',
  Â: 'A',
  Ã: 'A',
  Ä: 'A',
  É: 'E',
  È: 'E',
  Ê: 'E',
  Ë: 'E',
  Í: 'I',
  Ì: 'I',
  Î: 'I',
  Ï: 'I',
  Ó: 'O',
  Ò: 'O',
  Ô: 'O',
  Õ: 'O',
  Ö: 'O',
  Ú: 'U',
  Ù: 'U',
  Û: 'U',
  Ü: 'U',

  // Special consonants
  ç: 'C',
  Ç: 'C',
  ñ: 'N',
  Ñ: 'N',
} as const;

/**
 * Type representing the NORMALIZATION_MAP constant
 */
export type NormalizationMapType = typeof NORMALIZATION_MAP;

/**
 * Type representing valid accented characters
 */
export type AccentedCharacter = keyof typeof NORMALIZATION_MAP;
