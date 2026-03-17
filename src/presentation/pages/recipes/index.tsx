import { FlatList, View } from 'react-native';

import {
  computeRecipeStatus,
  type Recipe,
  toRecipeProgressKey,
} from '@/core/domain/recipes';
import type { AppStartupSnapshot } from '@/core/usecases/startApp';
import { RecipeListEmptyState } from '@/presentation/components/recipe/recipe-list-empty-state';
import { RecipeListFooter } from '@/presentation/components/recipe/recipe-list-footer';
import { RecipeListHeader } from '@/presentation/components/recipe/recipe-list-header';
import { RecipeDetailOverlay } from '@/presentation/components/recipe/recipe-detail-overlay';
import { RecipeListItem } from '@/presentation/components/recipe/recipe-list-item';
import { RecipePaginationLoadingOverlay } from '@/presentation/components/recipe/recipe-pagination-loading-overlay';
import { UiScreen } from '@/presentation/components/ui/screen';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useRequiredDependencies } from '@/presentation/hooks/useRequiredDependencies';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipesPageStyles } from './styles';
import { useRecipesPageController } from '@/presentation/hooks/recipes/useRecipesPageController';

type RecipesPageProps = {
  snapshot: AppStartupSnapshot;
};

export const RecipesPage = ({ snapshot }: RecipesPageProps) => {
  const { recipesRepository } = useRequiredDependencies();
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipesPageStyles(theme);
  const {
    emptyStateMessageKey,
    handleCloseRecipeDetails,
    handleContentSizeChange,
    handleEndReached,
    handleListLayout,
    handleOpenRecipeDetails,
    handleRetryPagination,
    handleScroll,
    handleToggleInstructionStep,
    handleUserInteraction,
    hasMoreRecipes,
    isRecipeProgressSaving,
    isSearchLoading,
    paginationStatus,
    progressById,
    recipesPage,
    searchQuery,
    selectedRecipe,
    selectedRecipeProgress,
    selectedRecipeProgressErrorMessageKey,
    setSearchQuery,
  } = useRecipesPageController({
    recipesRepository,
    snapshot,
  });

  const renderRecipeItem = ({ item }: { item: Recipe }) => {
    const status = computeRecipeStatus(
      progressById[toRecipeProgressKey(item.id)],
      item.instructions.length,
    );

    return (
      <RecipeListItem
        onPress={() => {
          handleOpenRecipeDetails(item);
        }}
        recipe={item}
        status={status}
      />
    );
  };

  const selectedRecipeStatus =
    selectedRecipe === null
      ? null
      : computeRecipeStatus(
          selectedRecipeProgress,
          selectedRecipe.instructions.length,
        );

  return (
    <UiScreen>
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
        {selectedRecipe !== null && selectedRecipeStatus !== null ? (
          <RecipeDetailOverlay
            isSavingProgress={isRecipeProgressSaving}
            onClose={handleCloseRecipeDetails}
            onToggleInstructionStep={handleToggleInstructionStep}
            progress={selectedRecipeProgress}
            progressErrorMessage={
              selectedRecipeProgressErrorMessageKey === null
                ? null
                : t(selectedRecipeProgressErrorMessageKey)
            }
            recipe={selectedRecipe}
            status={selectedRecipeStatus}
          />
        ) : null}
      </View>
    </UiScreen>
  );
};
