import { memo } from 'react';
import { Image } from 'expo-image';
import type { PressableProps } from 'react-native';
import { View } from 'react-native';

import type { Recipe, RecipeStatus } from '@/features/recipes/domain/recipes';
import { RecipeStatusBadge } from '@/features/recipes/presentation/components/recipe-status-badge';
import { UiPressableCard } from '@/presentation/components/ui/pressable-card';
import { UiText } from '@/presentation/components/ui/text';
import { UiTitle } from '@/presentation/components/ui/title';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';
import type { TranslationKey } from '@/shared/i18n/types';

import { createStyles } from './styles';

type RecipeListItemProps = {
  accessibilityLabel?: string;
  accessibilityRole?: PressableProps['accessibilityRole'];
  onPress: () => void;
  recipe: Recipe;
  status: RecipeStatus;
};

const STATUS_TRANSLATION_KEY_BY_STATUS: Record<RecipeStatus, TranslationKey> =
  Object.freeze({
    done: 'recipes.status.done',
    in_progress: 'recipes.status.inProgress',
    not_started: 'recipes.status.notStarted',
  });

export const RecipeListItem = memo(
  ({
    accessibilityLabel,
    accessibilityRole = 'button',
    onPress,
    recipe,
    status,
  }: RecipeListItemProps) => {
    const { t } = useI18n();
    const theme = useTheme();
    const styles = createStyles(theme);
    const statusLabel = t(STATUS_TRANSLATION_KEY_BY_STATUS[status]);
    const defaultRecipeAccessibilityLabel = [
      recipe.name,
      `${t('recipes.card.prepTimeLabel')}: ${recipe.prepTimeMinutes}mn`,
      `${t('recipes.card.cookTimeLabel')}: ${recipe.cookTimeMinutes}mn`,
      `${t('recipes.card.difficultyLabel')}: ${recipe.difficulty}`,
      `${t('recipes.card.cuisineLabel')}: ${recipe.cuisine}`,
      statusLabel,
    ].join('. ');
    const recipeAccessibilityLabel =
      accessibilityLabel ?? `${defaultRecipeAccessibilityLabel}.`;

    return (
      <UiPressableCard
        accessibilityLabel={recipeAccessibilityLabel}
        accessibilityRole={accessibilityRole}
        onPress={onPress}
        style={styles.card}
        testID={`recipe-card-${recipe.id}`}
      >
        <View style={styles.row}>
          <Image
            contentFit="cover"
            source={{ uri: recipe.image }}
            style={styles.thumbnail}
            transition={120}
          />
          <View style={styles.content}>
            <UiTitle isHeader={false} level={3} numberOfLines={1}>
              {recipe.name}
            </UiTitle>
            <UiText numberOfLines={1} tone="muted" variant="caption">
              {t('recipes.card.prepTimeLabel')}: {recipe.prepTimeMinutes}mn |{' '}
              {t('recipes.card.cookTimeLabel')}: {recipe.cookTimeMinutes}mn
            </UiText>
            <UiText numberOfLines={1} tone="muted" variant="caption">
              {t('recipes.card.difficultyLabel')}: {recipe.difficulty}
            </UiText>
            <UiText numberOfLines={1} tone="muted" variant="caption">
              {t('recipes.card.cuisineLabel')}: {recipe.cuisine}
            </UiText>
            <RecipeStatusBadge status={status} />
          </View>
        </View>
      </UiPressableCard>
    );
  },
);

RecipeListItem.displayName = 'RecipeListItem';
