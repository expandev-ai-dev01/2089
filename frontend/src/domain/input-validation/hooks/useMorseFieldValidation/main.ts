import { useMutation } from '@tanstack/react-query';
import { inputValidationService } from '../../services/inputValidationService';
import type { MorseFieldOutput } from '../../types/forms';

export const useMorseFieldValidation = () => {
  const { mutateAsync: validateMorse, isPending: isValidating } = useMutation({
    mutationFn: (data: MorseFieldOutput) => inputValidationService.validateMorseField(data),
  });

  return {
    validateMorse: (morseCode: string, currentLength: number) =>
      validateMorse({ morseCode, currentLength }),
    isValidating,
  };
};
