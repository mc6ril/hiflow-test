import { ActivityIndicator, View } from 'react-native';

import { UiCard } from '@/presentation/components/ui/card';
import { UiText } from '@/presentation/components/ui/text';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createRecipePaginationLoadingOverlayStyles } from './styles';

export const RecipePaginationLoadingOverlay = () => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createRecipePaginationLoadingOverlayStyles(theme);

  return (
    <UiCard
      padded={false}
      pointerEvents="none"
      radius="md"
      style={styles.container}
    >
      <View style={styles.content}>
        <ActivityIndicator color={theme.colors.accent} size="small" />
        <UiText>{t('recipes.paginationLoading')}</UiText>
      </View>
    </UiCard>
  );
};
