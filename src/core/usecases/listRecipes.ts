import type {
  ListRecipesParams,
  PaginatedRecipesResult,
} from '@/core/domain/recipes';
import type { RecipesRepository } from '@/core/ports/recipesRepository';

export const listRecipes = (
  repository: RecipesRepository,
  params: ListRecipesParams,
): Promise<PaginatedRecipesResult> => repository.list(params);
