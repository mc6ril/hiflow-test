import type {
  RecipeProgressResult,
  ToggleRecipeStepParams,
} from '@/features/recipes/domain/recipes';
import type { RecipesRepository } from '@/features/recipes/domain/recipesRepository';
import { success } from '@/shared/domain/success';

import { previewInstructionStepToggle } from './previewInstructionStepToggle';

export const toggleInstructionStep = async (
  repository: RecipesRepository,
  params: ToggleRecipeStepParams,
): Promise<RecipeProgressResult> => {
  const nextProgress = previewInstructionStepToggle(params);
  const saveResult = await repository.saveProgress(nextProgress);

  if (!saveResult.success) {
    return saveResult;
  }

  return success(nextProgress);
};
