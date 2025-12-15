import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { morseTranslationSchema } from '../../validations/morse-translation';
import type { MorseTranslationFormInput, MorseTranslationFormOutput } from '../../types/forms';
import type { MorseTranslatorFormProps } from './types';
import { useMorseTranslator } from '../../hooks/useMorseTranslator';
import { Button } from '@/core/components/button';
import { Alert, AlertDescription } from '@/core/components/alert';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { ValidatedTextInput } from '@/domain/input-validation/components/ValidatedTextInput';

function MorseTranslatorForm({ onTranslationComplete }: MorseTranslatorFormProps) {
  const { systemStatus, isLoadingStatus, translate, isTranslating, isSystemReady } =
    useMorseTranslator();
  const [textValue, setTextValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { handleSubmit } = useForm<MorseTranslationFormInput, unknown, MorseTranslationFormOutput>({
    resolver: zodResolver(morseTranslationSchema),
    mode: 'onBlur',
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = async () => {
    if (!isSystemReady) {
      toast.error('Aguarde a inicialização do sistema');
      return;
    }

    if (!textValue || textValue.length === 0) {
      toast.error('Digite um texto para traduzir');
      return;
    }

    if (validationError) {
      toast.error('Corrija os erros de validação antes de traduzir');
      return;
    }

    try {
      const sanitizedText = DOMPurify.sanitize(textValue);
      const result = await translate({ text: sanitizedText });
      toast.success('Texto traduzido com sucesso!');
      onTranslationComplete?.(result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao traduzir texto');
      } else {
        toast.error('Erro ao traduzir texto');
      }
    }
  };

  if (isLoadingStatus) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-lg border p-8">
        <LoadingSpinner className="h-5 w-5" />
        <p className="text-muted-foreground text-sm">Inicializando sistema...</p>
      </div>
    );
  }

  if (systemStatus && !systemStatus.ready) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="flex flex-col gap-2">
            <p className="font-medium">{systemStatus.message}</p>
            {systemStatus.status === 'erro_critico' && (
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Recarregar página
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <ValidatedTextInput
        value={textValue}
        onChange={setTextValue}
        onValidationError={setValidationError}
        disabled={isTranslating}
      />

      <Button
        type="submit"
        disabled={isTranslating || !isSystemReady || textValue.length === 0 || !!validationError}
        className="w-full sm:w-auto sm:self-end"
      >
        {isTranslating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Traduzindo...
          </>
        ) : (
          'Traduzir para Morse'
        )}
      </Button>
    </form>
  );
}

export { MorseTranslatorForm };
