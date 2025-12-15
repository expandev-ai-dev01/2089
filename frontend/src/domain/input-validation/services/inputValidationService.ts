/**
 * @service InputValidationService
 * @domain input-validation
 * @type REST
 */

import { authenticatedClient } from '@/core/lib/api';
import type { ValidationResult, ValidationState } from '../types/models';
import type {
  ValidationFieldOutput,
  MorseFieldOutput,
  SequenceValidationOutput,
} from '../types/forms';

export const inputValidationService = {
  async validateTextField(data: ValidationFieldOutput): Promise<ValidationResult> {
    const response = await authenticatedClient.post<{ success: boolean; data: ValidationResult }>(
      '/input-validation/text',
      data
    );
    return response.data.data;
  },

  async validateMorseField(data: MorseFieldOutput): Promise<ValidationResult> {
    const response = await authenticatedClient.post<{ success: boolean; data: ValidationResult }>(
      '/input-validation/morse',
      data
    );
    return response.data.data;
  },

  async validateSequence(data: SequenceValidationOutput): Promise<ValidationResult> {
    const response = await authenticatedClient.post<{ success: boolean; data: ValidationResult }>(
      '/input-validation/sequence',
      data
    );
    return response.data.data;
  },

  async getValidationState(): Promise<ValidationState> {
    const response = await authenticatedClient.get<{ success: boolean; data: ValidationState }>(
      '/input-validation/state'
    );
    return response.data.data;
  },
};
