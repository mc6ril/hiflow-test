import {
  computeRecipeStatus,
  toRecipeProgressKey,
  type RecipeProgress,
  type RecipeProgressById,
} from '@/core/domain/recipes';

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
});
