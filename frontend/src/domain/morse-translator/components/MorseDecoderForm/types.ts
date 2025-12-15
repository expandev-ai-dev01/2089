export interface MorseDecoderFormProps {
  onDecodingComplete?: (result: {
    originalMorse: string;
    normalizedMorse: string;
    translatedText: string;
    characterCount: number;
    invalidCodeCount: number;
  }) => void;
}
