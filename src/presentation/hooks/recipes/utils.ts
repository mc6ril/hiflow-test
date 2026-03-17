import {
  ListRecipesParams,
  PaginatedRecipes,
  PaginatedRecipesResult,
} from '@/core/domain/recipes';
import { RecipesRepository } from '@/core/ports/recipesRepository';
import { listRecipes } from '@/core/usecases/listRecipes';
import { searchRecipes } from '@/core/usecases/searchRecipes';

export const appendRecipesPage = (
  currentPage: PaginatedRecipes,
  nextPage: PaginatedRecipes,
): PaginatedRecipes => {
  return Object.freeze({
    items: [...currentPage.items, ...nextPage.items],
    total: nextPage.total,
    skip: nextPage.skip,
    limit: nextPage.limit,
  });
};
export const createEmptyRecipesPage = (limit: number): PaginatedRecipes => {
  return Object.freeze({
    items: [],
    total: 0,
    skip: 0,
    limit,
  });
};

export const loadRecipesPage = (
  repository: RecipesRepository,
  query: string,
  params: ListRecipesParams,
): Promise<PaginatedRecipesResult> => {
  return query.length === 0
    ? listRecipes(repository, params)
    : searchRecipes(repository, {
        ...params,
        query,
      });
};
