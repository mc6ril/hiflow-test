import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  computeRecipeStatus,
  toRecipeProgressKey,
  type Recipe,
  type RecipeStatus,
} from '@/core/domain/recipes';
import type { AppStartupSnapshot } from '@/core/usecases/startApp';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipesPageStyles } from './styles';

type RecipesPageProps = {
  snapshot: AppStartupSnapshot;
};

const totalRecipeMinutes = (recipe: Recipe): number =>
  recipe.prepTimeMinutes + recipe.cookTimeMinutes;

export function RecipesPage({ snapshot }: RecipesPageProps) {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipesPageStyles(theme);

  const translateStatus = (status: RecipeStatus): string => {
    switch (status) {
      case 'done':
        return t('recipes.status.done');
      case 'in_progress':
        return t('recipes.status.inProgress');
      default:
        return t('recipes.status.notStarted');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.content}
        data={snapshot.recipesPage.items}
        keyExtractor={(item) => `${item.id}`}
        ListEmptyComponent={
          <Text style={styles.emptyState}>{t('recipes.empty')}</Text>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>{t('app.name')}</Text>
            <Text style={styles.subtitle}>{t('recipes.subtitle')}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {snapshot.recipesPage.items.length}
                </Text>
                <Text style={styles.statLabel}>{t('recipes.loaded')}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {Object.keys(snapshot.progressById).length}
                </Text>
                <Text style={styles.statLabel}>
                  {t('recipes.restoredProgress')}
                </Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const status = computeRecipeStatus(
            snapshot.progressById[toRecipeProgressKey(item.id)],
            item.instructions.length,
          );

          return (
            <View style={styles.recipeCard}>
              <View style={styles.recipeTopRow}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusLabel}>
                    {translateStatus(status)}
                  </Text>
                </View>
              </View>
              <Text style={styles.recipeMeta}>
                {item.cuisine} · {item.difficulty} · {totalRecipeMinutes(item)}{' '}
                min
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
