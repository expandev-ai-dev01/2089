/**
 * @summary
 * Type definitions for Morse Translator service.
 *
 * @module services/morseTranslator/morseTranslatorTypes
 */

/**
 * @interface MorseTranslationRequest
 * @description Request payload for text to Morse translation
 *
 * @property {string} text - Text to translate (max 1000 characters)
 */
export interface MorseTranslationRequest {
  text: string;
}

/**
 * @interface MorseTranslationResponse
 * @description Response structure for Morse translation
 *
 * @property {string} originalText - Original input text
 * @property {string} normalizedText - Text after normalization
 * @property {string} morseCode - Translated Morse code
 * @property {number} characterCount - Number of characters in original text
 */
export interface MorseTranslationResponse {
  originalText: string;
  normalizedText: string;
  morseCode: string;
  characterCount: number;
}

/**
 * @interface MorseDecodeRequest
 * @description Request payload for Morse to text translation
 *
 * @property {string} morseCode - Morse code to translate (max 1000 characters)
 */
export interface MorseDecodeRequest {
  morseCode: string;
}

/**
 * @interface MorseDecodeResponse
 * @description Response structure for Morse decoding
 *
 * @property {string} originalMorse - Original input Morse code
 * @property {string} normalizedMorse - Morse code after normalization
 * @property {string} translatedText - Translated text
 * @property {number} characterCount - Number of characters in Morse code
 * @property {number} invalidCodeCount - Number of invalid codes found
 */
export interface MorseDecodeResponse {
  originalMorse: string;
  normalizedMorse: string;
  translatedText: string;
  characterCount: number;
  invalidCodeCount: number;
}

/**
 * @interface SystemStatus
 * @description System initialization status
 *
 * @property {string} status - Current status (inicializando | sucesso | erro_dicionario | erro_normalizacao | erro_critico)
 * @property {string} message - Status message
 * @property {boolean} ready - Whether system is ready for use
 */
export interface SystemStatus {
  status: 'inicializando' | 'sucesso' | 'erro_dicionario' | 'erro_normalizacao' | 'erro_critico';
  message: string;
  ready: boolean;
}
