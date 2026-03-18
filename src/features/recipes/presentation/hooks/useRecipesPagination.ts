import { useEffect, useRef } from 'react';
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { UseRecipesPaginationResult } from './interactionTypes';

const PAGINATION_TRIGGER_DISTANCE = 120;

type UseRecipesPaginationParams = {
  hasMoreRecipes: boolean;
  isPaginationError: boolean;
  isPaginationLoading: boolean;
  loadNextPage: () => Promise<unknown> | void;
  sourceKey: string;
};

export const useRecipesPagination = ({
  hasMoreRecipes,
  isPaginationError,
  isPaginationLoading,
  loadNextPage,
  sourceKey,
}: UseRecipesPaginationParams): UseRecipesPaginationResult => {
  const hasUserInteractedRef = useRef(false);
  const listHeightRef = useRef(0);
  const contentHeightRef = useRef(0);

  const resetPaginationRuntime = () => {
    hasUserInteractedRef.current = false;
    listHeightRef.current = 0;
    contentHeightRef.current = 0;
  };

  useEffect(() => {
    resetPaginationRuntime();
  }, [sourceKey]);

  const maybeFillViewport = () => {
    if (
      !hasUserInteractedRef.current ||
      isPaginationError ||
      isPaginationLoading ||
      !hasMoreRecipes
    ) {
      return;
    }

    if (
      listHeightRef.current > 0 &&
      contentHeightRef.current > 0 &&
      contentHeightRef.current <= listHeightRef.current
    ) {
      void loadNextPage();
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
    if (
      !hasUserInteractedRef.current ||
      isPaginationError ||
      isPaginationLoading ||
      !hasMoreRecipes
    ) {
      return;
    }

    const distanceFromBottom =
      contentSize.height - (contentOffset.y + layoutMeasurement.height);

    if (distanceFromBottom <= PAGINATION_TRIGGER_DISTANCE) {
      void loadNextPage();
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
    if (
      !hasUserInteractedRef.current ||
      isPaginationError ||
      isPaginationLoading ||
      !hasMoreRecipes
    ) {
      return;
    }

    void loadNextPage();
  };

  const handleScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    hasUserInteractedRef.current = true;
    maybeLoadNextRecipesPageFromScroll(nativeEvent);
  };

  const handleRetryPagination = () => {
    if (isPaginationLoading || !hasMoreRecipes) {
      return;
    }

    void loadNextPage();
  };

  return {
    handleContentSizeChange,
    handleEndReached,
    handleListLayout,
    handleRetryPagination,
    handleScroll,
    handleUserInteraction,
  };
};
