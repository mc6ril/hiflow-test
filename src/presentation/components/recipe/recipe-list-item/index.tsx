import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import type { Recipe, RecipeStatus } from '@/core/domain/recipes';
import { RecipeStatusBadge } from '@/presentation/components/recipe/recipe-status-badge';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipeListItemStyles } from './styles';

type RecipeListItemProps = {
  onPress: () => void;
  recipe: Recipe;
  status: RecipeStatus;
};

export const RecipeListItem = ({
  onPress,
  recipe,
  status,
}: RecipeListItemProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeListItemStyles(theme);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.containerPressed : null,
      ]}
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
          <RecipeStatusBadge status={status} />
        </View>
      </View>
    </Pressable>
  );
};
