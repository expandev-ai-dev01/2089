export interface UseMorseTranslatorReturn {
  systemStatus?: {
    status: 'inicializando' | 'sucesso' | 'erro_dicionario' | 'erro_normalizacao' | 'erro_critico';
    message: string;
    ready: boolean;
  };
  isLoadingStatus: boolean;
  translate: (data: { text: string }) => Promise<{
    originalText: string;
    normalizedText: string;
    morseCode: string;
    characterCount: number;
  }>;
  isTranslating: boolean;
  isSystemReady: boolean;
}
