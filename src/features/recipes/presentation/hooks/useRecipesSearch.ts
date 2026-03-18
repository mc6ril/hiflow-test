import { useCallback, useEffect, useState } from 'react';

const EMPTY_SEARCH_QUERY = '';
const SEARCH_DEBOUNCE_DELAY_MS = 300;

type UseRecipesSearchResult = {
  debouncedSearchQuery: string;
  hasActiveSearch: boolean;
  resetSearch: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const useRecipesSearch = (): UseRecipesSearchResult => {
  const [searchQuery, setSearchQuery] = useState(EMPTY_SEARCH_QUERY);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(EMPTY_SEARCH_QUERY);

  const normalizedSearchQuery = searchQuery.trim();
  const hasActiveSearch = normalizedSearchQuery.length > 0;

  const resetSearch = useCallback(() => {
    setSearchQuery(EMPTY_SEARCH_QUERY);
    setDebouncedSearchQuery(EMPTY_SEARCH_QUERY);
  }, []);

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
    if (normalizedSearchQuery.length === 0) {
      setDebouncedSearchQuery(EMPTY_SEARCH_QUERY);
    }
  }, [normalizedSearchQuery]);

  return {
    debouncedSearchQuery,
    hasActiveSearch,
    resetSearch,
    searchQuery,
    setSearchQuery,
  };
};
