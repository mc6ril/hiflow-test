import { FlatList } from 'react-native';

import type { Recipe } from '@/features/recipes/domain/recipes';
import { RecipeListEmptyState } from '@/features/recipes/presentation/components/recipe-list-empty-state';
import { RecipeListFooter } from '@/features/recipes/presentation/components/recipe-list-footer';
import { RecipeListHeader } from '@/features/recipes/presentation/components/recipe-list-header';
import { RecipeListItem } from '@/features/recipes/presentation/components/recipe-list-item';
import type { RecipesListInteractions } from '@/features/recipes/presentation/hooks/interactionTypes';
import type { RecipeListItemViewModel } from '@/features/recipes/presentation/hooks/types';
import { useTheme } from '@/presentation/hooks/useTheme';
import type { RequestStatus } from '@/shared/domain/requestStatus';
import type { TranslationKey } from '@/shared/i18n/types';

import { createLayoutStyles } from './layout';
import { createStyles } from './styles';

type RecipeListProps = RecipesListInteractions & {
  emptyStateMessageKey: TranslationKey;
  hasMoreRecipes: boolean;
  isSearchLoading: boolean;
  onOpenRecipeDetails: (recipe: Recipe) => void;
  paginationStatus: RequestStatus;
  recipes: RecipeListItemViewModel[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const RecipeList = ({
  emptyStateMessageKey,
  handleContentSizeChange,
  handleEndReached,
  handleListLayout,
  handleRetryPagination,
  handleScroll,
  handleUserInteraction,
  hasMoreRecipes,
  isSearchLoading,
  onOpenRecipeDetails,
  paginationStatus,
  recipes,
  searchQuery,
  setSearchQuery,
}: RecipeListProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={recipes}
      keyExtractor={(item) => `${item.recipe.id}`}
      ListFooterComponent={
        <RecipeListFooter
          hasMoreRecipes={hasMoreRecipes}
          onRetry={handleRetryPagination}
          paginationStatus={paginationStatus}
        />
      }
      ListHeaderComponent={
        <RecipeListHeader
          isSearchLoading={isSearchLoading}
          onSearchQueryChange={setSearchQuery}
          searchQuery={searchQuery}
        />
      }
      ListEmptyComponent={
        isSearchLoading ? null : (
          <RecipeListEmptyState messageKey={emptyStateMessageKey} />
        )
      }
      getItemLayout={(_data, index) => createLayoutStyles(theme, index)}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      onContentSizeChange={handleContentSizeChange}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
      onLayout={handleListLayout}
      onScroll={handleScroll}
      onScrollBeginDrag={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      removeClippedSubviews
      renderItem={({ item }) => (
        <RecipeListItem
          onPress={() => {
            onOpenRecipeDetails(item.recipe);
          }}
          recipe={item.recipe}
          status={item.status}
        />
      )}
      scrollEventThrottle={16}
      testID="recipes-list"
      updateCellsBatchingPeriod={40}
      windowSize={7}
    />
  );
};
