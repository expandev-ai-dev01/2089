import { z } from 'zod';
import { textFieldValidationSchema } from '../validations/text-field';
import { morseFieldValidationSchema } from '../validations/morse-field';
import { sequenceValidationSchema } from '../validations/sequence';

export type ValidationFieldInput = z.input<typeof textFieldValidationSchema>;
export type ValidationFieldOutput = z.output<typeof textFieldValidationSchema>;

export type MorseFieldInput = z.input<typeof morseFieldValidationSchema>;
export type MorseFieldOutput = z.output<typeof morseFieldValidationSchema>;

export type SequenceValidationInput = z.input<typeof sequenceValidationSchema>;
export type SequenceValidationOutput = z.output<typeof sequenceValidationSchema>;
