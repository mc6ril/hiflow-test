import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  computeRecipeStatus,
  type PaginatedRecipes,
  toRecipeProgressKey,
} from '@/core/domain/recipes';
import { listRecipes } from '@/core/usecases/listRecipes';
import type { AppStartupSnapshot } from '@/core/usecases/startApp';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useRequiredDependencies } from '@/presentation/hooks/useRequiredDependencies';
import { useTheme } from '@/presentation/hooks/useTheme';

import { RecipeListItem } from './components/recipe-list-item';
import { createRecipesPageStyles } from './styles';

type RecipesPageProps = {
  snapshot: AppStartupSnapshot;
};

const PAGINATION_TRIGGER_DISTANCE = 120;

export function RecipesPage({ snapshot }: RecipesPageProps) {
  const { t } = useI18n();
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

  const handleListLayout = ({
    nativeEvent,
  }: {
    nativeEvent: { layout: { height: number } };
  }) => {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.listViewport}>
        <FlatList
          contentContainerStyle={styles.content}
          data={recipesPage.items}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={
            <Text style={styles.emptyState}>{t('recipes.empty')}</Text>
          }
          ListFooterComponent={
            paginationStatus === 'error' ? (
              <View style={styles.paginationErrorCard}>
                <Text style={styles.paginationMessage}>
                  {t('recipes.paginationError')}
                </Text>
                <Pressable
                  onPress={handleRetryPagination}
                  style={styles.paginationRetryButton}
                  testID="recipes-pagination-retry"
                >
                  <Text style={styles.paginationRetryButtonLabel}>
                    {t('common.retry')}
                  </Text>
                </Pressable>
              </View>
            ) : hasMoreRecipes ? (
              <View style={styles.paginationSpacer} />
            ) : null
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>{t('app.name')}</Text>
              <Text style={styles.subtitle}>{t('recipes.subtitle')}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {recipesPage.items.length}
                  </Text>
                  <Text style={styles.statLabel}>{t('recipes.loaded')}</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {Object.keys(snapshot.progressById).length}
                  </Text>
                  <Text style={styles.statLabel}>
                    {t('recipes.restoredProgress')}
                  </Text>
                </View>
              </View>
            </View>
          }
          onContentSizeChange={handleContentSizeChange}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onLayout={handleListLayout}
          onScroll={handleScroll}
          onScrollBeginDrag={handleUserInteraction}
          onTouchStart={handleUserInteraction}
          scrollEventThrottle={16}
          testID="recipes-list"
          renderItem={({ item }) => {
            const status = computeRecipeStatus(
              snapshot.progressById[toRecipeProgressKey(item.id)],
              item.instructions.length,
            );

            return <RecipeListItem recipe={item} status={status} />;
          }}
        />
        {paginationStatus === 'loading' ? (
          <View pointerEvents="none" style={styles.paginationLoadingOverlay}>
            <ActivityIndicator color={theme.colors.accent} size="small" />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
