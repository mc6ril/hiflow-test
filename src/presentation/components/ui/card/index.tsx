import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

export type UiCardTone = 'default' | 'muted' | 'accent';

type UiCardProps = ViewProps & {
  children: ReactNode;
  padded?: boolean;
  radius?: 'md' | 'lg';
  tone?: UiCardTone;
};

export const UiCard = ({
  children,
  padded = true,
  radius = 'lg',
  style,
  tone = 'default',
  ...props
}: UiCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View
      {...props}
      style={[
        styles.base,
        radius === 'md' ? styles.radiusMd : styles.radiusLg,
        styles[tone],
        padded ? styles.padded : null,
        style,
      ]}
    >
      {children}
    </View>
  );
};
