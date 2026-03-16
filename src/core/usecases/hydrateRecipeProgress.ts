import type { RecipesRepository } from '@/core/ports/recipesRepository';

export const hydrateRecipeProgress = (repository: RecipesRepository) =>
  repository.readAllProgress();
