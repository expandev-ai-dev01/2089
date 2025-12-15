/**
 * @summary
 * Validation schemas for Input Validation service.
 * Centralizes all Zod validation logic.
 *
 * @module services/inputValidation/inputValidationValidation
 */

import { z } from 'zod';

/**
 * Maximum input length constant
 */
const MAX_INPUT_LENGTH = 1000;

/**
 * Schema for text field validation request
 */
export const textValidationSchema = z.object({
  text: z.string().max(MAX_INPUT_LENGTH),
  currentLength: z.number().int().min(0).max(MAX_INPUT_LENGTH),
});

/**
 * Schema for morse field validation request
 */
export const morseValidationSchema = z.object({
  morseCode: z.string().max(MAX_INPUT_LENGTH),
  currentLength: z.number().int().min(0).max(MAX_INPUT_LENGTH),
});

/**
 * Schema for sequence validation request
 */
export const sequenceValidationSchema = z.object({
  sequence: z.string().max(MAX_INPUT_LENGTH),
});

/**
 * Schema for state update request
 */
export const stateUpdateSchema = z.object({
  componentId: z.enum(['FC-001', 'FC-002', 'FC-003']),
  hasError: z.boolean(),
  errorMessage: z.string(),
  errorPriority: z.number().int().min(1).max(3),
  timestamp: z.number().int().positive(),
});

/**
 * Inferred types from schemas
 */
export type TextValidationInput = z.infer<typeof textValidationSchema>;
export type MorseValidationInput = z.infer<typeof morseValidationSchema>;
export type SequenceValidationInput = z.infer<typeof sequenceValidationSchema>;
export type StateUpdateInput = z.infer<typeof stateUpdateSchema>;
