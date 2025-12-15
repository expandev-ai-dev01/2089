import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { morseTranslatorService } from '../../services/morseTranslatorService';
import type { MorseDecodingFormOutput } from '../../types/forms';

export const useMorseDecoder = () => {
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

  const { mutateAsync: decode, isPending: isDecoding } = useMutation({
    mutationFn: (data: MorseDecodingFormOutput) => morseTranslatorService.decode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['morse-translator-status'] });
    },
  });

  return {
    systemStatus,
    isLoadingStatus,
    decode,
    isDecoding,
    isSystemReady: systemStatus?.ready ?? false,
  };
};
