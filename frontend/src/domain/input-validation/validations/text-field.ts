import { z } from 'zod';

const ALLOWED_TEXT_CHARS = /^[a-zA-Z0-9\s.,?'!\/()&:;=+\-_"$@]*$/;

const SPECIAL_CHARS_LIST = [
  '.',
  ',',
  '?',
  "'",
  '!',
  '/',
  '(',
  ')',
  '&',
  ':',
  ';',
  '=',
  '+',
  '-',
  '_',
  '"',
  '$',
  '@',
];

export const textFieldValidationSchema = z.object({
  text: z
    .string('Digite um texto para validar')
    .max(1000, 'Limite máximo de 1000 caracteres atingido')
    .refine((val) => ALLOWED_TEXT_CHARS.test(val), {
      message: 'Este caractere não é suportado para tradução Morse',
    }),
  currentLength: z.number().min(0).max(1000),
});

export { SPECIAL_CHARS_LIST };
