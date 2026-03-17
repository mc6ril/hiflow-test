import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createStartupFallbackPageStyles } from './styles';

type StartupFallbackPageProps = {
  message: string;
  onRetry: () => void;
};

export const StartupFallbackPage = ({
  message,
  onRetry,
}: StartupFallbackPageProps) => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createStartupFallbackPageStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('startup.errorTitle')}</Text>
        <Text style={styles.subtitle}>{t('startup.errorSubtitle')}</Text>
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onRetry} style={styles.button}>
          <Text style={styles.buttonLabel}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
