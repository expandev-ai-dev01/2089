import { z } from 'zod';

const ALLOWED_MORSE_CHARS = /^[.\-\s|]*$/;

export const morseFieldValidationSchema = z.object({
  morseCode: z
    .string('Digite um código Morse para validar')
    .max(1000, 'Limite máximo de 1000 caracteres atingido')
    .refine((val) => ALLOWED_MORSE_CHARS.test(val), {
      message: 'Apenas pontos (.), traços (-), espaços e barras verticais (|) são permitidos',
    }),
  currentLength: z.number().min(0).max(1000),
});
