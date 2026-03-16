import { toggleRecipeStep, type RecipeProgress } from '@/core/domain/recipes';
import { success, type Result } from '@/core/domain/result';
import type { RecipesRepository } from '@/core/ports/recipesRepository';

export type ToggleInstructionStepParams = {
  recipeId: number;
  stepIndex: number;
  progress?: RecipeProgress | null;
};

export const toggleInstructionStep = async (
  repository: RecipesRepository,
  params: ToggleInstructionStepParams,
): Promise<Result<RecipeProgress>> => {
  const nextProgress = toggleRecipeStep(params);
  const saveResult = await repository.saveProgress(nextProgress);

  if (!saveResult.success) {
    return saveResult;
  }

  return success(nextProgress);
};
