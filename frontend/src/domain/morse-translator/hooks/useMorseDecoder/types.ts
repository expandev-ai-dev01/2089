export interface UseMorseDecoderReturn {
  systemStatus?: {
    status: 'inicializando' | 'sucesso' | 'erro_dicionario' | 'erro_normalizacao' | 'erro_critico';
    message: string;
    ready: boolean;
  };
  isLoadingStatus: boolean;
  decode: (data: { morseCode: string }) => Promise<{
    originalMorse: string;
    normalizedMorse: string;
    translatedText: string;
    characterCount: number;
    invalidCodeCount: number;
  }>;
  isDecoding: boolean;
  isSystemReady: boolean;
}
