import { useMutation } from '@tanstack/react-query';
import { inputValidationService } from '../../services/inputValidationService';
import type { SequenceValidationOutput } from '../../types/forms';

export const useSequenceValidation = () => {
  const { mutateAsync: validateSequence, isPending: isValidating } = useMutation({
    mutationFn: (data: SequenceValidationOutput) => inputValidationService.validateSequence(data),
  });

  return {
    validateSequence: (sequence: string) => validateSequence({ sequence }),
    isValidating,
  };
};
