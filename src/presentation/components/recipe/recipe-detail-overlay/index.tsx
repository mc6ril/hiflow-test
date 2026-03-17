import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';

import type {
  Recipe,
  RecipeProgress,
  RecipeStatus,
} from '@/core/domain/recipes';
import { RecipeStatusBadge } from '@/presentation/components/recipe/recipe-status-badge';
import { UiButton } from '@/presentation/components/ui/button';
import { UiCard } from '@/presentation/components/ui/card';
import { UiPressableCard } from '@/presentation/components/ui/pressable-card';
import { UiText } from '@/presentation/components/ui/text';
import { UiTitle } from '@/presentation/components/ui/title';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipeDetailOverlayStyles } from './styles';

type RecipeDetailOverlayProps = {
  isSavingProgress: boolean;
  onClose: () => void;
  onToggleInstructionStep: (stepIndex: number) => void;
  progress: RecipeProgress | null;
  progressErrorMessage?: string | null;
  recipe: Recipe;
  status: RecipeStatus;
};

export const RecipeDetailOverlay = ({
  isSavingProgress,
  onClose,
  onToggleInstructionStep,
  progress,
  progressErrorMessage,
  recipe,
  status,
}: RecipeDetailOverlayProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeDetailOverlayStyles(theme);
  const metaItems = [
    {
      label: t('recipes.card.prepTimeLabel'),
      value: `${recipe.prepTimeMinutes} mn`,
    },
    {
      label: t('recipes.card.cookTimeLabel'),
      value: `${recipe.cookTimeMinutes} mn`,
    },
    {
      label: t('recipes.card.difficultyLabel'),
      value: recipe.difficulty,
    },
    {
      label: t('recipes.card.cuisineLabel'),
      value: recipe.cuisine,
    },
  ];

  return (
    <View style={styles.overlay} testID="recipe-detail-overlay">
      <View style={styles.header}>
        <UiText align="center" tone="muted" variant="eyebrow">
          {t('app.name')}
        </UiText>
        <UiTitle align="center" level={3} testID="recipe-detail-title">
          {recipe.name}
        </UiTitle>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          contentFit="cover"
          source={{ uri: recipe.image }}
          style={styles.heroImage}
          transition={120}
        />

        <View style={styles.metaGrid}>
          {metaItems.map((item) => (
            <UiCard
              key={item.label}
              padded={false}
              radius="md"
              style={styles.metaCard}
            >
              <UiText tone="muted" variant="caption">
                {item.label}
              </UiText>
              <UiText>{item.value}</UiText>
            </UiCard>
          ))}
        </View>

        <RecipeStatusBadge
          status={status}
          testID="recipe-detail-status-badge"
        />

        <View style={styles.section}>
          <UiText variant="eyebrow" weight="semibold">
            {t('recipes.detail.ingredientsTitle')}
          </UiText>
          <View style={styles.ingredientsList}>
            {recipe.ingredients.map((ingredient, index) => (
              <View
                key={`${recipe.id}-ingredient-${index}`}
                style={styles.ingredientRow}
              >
                <View style={styles.ingredientBullet} />
                <UiText style={styles.ingredientText}>{ingredient}</UiText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <UiText variant="eyebrow" weight="semibold">
              {t('recipes.detail.instructionsTitle')}
            </UiText>
          </View>

          <View style={styles.stepsList}>
            {recipe.instructions.map((instruction, index) => {
              const isCompleted =
                progress?.completedStepIndexes.includes(index) ?? false;

              return (
                <UiPressableCard
                  disabled={isSavingProgress}
                  key={`${recipe.id}-instruction-${index}`}
                  onPress={() => {
                    onToggleInstructionStep(index);
                  }}
                  padded={false}
                  style={[
                    styles.stepCard,
                    isCompleted ? styles.stepCardCompleted : null,
                  ]}
                  testID={`recipe-step-${index}`}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isCompleted ? styles.checkboxCompleted : null,
                    ]}
                  >
                    {isCompleted ? <View style={styles.checkboxMark} /> : null}
                  </View>
                  <View style={styles.stepContent}>
                    <UiText tone="muted" variant="caption">
                      {t('recipes.detail.stepLabel')} {index + 1}
                    </UiText>
                    <UiText
                      style={[isCompleted ? styles.stepTextCompleted : null]}
                    >
                      {instruction}
                    </UiText>
                  </View>
                </UiPressableCard>
              );
            })}
          </View>

          {progressErrorMessage ? (
            <UiText style={styles.errorMessage} variant="caption">
              {progressErrorMessage}
            </UiText>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <UiButton
          fullWidth
          label={t('common.close')}
          onPress={onClose}
          size="lg"
          testID="recipe-detail-close"
        />
      </View>
    </View>
  );
};
