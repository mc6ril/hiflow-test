import { useEffect, useRef, useState } from 'react';

import {
  type Recipe,
  type RecipeProgressById,
} from '@/features/recipes/domain/recipes';
import type { RequestStatus } from '@/shared/domain/requestStatus';

import type {
  PreviewInstructionStepToggle,
  RecipesProgressState,
  ToRecipeProgressKey,
  ToggleInstructionStep,
} from './types';

type UseRecipesProgressParams = {
  initialProgressById: RecipeProgressById;
  previewInstructionStepToggle: PreviewInstructionStepToggle;
  toRecipeProgressKey: ToRecipeProgressKey;
  toggleInstructionStep: ToggleInstructionStep;
};

export const useRecipesProgress = ({
  initialProgressById,
  previewInstructionStepToggle,
  toRecipeProgressKey,
  toggleInstructionStep,
}: UseRecipesProgressParams): RecipesProgressState => {
  const [progressById, setProgressById] =
    useState<RecipeProgressById>(initialProgressById);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeProgressMutationStatus, setRecipeProgressMutationStatus] =
    useState<RequestStatus>('idle');
  const progressStateVersionRef = useRef(0);
  const selectedRecipeIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      progressStateVersionRef.current += 1;
    };
  }, []);

  useEffect(() => {
    progressStateVersionRef.current += 1;
    setProgressById(initialProgressById);
    selectedRecipeIdRef.current = null;
    setSelectedRecipe(null);
    setRecipeProgressMutationStatus('idle');
  }, [initialProgressById]);

  const selectedRecipeProgress =
    selectedRecipe === null
      ? null
      : (progressById[toRecipeProgressKey(selectedRecipe.id)] ?? null);

  const handleOpenRecipeDetails = (recipe: Recipe) => {
    selectedRecipeIdRef.current = recipe.id;
    setSelectedRecipe(recipe);
    setRecipeProgressMutationStatus('idle');
  };

  const handleCloseRecipeDetails = () => {
    selectedRecipeIdRef.current = null;
    setSelectedRecipe(null);
    setRecipeProgressMutationStatus('idle');
  };

  const handleToggleInstructionStep = async (stepIndex: number) => {
    if (selectedRecipe === null || recipeProgressMutationStatus === 'loading') {
      return;
    }

    const recipeId = selectedRecipe.id;
    const recipeProgressKey = toRecipeProgressKey(recipeId);
    const previousProgressById = progressById;
    const previousProgress = previousProgressById[recipeProgressKey] ?? null;
    const optimisticProgress = previewInstructionStepToggle({
      recipeId,
      stepIndex,
      progress: previousProgress,
    });
    const progressStateVersion = progressStateVersionRef.current;

    setProgressById(
      Object.freeze({
        ...previousProgressById,
        [recipeProgressKey]: optimisticProgress,
      }),
    );

    setRecipeProgressMutationStatus('loading');

    const result = await toggleInstructionStep({
      recipeId,
      stepIndex,
      progress: previousProgress,
    });

    if (progressStateVersion !== progressStateVersionRef.current) {
      return;
    }

    if (!result.success) {
      setProgressById(previousProgressById);

      if (selectedRecipeIdRef.current === recipeId) {
        setRecipeProgressMutationStatus('error');
      }
      return;
    }

    setProgressById((currentProgressById) =>
      Object.freeze({
        ...currentProgressById,
        [recipeProgressKey]: result.data,
      }),
    );

    if (selectedRecipeIdRef.current === recipeId) {
      setRecipeProgressMutationStatus('idle');
    }
  };

  return {
    handleCloseRecipeDetails,
    handleOpenRecipeDetails,
    handleToggleInstructionStep,
    isRecipeProgressSaving: recipeProgressMutationStatus === 'loading',
    progressById,
    selectedRecipe,
    selectedRecipeProgress,
    selectedRecipeProgressErrorMessageKey:
      recipeProgressMutationStatus === 'error'
        ? 'recipes.detail.progressError'
        : null,
  };
};
