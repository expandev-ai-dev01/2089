export interface MorseTranslatorFormProps {
  onTranslationComplete?: (result: {
    originalText: string;
    normalizedText: string;
    morseCode: string;
    characterCount: number;
  }) => void;
}
