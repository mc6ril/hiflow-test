import type {
  ListRecipesParams,
  PaginatedRecipesResult,
  RecipeProgress,
  RecipeProgressById,
  SearchRecipesParams,
} from '@/features/recipes/domain/recipes';
import type { Result } from '@/shared/domain/result';

export type RecipesRequestOptions = {
  signal?: AbortSignal;
};

export type RecipesRepository = {
  /*
   * List recipes.
   */
  list: (
    params: ListRecipesParams,
    options?: RecipesRequestOptions,
  ) => Promise<PaginatedRecipesResult>;
  /**
   * Search recipes.
   */
  search: (
    params: SearchRecipesParams,
    options?: RecipesRequestOptions,
  ) => Promise<PaginatedRecipesResult>;
  /*
   * Read all progress.
   */
  readAllProgress: () => Promise<Result<RecipeProgressById>>;
  /*
   * Save progress.
   */
  saveProgress: (progress: RecipeProgress) => Promise<Result<void>>;
};
