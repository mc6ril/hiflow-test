import type { TranslationDictionary } from './types';

export const isTranslationDictionary = (
  value: unknown,
): value is TranslationDictionary =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const resolveTranslation = (
  dictionary: TranslationDictionary,
  key: string,
): string | undefined => {
  const segments = key.split('.');
  let current: unknown = dictionary;

  for (const segment of segments) {
    if (!isTranslationDictionary(current)) {
      return undefined;
    }

    current = current[segment];
  }

  return typeof current === 'string' ? current : undefined;
};
