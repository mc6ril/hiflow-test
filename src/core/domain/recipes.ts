import type { Paginated } from '@/core/domain/paginated';
import type { Result } from '@/core/domain/result';

export type RecipeStatus = 'not_started' | 'in_progress' | 'done';

export type Recipe = {
  id: number;
  name: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: string;
  cuisine: string;
  rating: number;
  ingredients: string[];
  instructions: string[];
};

export type RecipeProgress = {
  recipeId: number;
  completedStepIndexes: number[];
  updatedAt: string;
};

export type RecipeProgressKey = `${number}`;

export type RecipeProgressById = Record<RecipeProgressKey, RecipeProgress>;

export type PaginatedRecipes = Paginated<Recipe>;

export type PaginatedRecipesResult = Result<PaginatedRecipes>;

export type ListRecipesParams = {
  limit: number;
  skip: number;
};

export type SearchRecipesParams = {
  query: string;
  limit: number;
  skip: number;
};

export const toRecipeProgressKey = (recipeId: number): RecipeProgressKey =>
  `${recipeId}`;

export const computeRecipeStatus = (
  progress: RecipeProgress | null | undefined,
  totalSteps: number,
): RecipeStatus => {
  const completedSteps = progress?.completedStepIndexes.length ?? 0;

  if (completedSteps === 0) {
    return 'not_started';
  }

  if (totalSteps === 0) {
    return 'done';
  }

  if (completedSteps >= totalSteps) {
    return 'done';
  }

  return 'in_progress';
};

export const createRecipeProgress = (recipeId: number): RecipeProgress =>
  Object.freeze({
    recipeId,
    completedStepIndexes: [],
    updatedAt: new Date().toISOString(),
  });

export type ToggleRecipeStepParams = {
  recipeId: number;
  stepIndex: number;
  progress?: RecipeProgress | null;
};

export const toggleRecipeStep = ({
  recipeId,
  stepIndex,
  progress,
}: ToggleRecipeStepParams): RecipeProgress => {
  const currentProgress = progress ?? createRecipeProgress(recipeId);
  const completedStepIndexes = currentProgress.completedStepIndexes.includes(
    stepIndex,
  )
    ? currentProgress.completedStepIndexes.filter(
        (index) => index !== stepIndex,
      )
    : [...currentProgress.completedStepIndexes, stepIndex].sort(
        (left, right) => left - right,
      );

  return Object.freeze({
    ...currentProgress,
    completedStepIndexes,
    updatedAt: new Date().toISOString(),
  });
};
