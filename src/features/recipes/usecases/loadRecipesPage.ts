import type {
  ListRecipesParams,
  PaginatedRecipesResult,
} from '@/features/recipes/domain/recipes';
import type {
  RecipesRepository,
  RecipesRequestOptions,
} from '@/features/recipes/domain/recipesRepository';

import { listRecipes } from './listRecipes';
import { searchRecipes } from './searchRecipes';

export type LoadRecipesPageParams = {
  page: ListRecipesParams;
  query: string;
};

export const loadRecipesPage = (
  repository: RecipesRepository,
  { page, query }: LoadRecipesPageParams,
  options?: RecipesRequestOptions,
): Promise<PaginatedRecipesResult> => {
  return query.length === 0
    ? listRecipes(repository, page, options)
    : searchRecipes(
        repository,
        {
          ...page,
          query,
        },
        options,
      );
};
