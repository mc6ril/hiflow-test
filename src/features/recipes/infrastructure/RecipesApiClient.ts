import type {
  ListRecipesParams,
  PaginatedRecipesResult,
  SearchRecipesParams,
} from '@/features/recipes/domain/recipes';
import type { RecipesRequestOptions } from '@/features/recipes/domain/recipesRepository';
import { createFailure, failure } from '@/shared/domain/failure';
import { success } from '@/shared/domain/success';

import { parsePaginatedRecipes } from './RecipesMappers';

export type RecipesApiClient = {
  list: (
    params: ListRecipesParams,
    options?: RecipesRequestOptions,
  ) => Promise<PaginatedRecipesResult>;
  search: (
    params: SearchRecipesParams,
    options?: RecipesRequestOptions,
  ) => Promise<PaginatedRecipesResult>;
};

const DUMMY_JSON_BASE_URL = 'https://dummyjson.com';

const isAbortError = (cause: unknown): cause is Error => {
  return cause instanceof Error && cause.name === 'AbortError';
};

const buildRecipesUrl = (
  path: '/recipes' | '/recipes/search',
  params: ListRecipesParams | SearchRecipesParams,
): string => {
  const url = new URL(path, DUMMY_JSON_BASE_URL);

  url.searchParams.set('limit', `${params.limit}`);
  url.searchParams.set('skip', `${params.skip}`);

  if ('query' in params) {
    url.searchParams.set('q', params.query);
  }

  return url.toString();
};

const fetchRecipesPage = async (
  path: '/recipes' | '/recipes/search',
  params: ListRecipesParams | SearchRecipesParams,
  options?: RecipesRequestOptions,
): Promise<PaginatedRecipesResult> => {
  try {
    const response = await fetch(buildRecipesUrl(path, params), {
      signal: options?.signal ?? null,
    });

    if (!response.ok) {
      return failure(
        createFailure(
          'network',
          `Recipes request failed with status ${response.status}.`,
          response,
        ),
      );
    }

    const data: unknown = await response.json();
    const paginatedRecipes = parsePaginatedRecipes(data);

    if (!paginatedRecipes) {
      return failure(
        createFailure(
          'validation',
          'Recipes response payload is invalid.',
          data,
        ),
      );
    }

    return success(paginatedRecipes);
  } catch (cause) {
    if (isAbortError(cause)) {
      return failure(
        createFailure('aborted', 'Recipes request was cancelled.', cause),
      );
    }

    return failure(createFailure('network', 'Unable to load recipes.', cause));
  }
};

export const createRecipesApiClient = (): RecipesApiClient => {
  return {
    list: (params, options) => fetchRecipesPage('/recipes', params, options),
    search: (params, options) =>
      fetchRecipesPage('/recipes/search', params, options),
  };
};
