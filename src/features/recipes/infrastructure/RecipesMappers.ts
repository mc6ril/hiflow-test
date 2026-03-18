import type {
  PaginatedRecipes,
  Recipe,
  RecipeProgress,
  RecipeProgressById,
} from '@/features/recipes/domain/recipes';
import { toRecipeProgressKey } from '@/features/recipes/domain/recipes';
import { isArrayOf, isJsonRecord, isNumber, isString } from '@/shared/utils';

const parseRecipe = (value: unknown): Recipe | null => {
  if (!isJsonRecord(value)) {
    return null;
  }

  const {
    id,
    name,
    image,
    prepTimeMinutes,
    cookTimeMinutes,
    difficulty,
    cuisine,
    rating,
    ingredients,
    instructions,
  } = value;

  if (
    !isNumber(id) ||
    !isString(name) ||
    !isString(image) ||
    !isNumber(prepTimeMinutes) ||
    !isNumber(cookTimeMinutes) ||
    !isString(difficulty) ||
    !isString(cuisine) ||
    !isNumber(rating) ||
    !isArrayOf(ingredients, isString) ||
    !isArrayOf(instructions, isString)
  ) {
    return null;
  }

  return {
    id,
    name,
    image,
    prepTimeMinutes,
    cookTimeMinutes,
    difficulty,
    cuisine,
    rating,
    ingredients,
    instructions,
  };
};

export const parsePaginatedRecipes = (
  value: unknown,
): PaginatedRecipes | null => {
  if (!isJsonRecord(value)) {
    return null;
  }

  const { recipes, total, skip, limit } = value;

  if (
    !Array.isArray(recipes) ||
    !isNumber(total) ||
    !isNumber(skip) ||
    !isNumber(limit)
  ) {
    return null;
  }

  const items: Recipe[] = [];

  for (const recipe of recipes) {
    const parsedRecipe = parseRecipe(recipe);

    if (!parsedRecipe) {
      return null;
    }

    items.push(parsedRecipe);
  }

  return {
    items,
    total,
    skip,
    limit,
  };
};

const parseRecipeProgress = (value: unknown): RecipeProgress | null => {
  if (!isJsonRecord(value)) {
    return null;
  }

  const { recipeId, completedStepIndexes, updatedAt } = value;

  if (
    !isNumber(recipeId) ||
    !isArrayOf(completedStepIndexes, isNumber) ||
    !isString(updatedAt)
  ) {
    return null;
  }

  return {
    recipeId,
    completedStepIndexes,
    updatedAt,
  };
};

export const parseRecipeProgressById = (
  value: unknown,
): RecipeProgressById | null => {
  if (!isJsonRecord(value)) {
    return null;
  }

  const progressById: Partial<RecipeProgressById> = {};

  for (const [key, entry] of Object.entries(value)) {
    const parsedProgress = parseRecipeProgress(entry);

    if (
      !parsedProgress ||
      toRecipeProgressKey(parsedProgress.recipeId) !== key
    ) {
      return null;
    }

    progressById[key as keyof RecipeProgressById] = parsedProgress;
  }

  return progressById as RecipeProgressById;
};
