import { Pressable, Text, View } from 'react-native';

import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipeListFooterStyles } from './styles';

type RecipeListFooterProps = {
  hasMoreRecipes: boolean;
  onRetry: () => void;
  paginationStatus: 'idle' | 'loading' | 'error';
};

export const RecipeListFooter = ({
  hasMoreRecipes,
  onRetry,
  paginationStatus,
}: RecipeListFooterProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeListFooterStyles(theme);

  if (paginationStatus === 'error') {
    return (
      <View style={styles.errorCard}>
        <Text style={styles.message}>{t('recipes.paginationError')}</Text>
        <Pressable
          onPress={onRetry}
          style={styles.retryButton}
          testID="recipes-pagination-retry"
        >
          <Text style={styles.retryButtonLabel}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    );
  }

  if (!hasMoreRecipes) {
    return null;
  }

  return <View style={styles.spacer} />;
};
