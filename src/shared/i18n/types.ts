import fr from '@/shared/i18n/messages/fr.json';

export type Locale = 'fr';

type JoinTranslationPath<
  Prefix extends string,
  Key extends string,
> = Prefix extends '' ? Key : `${Prefix}.${Key}`;

type Leaves<T, Prefix extends string = ''> = T extends string
  ? Prefix
  : {
      [Key in keyof T & string]: Leaves<
        T[Key],
        JoinTranslationPath<Prefix, Key>
      >;
    }[keyof T & string];

export type TranslationKey = Leaves<typeof fr>;

export type TranslationDictionary = {
  readonly [key: string]: string | TranslationDictionary;
};

export type I18n = {
  readonly locale: Locale;
  t: (key: TranslationKey) => string;
};
