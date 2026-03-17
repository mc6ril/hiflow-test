import { ActivityIndicator, Text, View } from 'react-native';

import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipePaginationLoadingOverlayStyles } from './styles';

export const RecipePaginationLoadingOverlay = () => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipePaginationLoadingOverlayStyles(theme);

  return (
    <View pointerEvents="none" style={styles.container}>
      <ActivityIndicator color={theme.colors.accent} size="small" />
      <Text style={styles.label}>{t('recipes.paginationLoading')}</Text>
    </View>
  );
};
