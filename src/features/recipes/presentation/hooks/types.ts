import type {
  PaginatedRecipes,
  RecipeStatus,
  Recipe,
  RecipeProgress,
  RecipeProgressById,
  RecipeProgressKey,
  RecipeProgressResult,
  ToggleRecipeStepParams,
  ListRecipesParams,
  PaginatedRecipesResult,
} from '@/features/recipes/domain/recipes';
import type { RecipesStartupSnapshot } from '@/features/recipes/domain/startup';
import type { RequestStatus } from '@/shared/domain/requestStatus';
import type { RecipesListInteractions } from '@/features/recipes/presentation/hooks/interactionTypes';
import type { TranslationKey } from '@/shared/i18n/types';

export type LoadRecipesPage = (
  params: {
    page: ListRecipesParams;
    query: string;
  },
  options?: {
    signal?: AbortSignal;
  },
) => Promise<PaginatedRecipesResult>;

export type ToggleInstructionStep = (
  params: ToggleRecipeStepParams,
) => Promise<RecipeProgressResult>;

export type PreviewInstructionStepToggle = (
  params: ToggleRecipeStepParams,
) => RecipeProgress;

export type ToRecipeProgressKey = (recipeId: number) => RecipeProgressKey;

export type ComputeRecipeStatus = (
  progress: RecipeProgress | null | undefined,
  totalSteps: number,
) => RecipeStatus;

export type FlattenRecipesPages = (
  pages: PaginatedRecipes[] | undefined,
  fallbackLimit: number,
) => PaginatedRecipes;

export type GetNextRecipesPageOffset = (
  lastPage: PaginatedRecipes,
  allPages: PaginatedRecipes[],
) => number | undefined;

export type RecipesDependencies = {
  computeRecipeStatus: ComputeRecipeStatus;
  flattenRecipesPages: FlattenRecipesPages;
  getNextRecipesPageOffset: GetNextRecipesPageOffset;
  loadRecipesPage: LoadRecipesPage;
  previewInstructionStepToggle: PreviewInstructionStepToggle;
  toRecipeProgressKey: ToRecipeProgressKey;
  toggleInstructionStep: ToggleInstructionStep;
};

export type RecipeListItemViewModel = {
  recipe: Recipe;
  status: RecipeStatus;
};

export type RecipesPaginationState = RecipesListInteractions & {
  hasMoreRecipes: boolean;
  paginationStatus: RequestStatus;
  recipesPage: PaginatedRecipes;
};

export type RecipesProgressState = {
  handleCloseRecipeDetails: () => void;
  handleOpenRecipeDetails: (recipe: Recipe) => void;
  handleToggleInstructionStep: (stepIndex: number) => void;
  isRecipeProgressSaving: boolean;
  progressById: RecipeProgressById;
  selectedRecipe: Recipe | null;
  selectedRecipeProgress: RecipeProgress | null;
  selectedRecipeProgressErrorMessageKey: TranslationKey | null;
};

export type UseRecipesPageControllerResult = RecipesPaginationState &
  RecipesProgressState & {
    emptyStateMessageKey: TranslationKey;
    isSearchLoading: boolean;
    recipes: RecipeListItemViewModel[];
    searchQuery: string;
    selectedRecipeStatus: RecipeStatus | null;
    setSearchQuery: (value: string) => void;
  };

export type RecipesPageStartupSnapshot = RecipesStartupSnapshot;
