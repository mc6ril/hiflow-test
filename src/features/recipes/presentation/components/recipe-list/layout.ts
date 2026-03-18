import type { AppTheme } from '@/presentation/theme/appTheme';

export const RECIPE_LIST_HEADER_HEIGHT = 120;
export const RECIPE_LIST_ITEM_HEIGHT = 156;

export const createLayoutStyles = (theme: AppTheme, index: number) => {
  const recipeListItemLayoutHeight = RECIPE_LIST_ITEM_HEIGHT + theme.spacing.md;
  const recipeListHeaderOffset = theme.spacing.xl + RECIPE_LIST_HEADER_HEIGHT;

  return {
    index,
    length: recipeListItemLayoutHeight,
    offset: recipeListHeaderOffset + index * recipeListItemLayoutHeight,
  };
};
