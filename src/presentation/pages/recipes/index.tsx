import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  computeRecipeStatus,
  type PaginatedRecipes,
  type Recipe,
  toRecipeProgressKey,
} from '@/core/domain/recipes';
import { listRecipes } from '@/core/usecases/listRecipes';
import type { AppStartupSnapshot } from '@/core/usecases/startApp';
import { RecipeListEmptyState } from '@/presentation/components/recipe/recipe-list-empty-state';
import { RecipeListFooter } from '@/presentation/components/recipe/recipe-list-footer';
import { RecipeListHeader } from '@/presentation/components/recipe/recipe-list-header';
import { RecipeListItem } from '@/presentation/components/recipe/recipe-list-item';
import { RecipePaginationLoadingOverlay } from '@/presentation/components/recipe/recipe-pagination-loading-overlay';
import { useRequiredDependencies } from '@/presentation/hooks/useRequiredDependencies';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipesPageStyles } from './styles';

type RecipesPageProps = {
  snapshot: AppStartupSnapshot;
};

const PAGINATION_TRIGGER_DISTANCE = 120;

export const RecipesPage = ({ snapshot }: RecipesPageProps) => {
  const { recipesRepository } = useRequiredDependencies();
  const theme = useTheme();
  const styles = createRecipesPageStyles(theme);
  const [recipesPage, setRecipesPage] = useState<PaginatedRecipes>(
    snapshot.recipesPage,
  );
  const [paginationStatus, setPaginationStatus] = useState<
    'idle' | 'loading' | 'error'
  >('idle');
  const recipesPageRef = useRef<PaginatedRecipes>(snapshot.recipesPage);
  const paginationRequestInFlightRef = useRef(false);
  const isMountedRef = useRef(true);
  const hasUserInteractedRef = useRef(false);
  const listHeightRef = useRef(0);
  const contentHeightRef = useRef(0);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    recipesPageRef.current = snapshot.recipesPage;
    paginationRequestInFlightRef.current = false;
    hasUserInteractedRef.current = false;
    listHeightRef.current = 0;
    contentHeightRef.current = 0;
    setRecipesPage(snapshot.recipesPage);
    setPaginationStatus('idle');
  }, [snapshot]);

  const hasMoreRecipes = recipesPage.items.length < recipesPage.total;
  const restoredProgressCount = Object.keys(snapshot.progressById).length;

  const loadNextRecipesPage = async () => {
    const currentRecipesPage = recipesPageRef.current;

    if (
      paginationRequestInFlightRef.current ||
      currentRecipesPage.items.length >= currentRecipesPage.total
    ) {
      return;
    }

    paginationRequestInFlightRef.current = true;
    setPaginationStatus('loading');

    const result = await listRecipes(recipesRepository, {
      limit: currentRecipesPage.limit,
      skip: currentRecipesPage.items.length,
    });

    if (!isMountedRef.current) {
      return;
    }

    paginationRequestInFlightRef.current = false;

    if (!result.success) {
      setPaginationStatus('error');
      return;
    }

    setRecipesPage((currentPage) => {
      const nextPage: PaginatedRecipes = Object.freeze({
        items: [...currentPage.items, ...result.data.items],
        total: result.data.total,
        skip: result.data.skip,
        limit: result.data.limit,
      });

      recipesPageRef.current = nextPage;

      return nextPage;
    });
    setPaginationStatus('idle');
  };

  const maybeFillViewport = () => {
    if (
      !hasUserInteractedRef.current ||
      paginationStatus === 'error' ||
      paginationRequestInFlightRef.current
    ) {
      return;
    }

    if (
      listHeightRef.current > 0 &&
      contentHeightRef.current > 0 &&
      contentHeightRef.current <= listHeightRef.current &&
      recipesPageRef.current.items.length < recipesPageRef.current.total
    ) {
      void loadNextRecipesPage();
    }
  };

  const maybeLoadNextRecipesPageFromScroll = ({
    contentOffset,
    contentSize,
    layoutMeasurement,
  }: Pick<
    NativeScrollEvent,
    'contentOffset' | 'contentSize' | 'layoutMeasurement'
  >) => {
    if (!hasUserInteractedRef.current || paginationStatus === 'error') {
      return;
    }

    const distanceFromBottom =
      contentSize.height - (contentOffset.y + layoutMeasurement.height);

    if (distanceFromBottom <= PAGINATION_TRIGGER_DISTANCE) {
      void loadNextRecipesPage();
    }
  };

  const handleUserInteraction = () => {
    hasUserInteractedRef.current = true;
    maybeFillViewport();
  };

  const handleListLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    listHeightRef.current = nativeEvent.layout.height;
    maybeFillViewport();
  };

  const handleContentSizeChange = (_width: number, height: number) => {
    contentHeightRef.current = height;
    maybeFillViewport();
  };

  const handleEndReached = () => {
    if (!hasUserInteractedRef.current || paginationStatus === 'error') {
      return;
    }

    void loadNextRecipesPage();
  };

  const handleScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    hasUserInteractedRef.current = true;
    maybeLoadNextRecipesPageFromScroll(nativeEvent);
  };

  const handleRetryPagination = () => {
    void loadNextRecipesPage();
  };

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
          ListEmptyComponent={<RecipeListEmptyState />}
          ListFooterComponent={
            <RecipeListFooter
              hasMoreRecipes={hasMoreRecipes}
              onRetry={handleRetryPagination}
              paginationStatus={paginationStatus}
            />
          }
          ListHeaderComponent={
            <RecipeListHeader
              loadedRecipesCount={recipesPage.items.length}
              restoredProgressCount={restoredProgressCount}
            />
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
