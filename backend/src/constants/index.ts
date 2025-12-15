/**
 * @summary
 * Centralized constants exports.
 * Provides single import point for all application constants.
 *
 * @module constants
 */

/**
 * InitExample constants
 */
export {
  INIT_EXAMPLE_DEFAULTS,
  INIT_EXAMPLE_PRIORITIES,
  INIT_EXAMPLE_LIMITS,
  type InitExampleDefaultsType,
  type InitExamplePrioritiesType,
  type InitExampleLimitsType,
  type InitExamplePriority,
} from './initExample';

/**
 * Morse Translator constants
 */
export {
  MORSE_DICTIONARY,
  NORMALIZATION_MAP,
  SUPPORTED_CHARACTERS,
  type MorseDictionaryType,
  type MorseCharacter,
  type NormalizationMapType,
  type AccentedCharacter,
  type SupportedCharactersType,
} from './morseTranslator';
