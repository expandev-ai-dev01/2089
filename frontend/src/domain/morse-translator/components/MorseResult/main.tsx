import { useState } from 'react';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Copy, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { MorseResultProps } from './types';
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

function MorseResult({ result, onClear }: MorseResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result?.morseCode) {
      toast.error('Nenhum resultado para copiar');
      return;
    }

    try {
      await navigator.clipboard.writeText(result.morseCode);
      setCopied(true);
      toast.success('Código Morse copiado!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Não foi possível copiar o resultado');
    }
  };

  const handleClear = () => {
    onClear?.();
    toast.success('Conteúdo limpo');
  };

  const shouldShowConfirmation = (result?.originalText?.length ?? 0) > 50;

  if (!result) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex min-h-[200px] items-center justify-center">
          <p className="text-muted-foreground text-center text-sm">
            O resultado da tradução aparecerá aqui
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Código Morse</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleCopy}
            disabled={!result.morseCode}
            title="Copiar código Morse"
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
                    Esta ação não pode ser desfeita. O texto e a tradução serão removidos.
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
          <p className="break-words font-mono text-lg leading-relaxed tracking-wide">
            {result.morseCode}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Texto original:</span>
            <span className="font-medium">{result.characterCount} caracteres</span>
          </div>
          {result.normalizedText !== result.originalText && (
            <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-950/20">
              <p className="text-muted-foreground text-xs">
                <span className="font-medium">Texto normalizado:</span> {result.normalizedText}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { MorseResult };
