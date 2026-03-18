import {
  parsePaginatedRecipes,
  parseRecipeProgressById,
} from '@/features/recipes/infrastructure/RecipesMappers';

describe('RecipesMappers', () => {
  describe('parsePaginatedRecipes', () => {
    it('returns null when a recipe payload misses a required field', () => {
      expect(
        parsePaginatedRecipes({
          limit: 5,
          recipes: [
            {
              cookTimeMinutes: 20,
              cuisine: 'French',
              difficulty: 'Easy',
              id: 1,
              image: 'https://example.com/recipes/1.jpg',
              ingredients: ['Salt'],
              instructions: ['Mix'],
              prepTimeMinutes: 10,
              rating: 4.5,
            },
          ],
          skip: 0,
          total: 1,
        }),
      ).toBeNull();
    });

    it('returns null when ingredients or instructions are malformed', () => {
      expect(
        parsePaginatedRecipes({
          limit: 5,
          recipes: [
            {
              cookTimeMinutes: 20,
              cuisine: 'French',
              difficulty: 'Easy',
              id: 1,
              image: 'https://example.com/recipes/1.jpg',
              ingredients: ['Salt', 12],
              instructions: ['Mix'],
              name: 'Soup',
              prepTimeMinutes: 10,
              rating: 4.5,
            },
          ],
          skip: 0,
          total: 1,
        }),
      ).toBeNull();
    });

    it('returns null when pagination metadata is invalid', () => {
      expect(
        parsePaginatedRecipes({
          limit: '5',
          recipes: [],
          skip: 0,
          total: 0,
        }),
      ).toBeNull();
    });
  });

  describe('parseRecipeProgressById', () => {
    it('returns null when the record key does not match the recipe id', () => {
      expect(
        parseRecipeProgressById({
          42: {
            completedStepIndexes: [0],
            recipeId: 1,
            updatedAt: '2026-03-17T00:00:00.000Z',
          },
        }),
      ).toBeNull();
    });

    it('returns null when completed step indexes are malformed', () => {
      expect(
        parseRecipeProgressById({
          1: {
            completedStepIndexes: [0, '1'],
            recipeId: 1,
            updatedAt: '2026-03-17T00:00:00.000Z',
          },
        }),
      ).toBeNull();
    });
  });
});
