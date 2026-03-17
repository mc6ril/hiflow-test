import { useEffect, useRef, useState } from 'react';

import type { PaginatedRecipes } from '@/core/domain/recipes';
import type { RequestStatus } from '@/core/domain/requestStatus';
import type { RecipesRepository } from '@/core/ports/recipesRepository';
import type { AppStartupSnapshot } from '@/core/usecases/startApp';
import type { TranslationKey } from '@/shared/i18n/types';

import { useRecipesPagination } from '@/presentation/hooks/recipes/useRecipesPagination';
import { UseRecipesPageStateResult } from './types';
import { createEmptyRecipesPage, loadRecipesPage } from './utils';

const EMPTY_SEARCH_QUERY = '';
const SEARCH_DEBOUNCE_DELAY_MS = 300;

type UseRecipesPageStateParams = {
  recipesRepository: RecipesRepository;
  snapshot: AppStartupSnapshot;
};

export const useRecipesPageState = ({
  recipesRepository,
  snapshot,
}: UseRecipesPageStateParams): UseRecipesPageStateResult => {
  const [searchQuery, setSearchQuery] = useState(EMPTY_SEARCH_QUERY);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(EMPTY_SEARCH_QUERY);
  const [searchStatus, setSearchStatus] = useState<RequestStatus>('idle');
  const browseRecipesPageRef = useRef<PaginatedRecipes>(snapshot.recipesPage);
  const isMountedRef = useRef(true);
  const pageModeRef = useRef<'browse' | 'search'>('browse');
  const searchRequestVersionRef = useRef(0);
  const normalizedSearchQuery = searchQuery.trim();
  const hasActiveSearch = normalizedSearchQuery.length > 0;
  const {
    handleContentSizeChange,
    handleEndReached,
    handleListLayout,
    handleRetryPagination,
    handleScroll,
    handleUserInteraction,
    hasMoreRecipes,
    paginationStatus,
    recipesPage,
    replaceRecipesPage,
  } = useRecipesPagination({
    initialPage: snapshot.recipesPage,
    loadPage: (params) =>
      loadRecipesPage(recipesRepository, debouncedSearchQuery, params),
    sourceKey: debouncedSearchQuery,
  });

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    browseRecipesPageRef.current = snapshot.recipesPage;
    pageModeRef.current = 'browse';
    searchRequestVersionRef.current += 1;
    setSearchQuery(EMPTY_SEARCH_QUERY);
    setDebouncedSearchQuery(EMPTY_SEARCH_QUERY);
    setSearchStatus('idle');
    replaceRecipesPage(snapshot.recipesPage);
  }, [replaceRecipesPage, snapshot]);

  useEffect(() => {
    if (pageModeRef.current === 'browse') {
      browseRecipesPageRef.current = recipesPage;
    }
  }, [recipesPage]);

  useEffect(() => {
    if (normalizedSearchQuery.length === 0) {
      setDebouncedSearchQuery(EMPTY_SEARCH_QUERY);
      return;
    }

    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(normalizedSearchQuery);
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [normalizedSearchQuery]);

  useEffect(() => {
    const query = debouncedSearchQuery;
    const requestVersion = searchRequestVersionRef.current + 1;

    searchRequestVersionRef.current = requestVersion;

    if (query.length === 0) {
      pageModeRef.current = 'browse';
      replaceRecipesPage(browseRecipesPageRef.current);
      setSearchStatus('idle');
      return;
    }

    const emptySearchPage = createEmptyRecipesPage(
      browseRecipesPageRef.current.limit,
    );

    pageModeRef.current = 'search';
    replaceRecipesPage(emptySearchPage);
    setSearchStatus('loading');

    const runSearch = async () => {
      const result = await loadRecipesPage(recipesRepository, query, {
        limit: browseRecipesPageRef.current.limit,
        skip: 0,
      });

      if (
        !isMountedRef.current ||
        requestVersion !== searchRequestVersionRef.current
      ) {
        return;
      }

      if (!result.success) {
        const failedSearchPage = createEmptyRecipesPage(
          browseRecipesPageRef.current.limit,
        );

        replaceRecipesPage(failedSearchPage);
        setSearchStatus('error');
        return;
      }

      replaceRecipesPage(result.data);
      setSearchStatus('idle');
    };

    void runSearch();
  }, [debouncedSearchQuery, recipesRepository, replaceRecipesPage]);

  const emptyStateMessageKey: TranslationKey =
    searchStatus === 'error'
      ? 'recipes.search.error'
      : hasActiveSearch
        ? 'recipes.search.empty'
        : 'recipes.empty';

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
    recipesPage,
    searchQuery,
    setSearchQuery,
  };
};
