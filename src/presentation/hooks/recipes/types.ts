import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import type { PaginatedRecipes } from '@/core/domain/recipes';
import type { RequestStatus } from '@/core/domain/requestStatus';
import { TranslationKey } from '@/shared/i18n/types';

export type RecipesListInteractions = {
  handleContentSizeChange: (_width: number, height: number) => void;
  handleEndReached: () => void;
  handleListLayout: (event: LayoutChangeEvent) => void;
  handleRetryPagination: () => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleUserInteraction: () => void;
};

export type RecipesPaginationState = RecipesListInteractions & {
  hasMoreRecipes: boolean;
  paginationStatus: RequestStatus;
  recipesPage: PaginatedRecipes;
};

export type UseRecipesPageStateResult = RecipesPaginationState & {
  emptyStateMessageKey: TranslationKey;
  isSearchLoading: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export type UseRecipesPaginationResult = RecipesPaginationState & {
  replaceRecipesPage: (page: PaginatedRecipes) => void;
};
