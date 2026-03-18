import {
  createRecipeProgress,
  computeRecipeStatus,
  toggleRecipeStep,
  toRecipeProgressKey,
  type RecipeProgress,
  type RecipeProgressById,
} from '@/features/recipes/domain/recipes';

describe('recipes domain', () => {
  const progress: RecipeProgress = {
    recipeId: 42,
    completedStepIndexes: [0],
    updatedAt: '2026-03-16T00:00:00.000Z',
  };

  it('uses stringified ids for progress maps so JSON round-trips stay addressable', () => {
    const progressById: RecipeProgressById = {
      [toRecipeProgressKey(progress.recipeId)]: progress,
    };

    const restored = JSON.parse(
      JSON.stringify(progressById),
    ) as RecipeProgressById;

    expect(restored[toRecipeProgressKey(progress.recipeId)]).toEqual(progress);
  });

  it('keeps zero-step recipes marked as done when progress already exists', () => {
    expect(computeRecipeStatus(progress, 0)).toBe('done');
  });

  it('keeps untouched recipes in not_started without forcing the UI to seed progress', () => {
    expect(computeRecipeStatus(undefined, 3)).toBe('not_started');
  });

  it('creates a new progress record when the first instruction is toggled', () => {
    const nextProgress = toggleRecipeStep({
      recipeId: 42,
      stepIndex: 0,
    });

    expect(nextProgress.recipeId).toBe(42);
    expect(nextProgress.completedStepIndexes).toEqual([0]);
    expect(nextProgress.updatedAt).toEqual(expect.any(String));
  });

  it('keeps newly created progress empty until the first toggle occurs', () => {
    expect(createRecipeProgress(42).completedStepIndexes).toEqual([]);
  });
});
