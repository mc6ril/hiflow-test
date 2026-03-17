import { Image } from 'expo-image';
import { Pressable, ScrollView, Text, View } from 'react-native';

import type {
  Recipe,
  RecipeProgress,
  RecipeStatus,
} from '@/core/domain/recipes';
import { RecipeStatusBadge } from '@/presentation/components/recipe/recipe-status-badge';
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

  return (
    <View style={styles.overlay} testID="recipe-detail-overlay">
      <View style={styles.header}>
        <Text style={styles.screenTitle}>{t('app.name')}</Text>
        <Text style={styles.recipeTitle} testID="recipe-detail-title">
          {recipe.name}
        </Text>
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
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>
              {t('recipes.card.prepTimeLabel')}
            </Text>
            <Text style={styles.metaValue}>{recipe.prepTimeMinutes} mn</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>
              {t('recipes.card.cookTimeLabel')}
            </Text>
            <Text style={styles.metaValue}>{recipe.cookTimeMinutes} mn</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>
              {t('recipes.card.difficultyLabel')}
            </Text>
            <Text style={styles.metaValue}>{recipe.difficulty}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>
              {t('recipes.card.cuisineLabel')}
            </Text>
            <Text style={styles.metaValue}>{recipe.cuisine}</Text>
          </View>
        </View>

        <RecipeStatusBadge
          status={status}
          testID="recipe-detail-status-badge"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('recipes.detail.ingredientsTitle')}
          </Text>
          <View style={styles.ingredientsList}>
            {recipe.ingredients.map((ingredient, index) => (
              <View
                key={`${recipe.id}-ingredient-${index}`}
                style={styles.ingredientRow}
              >
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>
              {t('recipes.detail.instructionsTitle')}
            </Text>
          </View>

          <View style={styles.stepsList}>
            {recipe.instructions.map((instruction, index) => {
              const isCompleted =
                progress?.completedStepIndexes.includes(index) ?? false;

              return (
                <Pressable
                  disabled={isSavingProgress}
                  key={`${recipe.id}-instruction-${index}`}
                  onPress={() => {
                    onToggleInstructionStep(index);
                  }}
                  style={({ pressed }) => [
                    styles.stepCard,
                    isCompleted ? styles.stepCardCompleted : null,
                    pressed ? styles.stepCardPressed : null,
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
                    <Text style={styles.stepLabel}>
                      {t('recipes.detail.stepLabel')} {index + 1}
                    </Text>
                    <Text
                      style={[
                        styles.stepText,
                        isCompleted ? styles.stepTextCompleted : null,
                      ]}
                    >
                      {instruction}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {progressErrorMessage ? (
            <Text style={styles.errorMessage}>{progressErrorMessage}</Text>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [
            styles.closeButton,
            pressed ? styles.closeButtonPressed : null,
          ]}
          testID="recipe-detail-close"
        >
          <Text style={styles.closeButtonLabel}>{t('common.close')}</Text>
        </Pressable>
      </View>
    </View>
  );
};
