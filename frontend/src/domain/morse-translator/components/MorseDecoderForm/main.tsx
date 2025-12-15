import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { morseDecodingSchema } from '../../validations/morse-decoding';
import type { MorseDecodingFormInput, MorseDecodingFormOutput } from '../../types/forms';
import type { MorseDecoderFormProps } from './types';
import { useMorseDecoder } from '../../hooks/useMorseDecoder';
import { Button } from '@/core/components/button';
import { Textarea } from '@/core/components/textarea';
import { Label } from '@/core/components/label';
import { Alert, AlertDescription } from '@/core/components/alert';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

function MorseDecoderForm({ onDecodingComplete }: MorseDecoderFormProps) {
  const { systemStatus, isLoadingStatus, decode, isDecoding, isSystemReady } = useMorseDecoder();
  const [characterCount, setCharacterCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MorseDecodingFormInput, unknown, MorseDecodingFormOutput>({
    resolver: zodResolver(morseDecodingSchema),
    mode: 'onBlur',
    defaultValues: {
      morseCode: '',
    },
  });

  const morseValue = watch('morseCode');

  useEffect(() => {
    setCharacterCount(morseValue?.length ?? 0);
  }, [morseValue]);

  const onSubmit = async (data: MorseDecodingFormOutput) => {
    if (!isSystemReady) {
      toast.error('Aguarde a inicialização do sistema');
      return;
    }

    try {
      const sanitizedMorse = DOMPurify.sanitize(data.morseCode);
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

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.length > 1000) {
      e.preventDefault();
      const truncatedText = pastedText.substring(0, 1000);
      setValue('morseCode', truncatedText);
      toast.warning('Texto colado foi reduzido para 1000 caracteres');
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="morseCode">Digite o código Morse para decodificar</Label>
          <span
            className={`text-sm ${
              characterCount > 950 ? 'text-destructive font-medium' : 'text-muted-foreground'
            }`}
          >
            {characterCount}/1000
          </span>
        </div>
        <Textarea
          id="morseCode"
          placeholder="... --- ... | .... . .-.. .-.. --- (SOS HELLO)"
          className="min-h-[120px] resize-none font-mono"
          {...register('morseCode')}
          onPaste={handlePaste}
          disabled={isDecoding}
          aria-invalid={!!errors.morseCode}
        />
        {errors.morseCode && (
          <p className="text-destructive text-sm font-medium">{errors.morseCode.message}</p>
        )}
        <p className="text-muted-foreground text-xs">
          Use espaços para separar letras e " | " para separar palavras
        </p>
      </div>

      <Button
        type="submit"
        disabled={isDecoding || !isSystemReady || characterCount === 0}
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
