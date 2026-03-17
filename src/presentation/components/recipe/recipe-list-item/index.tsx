import { Image } from 'expo-image';
import { View } from 'react-native';

import type { Recipe, RecipeStatus } from '@/core/domain/recipes';
import { RecipeStatusBadge } from '@/presentation/components/recipe/recipe-status-badge';
import { UiPressableCard } from '@/presentation/components/ui/pressable-card';
import { UiText } from '@/presentation/components/ui/text';
import { UiTitle } from '@/presentation/components/ui/title';
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
    <UiPressableCard
      accessibilityRole="button"
      onPress={onPress}
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
};
