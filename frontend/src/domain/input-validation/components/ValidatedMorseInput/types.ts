export interface ValidatedMorseInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationError?: (error: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
