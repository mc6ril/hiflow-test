import { memo } from 'react';
import { View } from 'react-native';

import { UiButton } from '@/presentation/components/ui/button';
import { UiCard } from '@/presentation/components/ui/card';
import { UiText } from '@/presentation/components/ui/text';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';
import type { RequestStatus } from '@/shared/domain/requestStatus';

import { createStyles } from './styles';

type RecipeListFooterProps = {
  hasMoreRecipes: boolean;
  onRetry: () => void;
  paginationStatus: RequestStatus;
};

export const RecipeListFooter = memo(
  ({ hasMoreRecipes, onRetry, paginationStatus }: RecipeListFooterProps) => {
    const { t } = useI18n();
    const theme = useTheme();
    const styles = createStyles(theme);

    if (paginationStatus === 'error') {
      return (
        <UiCard radius="md" style={styles.errorCard}>
          <UiText align="center" tone="muted">
            {t('recipes.paginationError')}
          </UiText>
          <UiButton
            label={t('common.retry')}
            onPress={onRetry}
            style={styles.retryButton}
            testID="recipes-pagination-retry"
          />
        </UiCard>
      );
    }

    if (!hasMoreRecipes) {
      return null;
    }

    return <View style={styles.spacer} />;
  },
);

RecipeListFooter.displayName = 'RecipeListFooter';
