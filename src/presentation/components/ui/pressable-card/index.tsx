import type { ReactNode } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/presentation/hooks/useTheme';
import type { UiCardTone } from '@/presentation/components/ui/card';

import { createUiPressableCardStyles } from './styles';

type UiPressableCardProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  tone?: UiCardTone;
};

export const UiPressableCard = ({
  children,
  disabled = false,
  padded = true,
  style,
  tone = 'default',
  ...props
}: UiPressableCardProps) => {
  const theme = useTheme();
  const styles = createUiPressableCardStyles(theme);

  return (
    <Pressable
      android_ripple={{ color: theme.colors.surfaceMuted }}
      disabled={disabled}
      {...props}
      style={({ pressed }) => [
        styles.base,
        styles[tone],
        padded ? styles.padded : null,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};
