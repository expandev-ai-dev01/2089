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
