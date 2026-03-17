import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  computeRecipeStatus,
  type Recipe,
  toRecipeProgressKey,
} from '@/core/domain/recipes';
import type { AppStartupSnapshot } from '@/core/usecases/startApp';
import { RecipeListEmptyState } from '@/presentation/components/recipe/recipe-list-empty-state';
import { RecipeListFooter } from '@/presentation/components/recipe/recipe-list-footer';
import { RecipeListHeader } from '@/presentation/components/recipe/recipe-list-header';
import { RecipeListItem } from '@/presentation/components/recipe/recipe-list-item';
import { RecipePaginationLoadingOverlay } from '@/presentation/components/recipe/recipe-pagination-loading-overlay';
import { useRequiredDependencies } from '@/presentation/hooks/useRequiredDependencies';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipesPageStyles } from './styles';
import { useRecipesPageState } from '@/presentation/hooks/recipes/useRecipesPageState';

type RecipesPageProps = {
  snapshot: AppStartupSnapshot;
};

export const RecipesPage = ({ snapshot }: RecipesPageProps) => {
  const { recipesRepository } = useRequiredDependencies();
  const theme = useTheme();
  const styles = createRecipesPageStyles(theme);
  const {
    emptyStateMessageKey,
    handleContentSizeChange,
    handleEndReached,
    handleListLayout,
    handleRetryPagination,
    handleScroll,
    handleUserInteraction,
    hasMoreRecipes,
    isSearchLoading,
    paginationStatus,
    recipesPage,
    searchQuery,
    setSearchQuery,
  } = useRecipesPageState({
    recipesRepository,
    snapshot,
  });

  const renderRecipeItem = ({ item }: { item: Recipe }) => {
    const status = computeRecipeStatus(
      snapshot.progressById[toRecipeProgressKey(item.id)],
      item.instructions.length,
    );

    return <RecipeListItem recipe={item} status={status} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.listViewport}>
        <FlatList
          contentContainerStyle={styles.content}
          data={recipesPage.items}
          keyExtractor={(item) => `${item.id}`}
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
          onContentSizeChange={handleContentSizeChange}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onLayout={handleListLayout}
          onScroll={handleScroll}
          onScrollBeginDrag={handleUserInteraction}
          onTouchStart={handleUserInteraction}
          renderItem={renderRecipeItem}
          scrollEventThrottle={16}
          testID="recipes-list"
        />
        {paginationStatus === 'loading' ? (
          <RecipePaginationLoadingOverlay />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
