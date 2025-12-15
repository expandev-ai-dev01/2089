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
router.get('/morse-translator/status', morseTranslatorController.statusHandler);

export default router;
