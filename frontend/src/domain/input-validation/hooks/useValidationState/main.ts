import { useQuery } from '@tanstack/react-query';
import { inputValidationService } from '../../services/inputValidationService';

export const useValidationState = () => {
  const {
    data: validationState,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['validation-state'],
    queryFn: () => inputValidationService.getValidationState(),
    refetchInterval: false,
  });

  return {
    validationState,
    isLoading,
    refetch,
  };
};
