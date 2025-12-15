import type { ValidationState } from '../../types/models';

export interface UseValidationStateReturn {
  validationState?: ValidationState;
  isLoading: boolean;
  refetch: () => void;
}
