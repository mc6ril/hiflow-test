import { SafeAreaView } from 'react-native-safe-area-context';

import { DesignSystemShowcase } from '@/presentation/components/ui/design-system-showcase';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createDesignSystemPageStyles } from './styles';

export const DesignSystemPage = () => {
  const theme = useTheme();
  const styles = createDesignSystemPageStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <DesignSystemShowcase />
    </SafeAreaView>
  );
};
