import type { ValidationResult } from '../../types/models';

export interface UseMorseFieldValidationReturn {
  validateMorse: (morseCode: string, currentLength: number) => Promise<ValidationResult>;
  isValidating: boolean;
}
