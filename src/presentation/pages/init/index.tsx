import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useI18n } from '@/presentation/hooks/useI18n';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createInitPageStyles } from './styles';

export const InitPage = () => {
  const { t } = useI18n();
  const theme = useTheme();
  const styles = createInitPageStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <ActivityIndicator color={theme.colors.accent} size="large" />
        <Text style={styles.title}>{t('startup.title')}</Text>
        <Text style={styles.subtitle}>{t('startup.subtitle')}</Text>
      </View>
    </SafeAreaView>
  );
};
