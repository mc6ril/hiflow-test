import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  RecipeProgressById,
  RecipeProgressByIdResult,
} from '@/features/recipes/domain/recipes';
import type { RecipesRepository } from '@/features/recipes/domain/recipesRepository';
import { toRecipeProgressKey } from '@/features/recipes/domain/recipes';
import { createFailure, failure } from '@/shared/domain/failure';
import { success } from '@/shared/domain/success';

import { parseRecipeProgressById } from './RecipesMappers';
import {
  createRecipesApiClient,
  type RecipesApiClient,
} from './RecipesApiClient';

const RECIPE_PROGRESS_STORAGE_KEY = 'recipe_progress_v1';

const readStoredProgress = async (): Promise<RecipeProgressByIdResult> => {
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

export const createRecipesRepository = (
  recipesApiClient: RecipesApiClient = createRecipesApiClient(),
): RecipesRepository => {
  return {
    list: (params, options) => recipesApiClient.list(params, options),
    search: (params, options) => recipesApiClient.search(params, options),
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
  };
};
