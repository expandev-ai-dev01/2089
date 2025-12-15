import type { ValidationResult } from '../../types/models';

export interface UseSequenceValidationReturn {
  validateSequence: (sequence: string) => Promise<ValidationResult>;
  isValidating: boolean;
}
