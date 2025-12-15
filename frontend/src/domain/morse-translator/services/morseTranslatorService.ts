/**
 * @service MorseTranslatorService
 * @domain morse-translator
 * @type REST
 */

import { authenticatedClient } from '@/core/lib/api';
import type { MorseTranslation, MorseDecoding, SystemStatus } from '../types/models';
import type { MorseTranslationFormOutput, MorseDecodingFormOutput } from '../types/forms';

export const morseTranslatorService = {
  async translate(data: MorseTranslationFormOutput): Promise<MorseTranslation> {
    const response = await authenticatedClient.post<{ success: boolean; data: MorseTranslation }>(
      '/morse-translator/translate',
      data
    );
    return response.data.data;
  },

  async decode(data: MorseDecodingFormOutput): Promise<MorseDecoding> {
    const response = await authenticatedClient.post<{ success: boolean; data: MorseDecoding }>(
      '/morse-translator/decode',
      data
    );
    return response.data.data;
  },

  async getSystemStatus(): Promise<SystemStatus> {
    const response = await authenticatedClient.get<{ success: boolean; data: SystemStatus }>(
      '/morse-translator/status'
    );
    return response.data.data;
  },
};
