import type {
  PaginatedRecipesResult,
  SearchRecipesParams,
} from '@/core/domain/recipes';
import type { RecipesRepository } from '@/core/ports/recipesRepository';

export const searchRecipes = (
  repository: RecipesRepository,
  params: SearchRecipesParams,
): Promise<PaginatedRecipesResult> => repository.search(params);
