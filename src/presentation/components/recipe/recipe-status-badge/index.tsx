import { Text, View } from 'react-native';

import type { RecipeStatus } from '@/core/domain/recipes';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipeStatusBadgeStyles } from './styles';

type RecipeStatusBadgeProps = {
  status: RecipeStatus;
  testID?: string;
};

export const RecipeStatusBadge = ({
  status,
  testID,
}: RecipeStatusBadgeProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipeStatusBadgeStyles(theme);

  if (status === 'not_started') {
    return null;
  }

  const statusLabel =
    status === 'done'
      ? t('recipes.status.done')
      : t('recipes.status.inProgress');

  return (
    <View
      style={[
        styles.container,
        status === 'done' ? styles.done : styles.inProgress,
      ]}
      testID={testID}
    >
      <View style={styles.dot} />
      <Text style={styles.label}>{statusLabel}</Text>
    </View>
  );
};
