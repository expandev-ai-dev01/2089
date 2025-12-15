export interface MorseTranslation {
  originalText: string;
  normalizedText: string;
  morseCode: string;
  characterCount: number;
}

export interface SystemStatus {
  status: 'inicializando' | 'sucesso' | 'erro_dicionario' | 'erro_normalizacao' | 'erro_critico';
  message: string;
  ready: boolean;
}
