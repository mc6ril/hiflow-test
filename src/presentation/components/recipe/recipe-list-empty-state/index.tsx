import { Text } from 'react-native';

import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipeListEmptyStateStyles } from './styles';

export const RecipeListEmptyState = () => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeListEmptyStateStyles(theme);

  return <Text style={styles.label}>{t('recipes.empty')}</Text>;
};
