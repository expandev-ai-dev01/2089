import { z } from 'zod';

export const morseTranslationSchema = z.object({
  text: z
    .string('Digite um texto para traduzir')
    .min(1, 'Digite um texto para traduzir')
    .max(1000, 'Texto excede o limite de 1000 caracteres'),
});
