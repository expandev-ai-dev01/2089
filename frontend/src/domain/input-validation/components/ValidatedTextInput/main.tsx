import { useState, useEffect, useCallback, useRef } from 'react';
import { Textarea } from '@/core/components/textarea';
import { Label } from '@/core/components/label';
import { cn } from '@/core/lib/utils';
import { useTextFieldValidation } from '../../hooks/useTextFieldValidation';
import type { ValidatedTextInputProps } from './types';
import { toast } from 'sonner';

function ValidatedTextInput({
  value,
  onChange,
  onValidationError,
  placeholder = 'Digite seu texto aqui...',
  disabled = false,
  className,
}: ValidatedTextInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [characterCount, setCharacterCount] = useState(value.length);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const { validateText } = useTextFieldValidation();
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalValue(value);
    setCharacterCount(value.length);
  }, [value]);

  const clearErrorTimeout = useCallback(() => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }
  }, []);

  const showErrorFeedback = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setShowError(true);
      onValidationError?.(message);

      clearErrorTimeout();
      errorTimeoutRef.current = setTimeout(() => {
        setShowError(false);
        setErrorMessage(null);
        onValidationError?.(null);
      }, 3000);
    },
    [onValidationError, clearErrorTimeout]
  );

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newLength = newValue.length;

    if (newLength > 1000) {
      showErrorFeedback('Limite máximo de 1000 caracteres atingido');
      return;
    }

    const lastChar = newValue[newLength - 1];
    if (lastChar && !/^[a-zA-Z0-9\s.,?'!\/()&:;=+\-_"$@]$/.test(lastChar)) {
      showErrorFeedback('Este caractere não é suportado para tradução Morse');
      return;
    }

    try {
      const result = await validateText(newValue, newLength);

      if (!result.valid && result.errorMessage) {
        showErrorFeedback(result.errorMessage);
        return;
      }

      setLocalValue(newValue);
      setCharacterCount(newLength);
      onChange(newValue);
      clearErrorTimeout();
      setShowError(false);
      setErrorMessage(null);
      onValidationError?.(null);
    } catch (error) {
      if (error instanceof Error) {
        showErrorFeedback(error.message);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.length > 1000) {
      e.preventDefault();
      const truncatedText = pastedText.substring(0, 1000);
      setLocalValue(truncatedText);
      setCharacterCount(1000);
      onChange(truncatedText);
      toast.warning('Texto colado foi reduzido para 1000 caracteres');
    }
  };

  useEffect(() => {
    return () => {
      clearErrorTimeout();
    };
  }, [clearErrorTimeout]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="validated-text-input">Digite o texto para traduzir</Label>
        <span
          className={cn(
            'text-sm',
            characterCount > 950 ? 'text-destructive font-medium' : 'text-muted-foreground'
          )}
        >
          {characterCount}/1000
        </span>
      </div>
      <Textarea
        id="validated-text-input"
        value={localValue}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'min-h-[120px] resize-none font-mono transition-all',
          showError && 'border-destructive ring-destructive/20 ring-2',
          className
        )}
        aria-invalid={showError}
      />
      {showError && errorMessage && (
        <p className="text-destructive animate-in fade-in-0 slide-in-from-top-1 text-sm font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export { ValidatedTextInput };
