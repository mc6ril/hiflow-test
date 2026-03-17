import { Text } from 'react-native';

import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';
import type { TranslationKey } from '@/shared/i18n/types';

import { createRecipeListEmptyStateStyles } from './styles';

type RecipeListEmptyStateProps = {
  messageKey?: TranslationKey;
};

export const RecipeListEmptyState = ({
  messageKey = 'recipes.empty',
}: RecipeListEmptyStateProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeListEmptyStateStyles(theme);

  return <Text style={styles.label}>{t(messageKey)}</Text>;
};
