import { UiText } from '@/presentation/components/ui/text';
import { useI18n } from '@/presentation/hooks/useI18n';
import type { TranslationKey } from '@/shared/i18n/types';

type RecipeListEmptyStateProps = {
  messageKey?: TranslationKey;
};

export const RecipeListEmptyState = ({
  messageKey = 'recipes.empty',
}: RecipeListEmptyStateProps) => {
  const { t } = useI18n();

  return (
    <UiText align="center" tone="muted">
      {t(messageKey)}
    </UiText>
  );
};
