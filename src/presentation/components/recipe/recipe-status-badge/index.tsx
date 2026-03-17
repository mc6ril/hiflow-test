import type { RecipeStatus } from '@/core/domain/recipes';
import { UiBadge } from '@/presentation/components/ui/badge';
import { useI18n } from '@/presentation/hooks/useI18n';

type RecipeStatusBadgeProps = {
  status: RecipeStatus;
  testID?: string;
};

export const RecipeStatusBadge = ({
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
      label={statusLabel}
      showDot
      testID={testID}
      tone={status === 'done' ? 'success' : 'warning'}
      variant="solid"
    />
  );
};
