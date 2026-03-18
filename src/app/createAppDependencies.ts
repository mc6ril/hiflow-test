import { createI18n } from '@/shared/i18n/createI18n';
import type { I18n } from '@/shared/i18n/types';
import type {
  PaginatedRecipes,
  RecipeProgress,
  RecipeProgressKey,
  RecipeProgressResult,
  RecipeStatus,
  ToggleRecipeStepParams,
} from '@/features/recipes/domain/recipes';
import type { RecipesStartupResult } from '@/features/recipes/domain/startup';
import {
  computeRecipeStatus,
  toRecipeProgressKey,
} from '@/features/recipes/domain/recipes';
import { createRecipesRepository } from '@/features/recipes/infrastructure/RecipesRepository';
import { flattenRecipesPages } from '@/features/recipes/usecases/flattenRecipesPages';
import { getNextRecipesPageOffset } from '@/features/recipes/usecases/getNextRecipesPageOffset';
import {
  loadRecipesPage,
  type LoadRecipesPageParams,
} from '@/features/recipes/usecases/loadRecipesPage';
import { previewInstructionStepToggle } from '@/features/recipes/usecases/previewInstructionStepToggle';
import { startApp } from '@/features/recipes/usecases/startApp';
import { toggleInstructionStep } from '@/features/recipes/usecases/toggleInstructionStep';

export type AppDependencies = {
  computeRecipeStatus: (
    progress: RecipeProgress | null | undefined,
    totalSteps: number,
  ) => RecipeStatus;
  flattenRecipesPages: (
    pages: PaginatedRecipes[] | undefined,
    fallbackLimit: number,
  ) => PaginatedRecipes;
  getNextRecipesPageOffset: (
    lastPage: PaginatedRecipes,
    allPages: PaginatedRecipes[],
  ) => number | undefined;
  i18n: I18n;
  loadRecipesPage: (
    params: LoadRecipesPageParams,
    options?: {
      signal?: AbortSignal;
    },
  ) => ReturnType<typeof loadRecipesPage>;
  previewInstructionStepToggle: (
    params: ToggleRecipeStepParams,
  ) => RecipeProgress;
  startApp: () => Promise<RecipesStartupResult>;
  toRecipeProgressKey: (recipeId: number) => RecipeProgressKey;
  toggleInstructionStep: (
    params: ToggleRecipeStepParams,
  ) => Promise<RecipeProgressResult>;
};

export const createAppDependencies = (): AppDependencies => {
  const recipesRepository = createRecipesRepository();

  return Object.freeze({
    computeRecipeStatus,
    flattenRecipesPages,
    getNextRecipesPageOffset,
    i18n: createI18n(),
    loadRecipesPage: (params, options) =>
      loadRecipesPage(recipesRepository, params, options),
    previewInstructionStepToggle,
    startApp: () =>
      startApp(recipesRepository, {
        limit: 5,
        skip: 0,
      }),
    toRecipeProgressKey,
    toggleInstructionStep: (params) =>
      toggleInstructionStep(recipesRepository, params),
  });
};
