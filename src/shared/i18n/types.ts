import en from '@/shared/i18n/messages/en.json';

export type Locale = 'en';

type NestedTranslationKey<Messages extends TranslationDictionary> = {
  [Key in Extract<keyof Messages, string>]: Messages[Key] extends string
    ? Key
    : `${Key}.${NestedTranslationKey<Extract<Messages[Key], TranslationDictionary>>}`;
}[Extract<keyof Messages, string>];

export type TranslationKey = NestedTranslationKey<typeof en>;

export type TranslationDictionary = {
  readonly [key: string]: string | TranslationDictionary;
};

export type I18n = {
  readonly locale: Locale;
  t: (key: TranslationKey) => string;
};
