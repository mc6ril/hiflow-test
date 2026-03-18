import { useCallback, useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import type { PaginatedRecipes } from '@/features/recipes/domain/recipes';
import { useRecipesPagination } from '@/features/recipes/presentation/hooks/useRecipesPagination';
import { useRecipesProgress } from '@/features/recipes/presentation/hooks/useRecipesProgress';
import { useRecipesSearch } from '@/features/recipes/presentation/hooks/useRecipesSearch';
import type { Failure } from '@/shared/domain/failure';
import type { RequestStatus } from '@/shared/domain/requestStatus';
import type { TranslationKey } from '@/shared/i18n/types';

import type {
  RecipesPageStartupSnapshot,
  RecipesDependencies,
  UseRecipesPageControllerResult,
} from './types';
import { createInfiniteRecipesData, getRecipesQueryKey } from './utils';

type UseRecipesPageControllerParams = {
  dependencies: RecipesDependencies;
  snapshot: RecipesPageStartupSnapshot;
};

export const useRecipesPageController = ({
  dependencies,
  snapshot,
}: UseRecipesPageControllerParams): UseRecipesPageControllerResult => {
  const queryClient = useQueryClient();
  const {
    computeRecipeStatus,
    flattenRecipesPages,
    getNextRecipesPageOffset,
    loadRecipesPage,
    previewInstructionStepToggle,
    toRecipeProgressKey,
    toggleInstructionStep,
  } = dependencies;

  const {
    debouncedSearchQuery,
    hasActiveSearch,
    resetSearch,
    searchQuery,
    setSearchQuery,
  } = useRecipesSearch();

  const limit = snapshot.recipesPage.limit;
  const queryKey = getRecipesQueryKey(debouncedSearchQuery);

  const initialBrowseData = useMemo(() => {
    return createInfiniteRecipesData(snapshot.recipesPage);
  }, [snapshot.recipesPage]);

  const loadRecipesQueryPage = useCallback(
    async ({
      pageParam,
      signal,
    }: {
      pageParam: number;
      signal: AbortSignal;
    }) => {
      const result = await loadRecipesPage(
        {
          page: {
            limit,
            skip: pageParam,
          },
          query: debouncedSearchQuery,
        },
        {
          signal,
        },
      );

      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
    [debouncedSearchQuery, limit, loadRecipesPage],
  );

  const recipesQuery = useInfiniteQuery<
    PaginatedRecipes,
    Failure,
    {
      pageParams: number[];
      pages: PaginatedRecipes[];
    },
    ReturnType<typeof getRecipesQueryKey>,
    number
  >({
    getNextPageParam: getNextRecipesPageOffset,
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) =>
      loadRecipesQueryPage({
        pageParam,
        signal,
      }),
    queryKey,
    staleTime: debouncedSearchQuery.length === 0 ? Infinity : 0,
    ...(debouncedSearchQuery.length === 0
      ? {
          initialData: initialBrowseData,
        }
      : {}),
  });

  const recipesPage = useMemo(() => {
    return flattenRecipesPages(recipesQuery.data?.pages, limit);
  }, [flattenRecipesPages, limit, recipesQuery.data?.pages]);

  const hasMoreRecipes = recipesQuery.hasNextPage ?? false;

  const paginationStatus: RequestStatus = recipesQuery.isFetchingNextPage
    ? 'loading'
    : recipesQuery.isFetchNextPageError
      ? 'error'
      : 'idle';

  const searchStatus: RequestStatus =
    debouncedSearchQuery.length === 0
      ? 'idle'
      : recipesQuery.isPending
        ? 'loading'
        : recipesQuery.isError
          ? 'error'
          : 'idle';

  const emptyStateMessageKey: TranslationKey =
    searchStatus === 'error'
      ? 'recipes.search.error'
      : hasActiveSearch
        ? 'recipes.search.empty'
        : 'recipes.empty';

  const loadNextPage = useCallback(() => {
    if (!hasMoreRecipes) {
      return;
    }

    return recipesQuery.fetchNextPage();
  }, [hasMoreRecipes, recipesQuery]);

  const {
    handleContentSizeChange,
    handleEndReached,
    handleListLayout,
    handleRetryPagination,
    handleScroll,
    handleUserInteraction,
  } = useRecipesPagination({
    hasMoreRecipes,
    isPaginationError: paginationStatus === 'error',
    isPaginationLoading: paginationStatus === 'loading',
    loadNextPage,
    sourceKey: debouncedSearchQuery,
  });

  const recipesProgress = useRecipesProgress({
    initialProgressById: snapshot.progressById,
    previewInstructionStepToggle,
    toRecipeProgressKey,
    toggleInstructionStep,
  });
  const recipes = useMemo(() => {
    return recipesPage.items.map((recipe) =>
      Object.freeze({
        recipe,
        status: computeRecipeStatus(
          recipesProgress.progressById[toRecipeProgressKey(recipe.id)],
          recipe.instructions.length,
        ),
      }),
    );
  }, [
    computeRecipeStatus,
    recipesPage.items,
    recipesProgress.progressById,
    toRecipeProgressKey,
  ]);
  const selectedRecipeStatus =
    recipesProgress.selectedRecipe === null
      ? null
      : computeRecipeStatus(
          recipesProgress.selectedRecipeProgress,
          recipesProgress.selectedRecipe.instructions.length,
        );

  useEffect(() => {
    queryClient.setQueryData(
      getRecipesQueryKey(''),
      createInfiniteRecipesData(snapshot.recipesPage),
    );
    resetSearch();
  }, [queryClient, resetSearch, snapshot]);

  return {
    emptyStateMessageKey,
    handleContentSizeChange,
    handleEndReached,
    handleListLayout,
    handleRetryPagination,
    handleScroll,
    handleUserInteraction,
    hasMoreRecipes,
    isSearchLoading: searchStatus === 'loading',
    paginationStatus,
    recipes,
    recipesPage,
    searchQuery,
    selectedRecipeStatus,
    setSearchQuery,
    ...recipesProgress,
  };
};
