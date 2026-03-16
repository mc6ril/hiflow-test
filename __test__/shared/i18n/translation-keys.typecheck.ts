import type { TranslationKey } from '@/shared/i18n/types';

const acceptTranslationKey = (key: TranslationKey): TranslationKey => key;

acceptTranslationKey('bootstrap.title');
acceptTranslationKey('common.retry');

// @ts-expect-error Translation keys should be derived from the messages tree.
acceptTranslationKey('bootstrap.titlee');
