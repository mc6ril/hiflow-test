import type { ReactNode } from 'react';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

type UiScreenProps = {
  children: ReactNode;
  centered?: boolean;
  edges?: Edge[];
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const UiScreen = ({
  centered = false,
  children,
  edges,
  padded = false,
  style,
}: UiScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView
      {...(edges === undefined ? null : { edges })}
      style={[
        styles.base,
        centered ? styles.centered : null,
        padded ? styles.padded : null,
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};
