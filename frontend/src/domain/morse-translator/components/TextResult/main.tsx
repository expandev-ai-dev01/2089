import { useState } from 'react';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Copy, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { TextResultProps } from './types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/alert-dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/core/components/tooltip';

function TextResult({ result, onClear }: TextResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result?.translatedText) {
      toast.error('Nenhum resultado para copiar');
      return;
    }

    try {
      await navigator.clipboard.writeText(result.translatedText);
      setCopied(true);
      toast.success('Texto copiado!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Não foi possível copiar o resultado');
    }
  };

  const handleClear = () => {
    onClear?.();
    toast.success('Conteúdo limpo');
  };

  const shouldShowConfirmation = (result?.originalMorse?.length ?? 0) > 50;

  const renderTextWithMarkers = (text: string) => {
    const parts = text.split(/\[\?\]/);
    if (parts.length === 1) return text;

    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-destructive mx-0.5 rounded bg-yellow-100 px-1 py-0.5 font-semibold dark:bg-yellow-900/30">
                [?]
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Código Morse não reconhecido</p>
            </TooltipContent>
          </Tooltip>
        )}
      </span>
    ));
  };

  if (!result) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex min-h-[200px] items-center justify-center">
          <p className="text-muted-foreground text-center text-sm">
            O texto traduzido aparecerá aqui...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Texto Decodificado</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleCopy}
            disabled={!result.translatedText}
            title="Copiar texto"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          {shouldShowConfirmation ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon-sm" title="Limpar tudo">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja realmente limpar o conteúdo?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. O código Morse e a tradução serão removidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClear}>Limpar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button variant="outline" size="icon-sm" onClick={handleClear} title="Limpar tudo">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="break-words text-lg leading-relaxed">
            {renderTextWithMarkers(result.translatedText)}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Código Morse original:</span>
            <span className="font-medium">{result.characterCount} caracteres</span>
          </div>
          {result.invalidCodeCount > 0 && (
            <div className="rounded-md bg-yellow-50 p-2 dark:bg-yellow-950/20">
              <p className="text-muted-foreground text-xs">
                <span className="font-medium">Códigos não reconhecidos:</span>{' '}
                {result.invalidCodeCount}
              </p>
            </div>
          )}
          {result.normalizedMorse !== result.originalMorse && (
            <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-950/20">
              <p className="text-muted-foreground text-xs">
                <span className="font-medium">Código normalizado:</span> {result.normalizedMorse}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { TextResult };
