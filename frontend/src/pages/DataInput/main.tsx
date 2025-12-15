import { useState } from 'react';
import { ValidatedTextInput } from '@/domain/input-validation/components/ValidatedTextInput';
import { ValidatedMorseInput } from '@/domain/input-validation/components/ValidatedMorseInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Alert, AlertDescription } from '@/core/components/alert';
import { AlertCircle } from 'lucide-react';

function DataInputPage() {
  const [textValue, setTextValue] = useState('');
  const [morseValue, setMorseValue] = useState('');
  const [textError, setTextError] = useState<string | null>(null);
  const [morseError, setMorseError] = useState<string | null>(null);

  const handleTextChange = (value: string) => {
    if (morseValue) {
      setMorseValue('');
      setMorseError(null);
    }
    setTextValue(value);
  };

  const handleMorseChange = (value: string) => {
    if (textValue) {
      setTextValue('');
      setTextError(null);
    }
    setMorseValue(value);
  };

  const hasActiveError = textError || morseError;

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8">
      <header className="space-y-2 text-center">
        <h1 className="text-primary text-4xl font-bold tracking-tight">
          Interface de Entrada de Dados
        </h1>
        <p className="text-muted-foreground text-lg">Insira texto ou código Morse para tradução</p>
      </header>

      {hasActiveError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{textError || morseError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Texto</CardTitle>
          </CardHeader>
          <CardContent>
            <ValidatedTextInput
              value={textValue}
              onChange={handleTextChange}
              onValidationError={setTextError}
              placeholder="Digite texto em português (letras, números e pontuação básica)"
            />
          </CardContent>
        </Card>

        <Card className="shadow-md transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Código Morse</CardTitle>
          </CardHeader>
          <CardContent>
            <ValidatedMorseInput
              value={morseValue}
              onChange={handleMorseChange}
              onValidationError={setMorseError}
              placeholder="Digite código Morse (pontos . traços - espaços para separar letras)"
            />
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 rounded-lg border p-6">
        <h3 className="mb-3 font-semibold">Instruções de Uso</h3>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Apenas um campo pode conter dados por vez - ao digitar em um campo, o outro será limpo
              automaticamente
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Campo de texto aceita letras, números e pontuação básica (máximo 1000 caracteres)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Campo de código Morse aceita apenas pontos (.), traços (-), espaços e barras verticais
              (|)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Use espaços para separar letras e " | " para separar palavras no código Morse
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Contadores de caracteres são atualizados em tempo real durante a digitação</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Mensagens de erro aparecem automaticamente quando caracteres inválidos são detectados
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { DataInputPage };
