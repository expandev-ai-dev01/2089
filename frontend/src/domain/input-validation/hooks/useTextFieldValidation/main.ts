import { useMutation } from '@tanstack/react-query';
import { inputValidationService } from '../../services/inputValidationService';
import type { ValidationFieldOutput } from '../../types/forms';

export const useTextFieldValidation = () => {
  const { mutateAsync: validateText, isPending: isValidating } = useMutation({
    mutationFn: (data: ValidationFieldOutput) => inputValidationService.validateTextField(data),
  });

  return {
    validateText: (text: string, currentLength: number) => validateText({ text, currentLength }),
    isValidating,
  };
};
