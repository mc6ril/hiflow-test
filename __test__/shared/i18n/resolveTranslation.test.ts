import {
  isTranslationDictionary,
  resolveTranslation,
} from '@/shared/i18n/resolveTranslation';
import type { TranslationDictionary } from '@/shared/i18n/types';

describe('resolveTranslation', () => {
  const dictionary: TranslationDictionary = {
    app: {
      name: 'My Recipes',
    },
  };

  it('resolves a nested translation key', () => {
    expect(resolveTranslation(dictionary, 'app.name')).toBe('My Recipes');
  });

  it('does not treat arrays as translation dictionaries', () => {
    expect(isTranslationDictionary(['app', 'name'])).toBe(false);
  });
});
