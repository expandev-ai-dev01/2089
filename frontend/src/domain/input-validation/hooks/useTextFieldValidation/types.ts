import type { ValidationResult } from '../../types/models';

export interface UseTextFieldValidationReturn {
  validateText: (text: string, currentLength: number) => Promise<ValidationResult>;
  isValidating: boolean;
}
