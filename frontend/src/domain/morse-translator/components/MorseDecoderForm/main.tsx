import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { morseDecodingSchema } from '../../validations/morse-decoding';
import type { MorseDecodingFormInput, MorseDecodingFormOutput } from '../../types/forms';
import type { MorseDecoderFormProps } from './types';
import { useMorseDecoder } from '../../hooks/useMorseDecoder';
import { Button } from '@/core/components/button';
import { Alert, AlertDescription } from '@/core/components/alert';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { ValidatedMorseInput } from '@/domain/input-validation/components/ValidatedMorseInput';

function MorseDecoderForm({ onDecodingComplete }: MorseDecoderFormProps) {
  const { systemStatus, isLoadingStatus, decode, isDecoding, isSystemReady } = useMorseDecoder();
  const [morseValue, setMorseValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { handleSubmit } = useForm<MorseDecodingFormInput, unknown, MorseDecodingFormOutput>({
    resolver: zodResolver(morseDecodingSchema),
    mode: 'onBlur',
    defaultValues: {
      morseCode: '',
    },
  });

  const onSubmit = async () => {
    if (!isSystemReady) {
      toast.error('Aguarde a inicialização do sistema');
      return;
    }

    if (!morseValue || morseValue.length === 0) {
      toast.error('Digite um código Morse para decodificar');
      return;
    }

    if (validationError) {
      toast.error('Corrija os erros de validação antes de decodificar');
      return;
    }

    try {
      const sanitizedMorse = DOMPurify.sanitize(morseValue);
      const result = await decode({ morseCode: sanitizedMorse });
      toast.success('Código Morse decodificado com sucesso!');
      onDecodingComplete?.(result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao decodificar código Morse');
      } else {
        toast.error('Erro ao decodificar código Morse');
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
      <ValidatedMorseInput
        value={morseValue}
        onChange={setMorseValue}
        onValidationError={setValidationError}
        disabled={isDecoding}
      />

      <Button
        type="submit"
        disabled={isDecoding || !isSystemReady || morseValue.length === 0 || !!validationError}
        className="w-full sm:w-auto sm:self-end"
      >
        {isDecoding ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Decodificando...
          </>
        ) : (
          'Decodificar para Texto'
        )}
      </Button>
    </form>
  );
}

export { MorseDecoderForm };
