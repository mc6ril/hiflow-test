import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

export type RecipesListInteractions = {
  handleContentSizeChange: (_width: number, height: number) => void;
  handleEndReached: () => void;
  handleListLayout: (event: LayoutChangeEvent) => void;
  handleRetryPagination: () => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleUserInteraction: () => void;
};

export type UseRecipesPaginationResult = RecipesListInteractions;
