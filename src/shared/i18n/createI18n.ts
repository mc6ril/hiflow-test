import { resources } from './resources';
import type { I18n, TranslationKey } from './types';
import { resolveTranslation } from './resolveTranslation';

export const createI18n = (): I18n =>
  Object.freeze({
    locale: 'fr' as const,
    t: (key: TranslationKey) => resolveTranslation(resources.fr, key) ?? key,
  });
