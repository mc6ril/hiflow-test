import { Text, View } from 'react-native';

import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipeListHeaderStyles } from './styles';

type RecipeListHeaderProps = {
  loadedRecipesCount: number;
  restoredProgressCount: number;
};

export const RecipeListHeader = ({
  loadedRecipesCount,
  restoredProgressCount,
}: RecipeListHeaderProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeListHeaderStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('app.name')}</Text>
      <Text style={styles.subtitle}>{t('recipes.subtitle')}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{loadedRecipesCount}</Text>
          <Text style={styles.statLabel}>{t('recipes.loaded')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{restoredProgressCount}</Text>
          <Text style={styles.statLabel}>{t('recipes.restoredProgress')}</Text>
        </View>
      </View>
    </View>
  );
};
