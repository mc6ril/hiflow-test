import { ActivityIndicator } from 'react-native';

import { UiScreen } from '@/presentation/components/ui/screen';
import { UiStateCard } from '@/presentation/components/ui/state-card';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

export const InitPage = () => {
  const { t } = useI18n();
  const theme = useTheme();

  return (
    <UiScreen centered padded>
      <UiStateCard
        subtitle={t('startup.subtitle')}
        title={t('startup.title')}
        topSlot={<ActivityIndicator color={theme.colors.accent} size="large" />}
      />
    </UiScreen>
  );
};
