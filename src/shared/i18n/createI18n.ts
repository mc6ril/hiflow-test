import { resources } from './resources';
import type { I18n, TranslationKey } from './types';
import { resolveTranslation } from './resolveTranslation';

const DEFAULT_LOCALE = 'en';

const tranlation = (key: TranslationKey) => {
  return resolveTranslation(resources.en, key) ?? key;
};

const i18nInstance = Object.freeze({
  locale: DEFAULT_LOCALE,
  t: tranlation,
});

export const createI18n = (): I18n => {
  return i18nInstance;
};
