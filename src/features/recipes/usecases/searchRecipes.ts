import type {
  PaginatedRecipesResult,
  SearchRecipesParams,
} from '@/features/recipes/domain/recipes';
import type {
  RecipesRepository,
  RecipesRequestOptions,
} from '@/features/recipes/domain/recipesRepository';

export const searchRecipes = (
  repository: RecipesRepository,
  params: SearchRecipesParams,
  options?: RecipesRequestOptions,
): Promise<PaginatedRecipesResult> => {
  return repository.search(params, options);
};
