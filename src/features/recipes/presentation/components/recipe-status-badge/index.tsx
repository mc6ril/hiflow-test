import { memo } from 'react';
import type { ViewProps } from 'react-native';

import type { RecipeStatus } from '@/features/recipes/domain/recipes';
import { UiBadge } from '@/presentation/components/ui/badge';
import { useI18n } from '@/presentation/hooks/useI18n';

type RecipeStatusBadgeProps = {
  accessibilityLabel?: string;
  accessibilityRole?: ViewProps['accessibilityRole'];
  status: RecipeStatus;
  testID?: string;
};

export const RecipeStatusBadge = memo(
  ({
    accessibilityLabel,
    accessibilityRole = 'text',
    status,
    testID,
  }: RecipeStatusBadgeProps) => {
    const { t } = useI18n();

    if (status === 'not_started') {
      return null;
    }

    const statusLabel =
      status === 'done'
        ? t('recipes.status.done')
        : t('recipes.status.inProgress');

    return (
      <UiBadge
        accessibilityLabel={accessibilityLabel ?? statusLabel}
        accessibilityRole={accessibilityRole}
        accessible
        label={statusLabel}
        showDot
        testID={testID}
        tone={status === 'done' ? 'success' : 'warning'}
        variant="solid"
      />
    );
  },
);

RecipeStatusBadge.displayName = 'RecipeStatusBadge';
