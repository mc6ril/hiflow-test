import { isJsonRecord, isString } from '../utils';
import type { TranslationDictionary } from './types';

export const isTranslationDictionary = (
  value: unknown,
): value is TranslationDictionary => {
  return isJsonRecord(value);
};

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

  return isString(current) ? current : undefined;
};
