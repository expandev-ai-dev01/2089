import { z } from 'zod';
import { morseTranslationSchema } from '../validations/morse-translation';

export type MorseTranslationFormInput = z.input<typeof morseTranslationSchema>;
export type MorseTranslationFormOutput = z.output<typeof morseTranslationSchema>;
