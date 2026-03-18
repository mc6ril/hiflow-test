import {
  toggleRecipeStep,
  type RecipeProgress,
  type ToggleRecipeStepParams,
} from '@/features/recipes/domain/recipes';

export const previewInstructionStepToggle = (
  params: ToggleRecipeStepParams,
): RecipeProgress => {
  return toggleRecipeStep(params);
};
