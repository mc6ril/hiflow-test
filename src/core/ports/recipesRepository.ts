import type {
  ListRecipesParams,
  PaginatedRecipesResult,
  RecipeProgress,
  RecipeProgressById,
  SearchRecipesParams,
} from '@/core/domain/recipes';
import type { Result } from '@/core/domain/result';

export type RecipesRepository = {
  list: (params: ListRecipesParams) => Promise<PaginatedRecipesResult>;
  search: (params: SearchRecipesParams) => Promise<PaginatedRecipesResult>;
  readAllProgress: () => Promise<Result<RecipeProgressById>>;
  saveProgress: (progress: RecipeProgress) => Promise<Result<void>>;
};
