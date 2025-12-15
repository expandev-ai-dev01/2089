import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { morseTranslationSchema } from '../../validations/morse-translation';
import type { MorseTranslationFormInput, MorseTranslationFormOutput } from '../../types/forms';
import type { MorseTranslatorFormProps } from './types';
import { useMorseTranslator } from '../../hooks/useMorseTranslator';
import { Button } from '@/core/components/button';
import { Textarea } from '@/core/components/textarea';
import { Label } from '@/core/components/label';
import { Alert, AlertDescription } from '@/core/components/alert';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

function MorseTranslatorForm({ onTranslationComplete }: MorseTranslatorFormProps) {
  const { systemStatus, isLoadingStatus, translate, isTranslating, isSystemReady } =
    useMorseTranslator();
  const [characterCount, setCharacterCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MorseTranslationFormInput, unknown, MorseTranslationFormOutput>({
    resolver: zodResolver(morseTranslationSchema),
    mode: 'onBlur',
    defaultValues: {
      text: '',
    },
  });

  const textValue = watch('text');

  useEffect(() => {
    setCharacterCount(textValue?.length ?? 0);
  }, [textValue]);

  const onSubmit = async (data: MorseTranslationFormOutput) => {
    if (!isSystemReady) {
      toast.error('Aguarde a inicialização do sistema');
      return;
    }

    try {
      const sanitizedText = DOMPurify.sanitize(data.text);
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

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.length > 1000) {
      e.preventDefault();
      const truncatedText = pastedText.substring(0, 1000);
      setValue('text', truncatedText);
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
          <Label htmlFor="text">Digite o texto para traduzir</Label>
          <span
            className={`text-sm ${
              characterCount > 950 ? 'text-destructive font-medium' : 'text-muted-foreground'
            }`}
          >
            {characterCount}/1000
          </span>
        </div>
        <Textarea
          id="text"
          placeholder="Digite seu texto aqui..."
          className="min-h-[120px] resize-none font-mono"
          {...register('text')}
          onPaste={handlePaste}
          disabled={isTranslating}
          aria-invalid={!!errors.text}
        />
        {errors.text && (
          <p className="text-destructive text-sm font-medium">{errors.text.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isTranslating || !isSystemReady || characterCount === 0}
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
