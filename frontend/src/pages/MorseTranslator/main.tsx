import { useState } from 'react';
import { MorseTranslatorForm } from '@/domain/morse-translator/components/MorseTranslatorForm';
import { MorseResult } from '@/domain/morse-translator/components/MorseResult';
import type { MorseTranslation } from '@/domain/morse-translator/types/models';

function MorseTranslatorPage() {
  const [result, setResult] = useState<MorseTranslation | undefined>(undefined);

  const handleTranslationComplete = (translation: MorseTranslation) => {
    setResult(translation);
  };

  const handleClear = () => {
    setResult(undefined);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <header className="space-y-2 text-center">
        <h1 className="text-primary text-4xl font-bold tracking-tight">Tradutor de Código Morse</h1>
        <p className="text-muted-foreground text-lg">
          Converta texto em código Morse de forma rápida e precisa
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Entrada</h2>
          <MorseTranslatorForm onTranslationComplete={handleTranslationComplete} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Resultado</h2>
          <MorseResult result={result} onClear={handleClear} />
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg border p-6">
        <h3 className="mb-3 font-semibold">Como funciona?</h3>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Digite ou cole seu texto no campo de entrada (máximo 1000 caracteres)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Acentos são automaticamente normalizados para caracteres ASCII</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Clique em "Traduzir para Morse" para ver o resultado</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Use o botão de copiar para transferir o código Morse</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { MorseTranslatorPage };
