import type {
  PaginatedRecipes,
  RecipeProgressById,
} from '@/features/recipes/domain/recipes';
import type { Result } from '@/shared/domain/result';

export type RecipesStartupSnapshot = {
  progressById: RecipeProgressById;
  recipesPage: PaginatedRecipes;
};

export type RecipesStartupResult = Result<RecipesStartupSnapshot>;
