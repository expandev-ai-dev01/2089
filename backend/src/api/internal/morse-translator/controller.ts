/**
 * @summary
 * API controller for Morse Translator.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/morse-translator/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { translateTextToMorse, getSystemStatus } from '@/services/morseTranslator';

/**
 * @api {post} /api/internal/morse-translator/translate Translate Text to Morse
 * @apiName TranslateTextToMorse
 * @apiGroup MorseTranslator
 *
 * @apiBody {String} text Text to translate (1-1000 chars)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.originalText Original input text
 * @apiSuccess {String} data.normalizedText Text after normalization
 * @apiSuccess {String} data.morseCode Translated Morse code
 * @apiSuccess {Number} data.characterCount Number of characters in original text
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | SYSTEM_NOT_READY | TRANSLATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function translateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await translateTextToMorse(req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/morse-translator/status Get System Status
 * @apiName GetSystemStatus
 * @apiGroup MorseTranslator
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.status Current status (inicializando | sucesso | erro_dicionario | erro_normalizacao | erro_critico)
 * @apiSuccess {String} data.message Status message
 * @apiSuccess {Boolean} data.ready Whether system is ready for use
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code
 * @apiError {String} error.message Error message
 */
export async function statusHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await getSystemStatus();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
