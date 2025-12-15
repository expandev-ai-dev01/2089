import { z } from 'zod';

const ALLOWED_MORSE_CHARS = /^[.\-\s|]*$/;

export const morseDecodingSchema = z
  .object({
    morseCode: z
      .string('Digite um código Morse para decodificar')
      .min(1, 'Digite um código Morse para decodificar')
      .max(1000, 'Código Morse excede o limite de 1000 caracteres'),
  })
  .transform((data) => {
    let normalized = data.morseCode.trim();

    normalized = normalized.replace(/[^.\-\s|]/g, '');

    normalized = normalized.replace(/\s{2,}/g, ' ');

    normalized = normalized.replace(/\|\s*\|/g, ' | ');
    normalized = normalized.replace(/\s*\|\s*/g, ' | ');
    normalized = normalized.replace(/\|{2,}/g, ' | ');

    normalized = normalized.replace(/^[\s|]+|[\s|]+$/g, '');

    return {
      morseCode: normalized,
    };
  })
  .refine((data) => ALLOWED_MORSE_CHARS.test(data.morseCode), {
    message: 'Código Morse contém caracteres inválidos',
    path: ['morseCode'],
  });
