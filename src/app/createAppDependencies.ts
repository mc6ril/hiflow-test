import { createI18n } from '@/shared/i18n/createI18n';
import type { I18n } from '@/shared/i18n/types';
import { appTheme, type AppTheme } from '@/shared/theme/appTheme';

export type AppDependencies = {
  i18n: I18n;
  theme: AppTheme;
};

export const createAppDependencies = (): AppDependencies =>
  Object.freeze({
    i18n: createI18n(),
    theme: appTheme,
  });
