import { createI18n } from '@/shared/i18n/createI18n';
import type { I18n } from '@/shared/i18n/types';
import { appTheme, type AppTheme } from '@/shared/theme/appTheme';
import {
  createRecipesRepository,
  type AppStartupConfig,
} from '@/infrastructure/recipes/RecipesRepository';
import type { RecipesRepository } from '@/core/ports/recipesRepository';

export type AppDependencies = {
  i18n: I18n;
  theme: AppTheme;
  recipesRepository: RecipesRepository;
  startup: AppStartupConfig;
};

export const createAppDependencies = (): AppDependencies =>
  Object.freeze({
    i18n: createI18n(),
    theme: appTheme,
    recipesRepository: createRecipesRepository(),
    startup: Object.freeze({
      initialRecipesPageSize: 5,
    }),
  });
