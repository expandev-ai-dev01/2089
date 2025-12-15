/**
 * @summary
 * Business logic for Morse Translator.
 * Handles text to Morse code translation and Morse to text translation
 * with normalization and validation.
 *
 * @module services/morseTranslator/morseTranslatorService
 */

import { ServiceError } from '@/utils';
import {
  MorseTranslationResponse,
  MorseDecodeResponse,
  SystemStatus,
} from './morseTranslatorTypes';
import { translateTextSchema, translateMorseSchema } from './morseTranslatorValidation';
import {
  MORSE_DICTIONARY,
  NORMALIZATION_MAP,
  SUPPORTED_CHARACTERS,
} from '@/constants/morseTranslator';

/**
 * System initialization status
 */
let systemStatus: SystemStatus = {
  status: 'inicializando',
  message: 'Inicializando sistema...',
  ready: false,
};

/**
 * Reverse Morse dictionary for decoding
 */
let REVERSE_MORSE_DICTIONARY: Record<string, string> = {};

/**
 * Fallback dictionary with basic A-Z and 0-9 mappings
 */
const FALLBACK_DICTIONARY: Record<string, string> = {
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
};

/**
 * Reverse fallback dictionary for decoding
 */
let REVERSE_FALLBACK_DICTIONARY: Record<string, string> = {};

/**
 * Initialize system components
 */
function initializeSystem(): void {
  try {
    // Validate dictionary integrity
    if (!MORSE_DICTIONARY || Object.keys(MORSE_DICTIONARY).length === 0) {
      throw new Error('Dicionário Morse inválido');
    }

    // Validate normalization map
    if (!NORMALIZATION_MAP || Object.keys(NORMALIZATION_MAP).length === 0) {
      throw new Error('Mapa de normalização inválido');
    }

    // Validate supported characters list
    if (!SUPPORTED_CHARACTERS || SUPPORTED_CHARACTERS.length === 0) {
      throw new Error('Lista de caracteres suportados inválida');
    }

    // Build reverse dictionaries
    REVERSE_MORSE_DICTIONARY = {};
    for (const [char, morse] of Object.entries(MORSE_DICTIONARY)) {
      REVERSE_MORSE_DICTIONARY[morse] = char;
    }

    REVERSE_FALLBACK_DICTIONARY = {};
    for (const [char, morse] of Object.entries(FALLBACK_DICTIONARY)) {
      REVERSE_FALLBACK_DICTIONARY[morse] = char;
    }

    systemStatus = {
      status: 'sucesso',
      message: 'Sistema inicializado com sucesso',
      ready: true,
    };
  } catch (error: any) {
    systemStatus = {
      status: 'erro_critico',
      message: error.message || 'Erro crítico na inicialização',
      ready: false,
    };
  }
}

// Initialize on module load
initializeSystem();

/**
 * @summary
 * Normalizes accented characters to ASCII equivalents.
 *
 * @function normalizeText
 * @module services/morseTranslator
 *
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 *
 * @example
 * const normalized = normalizeText('Olá Mundo!');
 * // Returns: 'OLA MUNDO!'
 */
function normalizeText(text: string): string {
  let normalized = text.toUpperCase();

  // Apply normalization map
  for (const [accented, plain] of Object.entries(NORMALIZATION_MAP)) {
    normalized = normalized.replace(new RegExp(accented, 'g'), plain);
  }

  return normalized;
}

/**
 * @summary
 * Validates that all characters in text are supported.
 *
 * @function validateCharacters
 * @module services/morseTranslator
 *
 * @param {string} text - Text to validate
 * @throws {ServiceError} When unsupported character is found
 *
 * @example
 * validateCharacters('HELLO WORLD');
 * // No error thrown
 *
 * validateCharacters('HELLO 世界');
 * // Throws ServiceError: 'Caractere 世 não é suportado pelo sistema'
 */
function validateCharacters(text: string): void {
  for (const char of text) {
    if (char !== ' ' && !SUPPORTED_CHARACTERS.includes(char)) {
      throw new ServiceError(
        'VALIDATION_ERROR',
        `Caractere ${char} não é suportado pelo sistema`,
        400
      );
    }
  }
}

/**
 * @summary
 * Translates normalized text to Morse code.
 *
 * @function translateToMorse
 * @module services/morseTranslator
 *
 * @param {string} text - Normalized text to translate
 * @returns {string} Morse code translation
 *
 * @example
 * const morse = translateToMorse('HELLO WORLD');
 * // Returns: '.... . .-.. .-.. --- | .-- --- .-. .-.. -..''
 */
function translateToMorse(text: string): string {
  // Normalize multiple spaces to single space
  const cleanedText = text.replace(/\s+/g, ' ').trim();

  if (!cleanedText) {
    throw new ServiceError('VALIDATION_ERROR', 'Nenhum conteúdo válido para traduzir', 400);
  }

  const words = cleanedText.split(' ');
  const morseWords: string[] = [];

  for (const word of words) {
    const morseLetters: string[] = [];

    for (const char of word) {
      const morseCode = MORSE_DICTIONARY[char];

      if (!morseCode) {
        throw new ServiceError(
          'TRANSLATION_ERROR',
          `Caractere ${char} não possui equivalente em código Morse`,
          400
        );
      }

      morseLetters.push(morseCode);
    }

    morseWords.push(morseLetters.join(' '));
  }

  return morseWords.join(' | ');
}

/**
 * @summary
 * Normalizes Morse code input by cleaning invalid characters and formatting.
 *
 * @function normalizeMorseCode
 * @module services/morseTranslator
 *
 * @param {string} morse - Morse code to normalize
 * @returns {string} Normalized Morse code
 *
 * @example
 * const normalized = normalizeMorseCode('... --- ...  |  .... . .-.. .-.. ---');
 * // Returns: '... --- ... | .... . .-.. .-.. ---'
 */
function normalizeMorseCode(morse: string): string {
  // Remove invalid characters (keep only dots, dashes, spaces, and pipes)
  let normalized = morse.replace(/[^.\-\s|]/g, '');

  // Normalize multiple spaces to single space
  normalized = normalized.replace(/\s+/g, ' ');

  // Fix malformed pipes: '|' -> ' | ', '| |' -> ' | '
  normalized = normalized.replace(/\s*\|\s*/g, ' | ');

  // Normalize multiple consecutive pipes to single pipe
  normalized = normalized.replace(/(\s\|\s)+/g, ' | ');

  // Remove leading/trailing spaces and pipes
  normalized = normalized.trim().replace(/^\|\s*|\s*\|$/g, '');

  return normalized;
}

/**
 * @summary
 * Translates Morse code to text.
 *
 * @function translateFromMorse
 * @module services/morseTranslator
 *
 * @param {string} morse - Morse code to translate
 * @returns {{ text: string; invalidCount: number }} Translation result with invalid code count
 *
 * @example
 * const result = translateFromMorse('.... . .-.. .-.. --- | .-- --- .-. .-.. -..');
 * // Returns: { text: 'HELLO WORLD', invalidCount: 0 }
 */
function translateFromMorse(morse: string): { text: string; invalidCount: number } {
  if (!morse || morse.trim() === '') {
    return { text: '', invalidCount: 0 };
  }

  const words = morse.split(' | ');
  const translatedWords: string[] = [];
  let invalidCount = 0;

  for (const word of words) {
    if (!word.trim()) {
      continue;
    }

    const codes = word.split(' ').filter((code) => code.trim() !== '');
    const translatedChars: string[] = [];

    for (const code of codes) {
      // Try main dictionary first
      let char = REVERSE_MORSE_DICTIONARY[code];

      // If not found, try fallback dictionary
      if (!char) {
        char = REVERSE_FALLBACK_DICTIONARY[code];
      }

      // If still not found, mark as invalid
      if (!char) {
        translatedChars.push('[?]');
        invalidCount++;
      } else {
        translatedChars.push(char);
      }
    }

    if (translatedChars.length > 0) {
      translatedWords.push(translatedChars.join(''));
    }
  }

  return {
    text: translatedWords.join(' '),
    invalidCount,
  };
}

/**
 * @summary
 * Gets current system initialization status.
 *
 * @function getSystemStatus
 * @module services/morseTranslator
 *
 * @returns {Promise<SystemStatus>} Current system status
 *
 * @example
 * const status = await getSystemStatus();
 * // Returns: { status: 'sucesso', message: 'Sistema inicializado com sucesso', ready: true }
 */
export async function getSystemStatus(): Promise<SystemStatus> {
  return systemStatus;
}

/**
 * @summary
 * Translates text to Morse code with full validation and normalization.
 *
 * @function translateTextToMorse
 * @module services/morseTranslator
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<MorseTranslationResponse>} Translation result with metadata
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation or contains unsupported characters
 * @throws {ServiceError} SYSTEM_NOT_READY (503) - When system is not initialized
 * @throws {ServiceError} TRANSLATION_ERROR (400) - When translation fails
 *
 * @example
 * const result = await translateTextToMorse({ text: 'Hello World' });
 * // Returns: {
 * //   originalText: 'Hello World',
 * //   normalizedText: 'HELLO WORLD',
 * //   morseCode: '.... . .-.. .-.. --- | .-- --- .-. .-.. -..',
 * //   characterCount: 11
 * // }
 */
export async function translateTextToMorse(body: unknown): Promise<MorseTranslationResponse> {
  // Check system status
  if (!systemStatus.ready) {
    throw new ServiceError('SYSTEM_NOT_READY', 'Aguarde a inicialização do sistema', 503);
  }

  // Validate request body
  const validation = translateTextSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const { text } = validation.data;

  // Normalize text
  const normalizedText = normalizeText(text);

  // Validate characters
  validateCharacters(normalizedText);

  // Translate to Morse
  const morseCode = translateToMorse(normalizedText);

  return {
    originalText: text,
    normalizedText,
    morseCode,
    characterCount: text.length,
  };
}

/**
 * @summary
 * Translates Morse code to text with full validation and normalization.
 *
 * @function translateMorseToText
 * @module services/morseTranslator
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<MorseDecodeResponse>} Translation result with metadata
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 * @throws {ServiceError} SYSTEM_NOT_READY (503) - When system is not initialized
 *
 * @example
 * const result = await translateMorseToText({ morseCode: '... --- ...' });
 * // Returns: {
 * //   originalMorse: '... --- ...',
 * //   normalizedMorse: '... --- ...',
 * //   translatedText: 'SOS',
 * //   characterCount: 11,
 * //   invalidCodeCount: 0
 * // }
 */
export async function translateMorseToText(body: unknown): Promise<MorseDecodeResponse> {
  // Check system status
  if (!systemStatus.ready) {
    throw new ServiceError('SYSTEM_NOT_READY', 'Aguarde a inicialização do sistema', 503);
  }

  // Validate request body
  const validation = translateMorseSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const { morseCode } = validation.data;

  // Normalize Morse code
  const normalizedMorse = normalizeMorseCode(morseCode);

  // Translate from Morse
  const { text, invalidCount } = translateFromMorse(normalizedMorse);

  return {
    originalMorse: morseCode,
    normalizedMorse,
    translatedText: text,
    characterCount: morseCode.length,
    invalidCodeCount: invalidCount,
  };
}
