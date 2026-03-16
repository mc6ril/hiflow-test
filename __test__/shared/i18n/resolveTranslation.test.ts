import { createI18n } from '@/shared/i18n/createI18n';
import {
  isTranslationDictionary,
  resolveTranslation,
} from '@/shared/i18n/resolveTranslation';
import type { TranslationDictionary } from '@/shared/i18n/types';

describe('resolveTranslation', () => {
  const dictionary: TranslationDictionary = {
    app: {
      name: 'Mes recettes',
    },
  };

  it('resolves a nested translation key', () => {
    expect(resolveTranslation(dictionary, 'app.name')).toBe('Mes recettes');
  });

  it('does not treat arrays as translation dictionaries', () => {
    expect(isTranslationDictionary(['app', 'name'])).toBe(false);
  });

  it('exposes typed translation keys through the i18n service', () => {
    expect(createI18n().t('common.loading')).toBe('Chargement...');
  });
});
