/**
 * @service MorseTranslatorService
 * @domain morse-translator
 * @type REST
 */

import { authenticatedClient } from '@/core/lib/api';
import type { MorseTranslation, SystemStatus } from '../types/models';
import type { MorseTranslationFormOutput } from '../types/forms';

export const morseTranslatorService = {
  async translate(data: MorseTranslationFormOutput): Promise<MorseTranslation> {
    const response = await authenticatedClient.post<{ success: boolean; data: MorseTranslation }>(
      '/morse-translator/translate',
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
