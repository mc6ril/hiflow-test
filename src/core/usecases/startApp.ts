import { unexpectedFailure } from '@/core/domain/failures';
import { failure, success, type Result } from '@/core/domain/result';
import type {
  ListRecipesParams,
  PaginatedRecipes,
  RecipeProgressById,
} from '@/core/domain/recipes';
import type { RecipesRepository } from '@/core/ports/recipesRepository';

import { hydrateRecipeProgress } from './hydrateRecipeProgress';
import { listRecipes } from './listRecipes';

export type AppStartupSnapshot = {
  progressById: RecipeProgressById;
  recipesPage: PaginatedRecipes;
};

export type AppStartupResult = Result<AppStartupSnapshot>;

export const startApp = async (
  repository: RecipesRepository,
  params: ListRecipesParams,
): Promise<AppStartupResult> => {
  try {
    const [progressResult, recipesResult] = await Promise.all([
      hydrateRecipeProgress(repository),
      listRecipes(repository, params),
    ]);

    if (!recipesResult.success) {
      return recipesResult;
    }

    return success(
      Object.freeze({
        progressById: progressResult.success ? progressResult.data : {},
        recipesPage: recipesResult.data,
      }),
    );
  } catch (cause) {
    return failure(
      unexpectedFailure('Unable to complete application startup.', cause),
    );
  }
};
