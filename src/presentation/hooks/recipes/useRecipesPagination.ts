import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import type {
  ListRecipesParams,
  PaginatedRecipes,
  PaginatedRecipesResult,
} from '@/core/domain/recipes';
import type { RequestStatus } from '@/core/domain/requestStatus';

import { UseRecipesPaginationResult } from './types';
import { appendRecipesPage } from './utils';

const PAGINATION_TRIGGER_DISTANCE = 120;

type UseRecipesPaginationParams = {
  initialPage: PaginatedRecipes;
  loadPage: (params: ListRecipesParams) => Promise<PaginatedRecipesResult>;
  sourceKey: string;
};

export const useRecipesPagination = ({
  initialPage,
  loadPage,
  sourceKey,
}: UseRecipesPaginationParams): UseRecipesPaginationResult => {
  const [recipesPage, setRecipesPage] = useState<PaginatedRecipes>(initialPage);
  const [paginationStatus, setPaginationStatus] =
    useState<RequestStatus>('idle');
  const recipesPageRef = useRef<PaginatedRecipes>(initialPage);
  const paginationRequestInFlightRef = useRef(false);
  const isMountedRef = useRef(true);
  const hasUserInteractedRef = useRef(false);
  const listHeightRef = useRef(0);
  const contentHeightRef = useRef(0);
  const sourceKeyRef = useRef(sourceKey);

  const replaceRecipesPage = useCallback((page: PaginatedRecipes) => {
    recipesPageRef.current = page;
    setRecipesPage(page);
  }, []);

  const resetPaginationState = useCallback(() => {
    paginationRequestInFlightRef.current = false;
    hasUserInteractedRef.current = false;
    listHeightRef.current = 0;
    contentHeightRef.current = 0;
    setPaginationStatus('idle');
  }, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    replaceRecipesPage(initialPage);
    resetPaginationState();
  }, [initialPage, replaceRecipesPage, resetPaginationState]);

  useEffect(() => {
    sourceKeyRef.current = sourceKey;
    resetPaginationState();
  }, [resetPaginationState, sourceKey]);

  const loadNextRecipesPage = async () => {
    const currentRecipesPage = recipesPageRef.current;
    const requestSourceKey = sourceKeyRef.current;

    if (
      paginationRequestInFlightRef.current ||
      currentRecipesPage.items.length >= currentRecipesPage.total
    ) {
      return;
    }

    paginationRequestInFlightRef.current = true;
    setPaginationStatus('loading');

    const result = await loadPage({
      limit: currentRecipesPage.limit,
      skip: currentRecipesPage.items.length,
    });

    if (!isMountedRef.current || requestSourceKey !== sourceKeyRef.current) {
      return;
    }

    paginationRequestInFlightRef.current = false;

    if (!result.success) {
      setPaginationStatus('error');
      return;
    }

    setRecipesPage((currentPage) => {
      const nextPage = appendRecipesPage(currentPage, result.data);

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

  return {
    handleContentSizeChange,
    handleEndReached,
    handleListLayout,
    handleRetryPagination,
    handleScroll,
    handleUserInteraction,
    hasMoreRecipes: recipesPage.items.length < recipesPage.total,
    paginationStatus,
    recipesPage,
    replaceRecipesPage,
  };
};
