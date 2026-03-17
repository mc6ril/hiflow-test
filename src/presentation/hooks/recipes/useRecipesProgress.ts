import { useEffect, useRef, useState } from 'react';

import {
  toRecipeProgressKey,
  type Recipe,
  type RecipeProgressById,
} from '@/core/domain/recipes';
import type { RequestStatus } from '@/core/domain/requestStatus';
import type { RecipesRepository } from '@/core/ports/recipesRepository';
import { toggleInstructionStep as persistInstructionStepProgress } from '@/core/usecases/toggleInstructionStep';

import type { RecipesProgressState } from './types';

type UseRecipesProgressParams = {
  initialProgressById: RecipeProgressById;
  recipesRepository: RecipesRepository;
};

export const useRecipesProgress = ({
  initialProgressById,
  recipesRepository,
}: UseRecipesProgressParams): RecipesProgressState => {
  const [progressById, setProgressById] =
    useState<RecipeProgressById>(initialProgressById);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeProgressMutationStatus, setRecipeProgressMutationStatus] =
    useState<RequestStatus>('idle');
  const isMountedRef = useRef(true);
  const selectedRecipeIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
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

    setRecipeProgressMutationStatus('loading');

    const result = await persistInstructionStepProgress(recipesRepository, {
      recipeId,
      stepIndex,
      progress: progressById[recipeProgressKey] ?? null,
    });

    if (!isMountedRef.current) {
      return;
    }

    if (!result.success) {
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
