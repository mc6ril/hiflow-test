import type { PaginatedRecipes } from '@/features/recipes/domain/recipes';

const appendRecipesPage = (
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

const createEmptyRecipesPage = (limit: number): PaginatedRecipes => {
  return Object.freeze({
    items: [],
    total: 0,
    skip: 0,
    limit,
  });
};

export const flattenRecipesPages = (
  pages: PaginatedRecipes[] | undefined,
  fallbackLimit: number,
): PaginatedRecipes => {
  if (!pages || pages.length === 0) {
    return createEmptyRecipesPage(fallbackLimit);
  }

  const firstPage = pages[0];

  if (!firstPage) {
    return createEmptyRecipesPage(fallbackLimit);
  }

  return pages.slice(1).reduce((currentPage, nextPage) => {
    return appendRecipesPage(currentPage, nextPage);
  }, firstPage);
};
