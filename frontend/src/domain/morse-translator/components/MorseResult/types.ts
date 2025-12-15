export interface MorseResultProps {
  result?: {
    originalText: string;
    normalizedText: string;
    morseCode: string;
    characterCount: number;
  };
  onClear?: () => void;
}
