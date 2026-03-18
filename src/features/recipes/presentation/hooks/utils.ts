import type { PaginatedRecipes } from '@/features/recipes/domain/recipes';

const RECIPES_QUERY_KEY = 'recipes';

/**
 * Creates an infinite recipes data.
 * @param page - The page to create the infinite data from.
 * @returns The infinite recipes data.
 */
export const createInfiniteRecipesData = (page: PaginatedRecipes) =>
  Object.freeze({
    pageParams: [page.skip],
    pages: [page],
  });

/**
 * Creates a recipes query key.
 * @param query - The query to create the key for.
 * @returns The recipes query key.
 */
export const getRecipesQueryKey = (query: string) =>
  [RECIPES_QUERY_KEY, query] as const;
