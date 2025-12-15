import { z } from 'zod';
import { morseTranslationSchema } from '../validations/morse-translation';
import { morseDecodingSchema } from '../validations/morse-decoding';

export type MorseTranslationFormInput = z.input<typeof morseTranslationSchema>;
export type MorseTranslationFormOutput = z.output<typeof morseTranslationSchema>;

export type MorseDecodingFormInput = z.input<typeof morseDecodingSchema>;
export type MorseDecodingFormOutput = z.output<typeof morseDecodingSchema>;
