import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import type { Recipe, RecipeStatus } from '@/core/domain/recipes';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipeListItemStyles } from './styles';

type RecipeListItemProps = {
  recipe: Recipe;
  status: RecipeStatus;
};

export function RecipeListItem({ recipe, status }: RecipeListItemProps) {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeListItemStyles(theme);

  const statusLabel =
    status === 'done'
      ? t('recipes.status.done')
      : status === 'in_progress'
        ? t('recipes.status.inProgress')
        : '';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          contentFit="cover"
          source={{ uri: recipe.image }}
          style={styles.thumbnail}
          transition={120}
        />
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {recipe.name}
          </Text>
          <Text numberOfLines={1} style={styles.meta}>
            {t('recipes.card.prepTimeLabel')}: {recipe.prepTimeMinutes}mn |{' '}
            {t('recipes.card.cookTimeLabel')}: {recipe.cookTimeMinutes}mn
          </Text>
          <Text numberOfLines={1} style={styles.meta}>
            {t('recipes.card.difficultyLabel')}: {recipe.difficulty}
          </Text>
          <Text numberOfLines={1} style={styles.meta}>
            {t('recipes.card.cuisineLabel')}: {recipe.cuisine}
          </Text>
          {status === 'not_started' ? null : (
            <View
              style={[
                styles.statusBadge,
                status === 'done'
                  ? styles.statusBadgeDone
                  : styles.statusBadgeInProgress,
              ]}
            >
              <View style={styles.statusDot} />
              <Text style={styles.statusLabel}>{statusLabel}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
