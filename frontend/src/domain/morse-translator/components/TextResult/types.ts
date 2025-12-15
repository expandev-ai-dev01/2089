export interface TextResultProps {
  result?: {
    originalMorse: string;
    normalizedMorse: string;
    translatedText: string;
    characterCount: number;
    invalidCodeCount: number;
  };
  onClear?: () => void;
}
