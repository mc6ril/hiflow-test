import { View } from 'react-native';

import type { RecipesStartupSnapshot } from '@/features/recipes/domain/startup';
import { RecipeDetailOverlay } from '@/features/recipes/presentation/components/recipe-detail-overlay';
import { RecipeList } from '@/features/recipes/presentation/components/recipe-list';
import { RecipePaginationLoadingOverlay } from '@/features/recipes/presentation/components/recipe-pagination-loading-overlay';
import { useRecipesPageController } from '@/features/recipes/presentation/hooks/useRecipesPageController';
import type { RecipesDependencies } from '@/features/recipes/presentation/hooks/types';
import { UiScreen } from '@/presentation/components/ui/screen';
import { useI18n } from '@/presentation/hooks/useI18n';

import { createRecipesPageStyles } from './styles';

type RecipesPageProps = {
  dependencies: RecipesDependencies;
  snapshot: RecipesStartupSnapshot;
};

export const RecipesPage = ({ dependencies, snapshot }: RecipesPageProps) => {
  const { t } = useI18n();
  const styles = createRecipesPageStyles();
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
    recipes,
    searchQuery,
    selectedRecipe,
    selectedRecipeProgress,
    selectedRecipeProgressErrorMessageKey,
    selectedRecipeStatus,
    setSearchQuery,
  } = useRecipesPageController({
    dependencies,
    snapshot,
  });

  return (
    <UiScreen>
      <View style={styles.listViewport}>
        <RecipeList
          emptyStateMessageKey={emptyStateMessageKey}
          handleContentSizeChange={handleContentSizeChange}
          handleEndReached={handleEndReached}
          handleListLayout={handleListLayout}
          handleRetryPagination={handleRetryPagination}
          handleScroll={handleScroll}
          handleUserInteraction={handleUserInteraction}
          hasMoreRecipes={hasMoreRecipes}
          isSearchLoading={isSearchLoading}
          onOpenRecipeDetails={handleOpenRecipeDetails}
          paginationStatus={paginationStatus}
          recipes={recipes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
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
