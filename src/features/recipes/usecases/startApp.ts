import type { RecipesRepository } from '@/features/recipes/domain/recipesRepository';
import type { ListRecipesParams } from '@/features/recipes/domain/recipes';
import type { RecipesStartupResult } from '@/features/recipes/domain/startup';
import { hydrateRecipeProgress } from '@/features/recipes/usecases/hydrateRecipeProgress';
import { listRecipes } from '@/features/recipes/usecases/listRecipes';
import { failure, unexpectedFailure } from '@/shared/domain/failure';
import { success } from '@/shared/domain/success';

export const startApp = async (
  repository: RecipesRepository,
  params: ListRecipesParams,
): Promise<RecipesStartupResult> => {
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
