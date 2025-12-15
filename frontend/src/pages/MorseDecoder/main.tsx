import { useState } from 'react';
import { MorseDecoderForm } from '@/domain/morse-translator/components/MorseDecoderForm';
import { TextResult } from '@/domain/morse-translator/components/TextResult';
import type { MorseDecoding } from '@/domain/morse-translator/types/models';

function MorseDecoderPage() {
  const [result, setResult] = useState<MorseDecoding | undefined>(undefined);

  const handleDecodingComplete = (decoding: MorseDecoding) => {
    setResult(decoding);
  };

  const handleClear = () => {
    setResult(undefined);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <header className="space-y-2 text-center">
        <h1 className="text-primary text-4xl font-bold tracking-tight">
          Decodificador de Código Morse
        </h1>
        <p className="text-muted-foreground text-lg">
          Converta código Morse em texto de forma rápida e precisa
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Entrada</h2>
          <MorseDecoderForm onDecodingComplete={handleDecodingComplete} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Resultado</h2>
          <TextResult result={result} onClear={handleClear} />
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg border p-6">
        <h3 className="mb-3 font-semibold">Como funciona?</h3>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Digite ou cole seu código Morse no campo de entrada (máximo 1000 caracteres)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Use espaços para separar letras e " | " para separar palavras</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Códigos inválidos serão marcados com [?] no resultado</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Clique em "Decodificar para Texto" para ver o resultado</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Use o botão de copiar para transferir o texto traduzido</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { MorseDecoderPage };
