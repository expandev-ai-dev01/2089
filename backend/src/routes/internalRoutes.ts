/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as initExampleController from '@/api/internal/init-example/controller';
import * as morseTranslatorController from '@/api/internal/morse-translator/controller';
import * as inputValidationController from '@/api/internal/input-validation/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Init-Example routes - /api/internal/init-example
 */
router.get('/init-example', initExampleController.listHandler);
router.post('/init-example', initExampleController.createHandler);
router.get('/init-example/:id', initExampleController.getHandler);
router.put('/init-example/:id', initExampleController.updateHandler);
router.delete('/init-example/:id', initExampleController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Morse Translator routes - /api/internal/morse-translator
 */
router.post('/morse-translator/translate', morseTranslatorController.translateHandler);
router.post('/morse-translator/decode', morseTranslatorController.decodeHandler);
router.get('/morse-translator/status', morseTranslatorController.statusHandler);

/**
 * @rule {be-route-configuration}
 * Input Validation routes - /api/internal/input-validation
 */
router.post('/input-validation/text', inputValidationController.validateTextHandler);
router.post('/input-validation/morse', inputValidationController.validateMorseHandler);
router.post('/input-validation/sequence', inputValidationController.validateSequenceHandler);
router.get('/input-validation/state', inputValidationController.getStateHandler);

export default router;
