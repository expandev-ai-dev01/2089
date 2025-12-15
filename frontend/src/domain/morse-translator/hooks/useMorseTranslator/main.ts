import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { morseTranslatorService } from '../../services/morseTranslatorService';
import type { MorseTranslationFormOutput } from '../../types/forms';

export const useMorseTranslator = () => {
  const queryClient = useQueryClient();

  const { data: systemStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: ['morse-translator-status'],
    queryFn: () => morseTranslatorService.getSystemStatus(),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === 'inicializando') return 2000;
      if (status === 'erro_dicionario' || status === 'erro_normalizacao') return 5000;
      return false;
    },
  });

  const { mutateAsync: translate, isPending: isTranslating } = useMutation({
    mutationFn: (data: MorseTranslationFormOutput) => morseTranslatorService.translate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['morse-translator-status'] });
    },
  });

  return {
    systemStatus,
    isLoadingStatus,
    translate,
    isTranslating,
    isSystemReady: systemStatus?.ready ?? false,
  };
};
