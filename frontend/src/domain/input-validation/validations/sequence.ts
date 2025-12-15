import { z } from 'zod';

export const sequenceValidationSchema = z
  .object({
    sequence: z.string('Digite uma sequência para validar').max(1000),
  })
  .refine((data) => !/\s{2,}/.test(data.sequence), {
    message: 'Não são permitidos espaços consecutivos no código Morse',
    path: ['sequence'],
  })
  .refine((data) => !/\|{2,}/.test(data.sequence), {
    message: 'Não são permitidas barras verticais consecutivas',
    path: ['sequence'],
  })
  .refine((data) => !/^[|\s]|[|\s]$/.test(data.sequence), {
    message: 'Barra vertical não pode estar no início ou fim',
    path: ['sequence'],
  })
  .refine((data) => !/\s*\|\s*/.test(data.sequence) || /\s\|\s/.test(data.sequence), {
    message: 'Não são permitidos espaços antes ou depois de barras verticais',
    path: ['sequence'],
  });
