import type {
  ListRecipesParams,
  PaginatedRecipesResult,
} from '@/features/recipes/domain/recipes';
import type {
  RecipesRepository,
  RecipesRequestOptions,
} from '@/features/recipes/domain/recipesRepository';

export const listRecipes = (
  repository: RecipesRepository,
  params: ListRecipesParams,
  options?: RecipesRequestOptions,
): Promise<PaginatedRecipesResult> => {
  return repository.list(params, options);
};
