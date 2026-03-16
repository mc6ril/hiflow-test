import AsyncStorage from '@react-native-async-storage/async-storage';

import { createFailure } from '@/core/domain/failures';
import type {
  ListRecipesParams,
  PaginatedRecipes,
  RecipeProgressById,
  SearchRecipesParams,
} from '@/core/domain/recipes';
import { toRecipeProgressKey } from '@/core/domain/recipes';
import { failure, success, type Result } from '@/core/domain/result';
import type { RecipesRepository } from '@/core/ports/recipesRepository';

import {
  parsePaginatedRecipes,
  parseRecipeProgressById,
} from './RecipesMappers';

const DUMMY_JSON_BASE_URL = 'https://dummyjson.com';
const RECIPE_PROGRESS_STORAGE_KEY = 'recipe_progress_v1';

export type AppStartupConfig = {
  initialRecipesPageSize: number;
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
): Promise<Result<PaginatedRecipes>> => {
  try {
    const response = await fetch(buildRecipesUrl(path, params));

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
    return failure(createFailure('network', 'Unable to load recipes.', cause));
  }
};

const readStoredProgress = async (): Promise<Result<RecipeProgressById>> => {
  try {
    const serializedProgress = await AsyncStorage.getItem(
      RECIPE_PROGRESS_STORAGE_KEY,
    );

    if (!serializedProgress) {
      return success({});
    }

    const parsedProgress = parseRecipeProgressById(
      JSON.parse(serializedProgress) as unknown,
    );

    if (!parsedProgress) {
      return failure(
        createFailure(
          'storage',
          'Stored recipe progress payload is invalid.',
          serializedProgress,
        ),
      );
    }

    return success(parsedProgress);
  } catch (cause) {
    return failure(
      createFailure('storage', 'Unable to read recipe progress.', cause),
    );
  }
};

export const createRecipesRepository = (): RecipesRepository =>
  Object.freeze({
    list: (params) => fetchRecipesPage('/recipes', params),
    search: (params) => fetchRecipesPage('/recipes/search', params),
    readAllProgress: readStoredProgress,
    saveProgress: async (progress) => {
      const storedProgressResult = await readStoredProgress();

      if (!storedProgressResult.success) {
        return storedProgressResult;
      }

      const nextProgressById: RecipeProgressById = {
        ...storedProgressResult.data,
        [toRecipeProgressKey(progress.recipeId)]: progress,
      };

      try {
        await AsyncStorage.setItem(
          RECIPE_PROGRESS_STORAGE_KEY,
          JSON.stringify(nextProgressById),
        );

        return success<void>(undefined);
      } catch (cause) {
        return failure(
          createFailure('storage', 'Unable to save recipe progress.', cause),
        );
      }
    },
  });
