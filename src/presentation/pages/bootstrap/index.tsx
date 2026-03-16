import { SafeAreaView } from 'react-native-safe-area-context';

import { BootstrapCard } from '@/presentation/components/bootstrap-card';
import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';
import images from '@/shared/assets/images';

import { createBootstrapPageStyles } from './styles';

export function BootstrapPage() {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createBootstrapPageStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <BootstrapCard
        eyebrow={t('app.name')}
        imageSource={images.icon}
        subtitle={t('bootstrap.subtitle')}
        title={t('bootstrap.title')}
      />
    </SafeAreaView>
  );
}
