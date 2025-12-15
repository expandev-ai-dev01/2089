/**
 * @summary
 * API controller for Input Validation.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/input-validation/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  validateTextField,
  validateMorseField,
  validateMorseSequence,
  getValidationState,
} from '@/services/inputValidation';

/**
 * @api {post} /api/internal/input-validation/text Validate Text Field
 * @apiName ValidateTextField
 * @apiGroup InputValidation
 *
 * @apiBody {String} text Text to validate (max 1000 chars)
 * @apiBody {Number} currentLength Current character count
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Boolean} data.valid Whether input is valid
 * @apiSuccess {String|null} data.errorCode Error code if validation failed
 * @apiSuccess {String|null} data.errorMessage Error message if validation failed
 * @apiSuccess {Number|null} data.errorPriority Error priority if validation failed
 * @apiSuccess {Number} data.timestamp Timestamp of validation
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function validateTextHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await validateTextField(req.body);
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
 * @api {post} /api/internal/input-validation/morse Validate Morse Field
 * @apiName ValidateMorseField
 * @apiGroup InputValidation
 *
 * @apiBody {String} morseCode Morse code to validate (max 1000 chars)
 * @apiBody {Number} currentLength Current character count
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Boolean} data.valid Whether input is valid
 * @apiSuccess {String|null} data.errorCode Error code if validation failed
 * @apiSuccess {String|null} data.errorMessage Error message if validation failed
 * @apiSuccess {Number|null} data.errorPriority Error priority if validation failed
 * @apiSuccess {Number} data.timestamp Timestamp of validation
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function validateMorseHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await validateMorseField(req.body);
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
 * @api {post} /api/internal/input-validation/sequence Validate Morse Sequence
 * @apiName ValidateMorseSequence
 * @apiGroup InputValidation
 *
 * @apiBody {String} sequence Morse sequence to validate (max 1000 chars)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Boolean} data.valid Whether sequence is valid
 * @apiSuccess {String|null} data.errorCode Error code if validation failed
 * @apiSuccess {String|null} data.errorMessage Error message if validation failed
 * @apiSuccess {Number|null} data.errorPriority Error priority if validation failed
 * @apiSuccess {Number} data.timestamp Timestamp of validation
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function validateSequenceHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await validateMorseSequence(req.body);
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
 * @api {get} /api/internal/input-validation/state Get Validation State
 * @apiName GetValidationState
 * @apiGroup InputValidation
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data.componentes Component validation states
 * @apiSuccess {Object} data.componentes.FC-001 Text field state
 * @apiSuccess {Boolean} data.componentes.FC-001.ativo Whether text field has active error
 * @apiSuccess {String} data.componentes.FC-001.ultimo_erro Last error message
 * @apiSuccess {Number} data.componentes.FC-001.timestamp Timestamp of last error
 * @apiSuccess {Object} data.componentes.FC-002 Morse field state
 * @apiSuccess {Boolean} data.componentes.FC-002.ativo Whether morse field has active error
 * @apiSuccess {String} data.componentes.FC-002.ultimo_erro Last error message
 * @apiSuccess {Number} data.componentes.FC-002.timestamp Timestamp of last error
 * @apiSuccess {Object} data.componentes.FC-003 Sequence validation state
 * @apiSuccess {Boolean} data.componentes.FC-003.ativo Whether sequence has active error
 * @apiSuccess {String} data.componentes.FC-003.ultimo_erro Last error message
 * @apiSuccess {Number} data.componentes.FC-003.timestamp Timestamp of last error
 * @apiSuccess {Object|null} data.erro_ativo Currently active error
 * @apiSuccess {String} data.erro_ativo.componente_id Component ID
 * @apiSuccess {String} data.erro_ativo.tipo Error type
 * @apiSuccess {Number} data.erro_ativo.prioridade Error priority
 * @apiSuccess {Number} data.erro_ativo.timestamp Error timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code
 * @apiError {String} error.message Error message
 */
export async function getStateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await getValidationState();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
