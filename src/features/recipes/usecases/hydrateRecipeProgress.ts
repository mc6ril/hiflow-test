import type { RecipesRepository } from '@/features/recipes/domain/recipesRepository';

export const hydrateRecipeProgress = (repository: RecipesRepository) => {
  return repository.readAllProgress();
};
