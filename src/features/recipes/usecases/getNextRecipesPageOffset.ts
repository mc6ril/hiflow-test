import type { PaginatedRecipes } from '@/features/recipes/domain/recipes';

export const getNextRecipesPageOffset = (
  lastPage: PaginatedRecipes,
  allPages: PaginatedRecipes[],
): number | undefined => {
  const loadedItemsCount = allPages.reduce((count, page) => {
    return count + page.items.length;
  }, 0);

  return loadedItemsCount < lastPage.total ? loadedItemsCount : undefined;
};
