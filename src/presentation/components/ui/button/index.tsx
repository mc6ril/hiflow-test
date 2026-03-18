import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { UiText } from '@/presentation/components/ui/text';
import { useTheme } from '@/presentation/hooks/useTheme';

import { createStyles } from './styles';

type UiButtonVariant = 'primary' | 'secondary' | 'ghost';
type UiButtonSize = 'md' | 'lg';

type UiButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  fullWidth?: boolean;
  isLoading?: boolean;
  label: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  size?: UiButtonSize;
  style?: StyleProp<ViewStyle>;
  variant?: UiButtonVariant;
};

export const UiButton = ({
  accessibilityLabel,
  accessibilityRole = 'button',
  disabled = false,
  fullWidth = false,
  isLoading = false,
  label,
  leftSlot,
  rightSlot,
  size = 'md',
  style,
  variant = 'primary',
  ...props
}: UiButtonProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const isDisabled = disabled || isLoading;
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
      android_ripple={{
        color: isPrimary ? theme.colors.accentSoft : theme.colors.surfaceMuted,
      }}
      disabled={isDisabled}
      {...props}
      style={({ pressed }) => [
        styles.base,
        size === 'lg' ? styles.sizeLg : styles.sizeMd,
        variant === 'primary'
          ? styles.primary
          : variant === 'secondary'
            ? styles.secondary
            : styles.ghost,
        fullWidth ? styles.fullWidth : null,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator
            color={isPrimary ? theme.colors.surface : theme.colors.accent}
            size="small"
          />
        ) : leftSlot ? (
          <View style={styles.slot}>{leftSlot}</View>
        ) : null}
        <UiText
          numberOfLines={1}
          tone={isPrimary ? 'inverse' : 'accent'}
          variant="body"
          weight="semibold"
        >
          {label}
        </UiText>
        {rightSlot === undefined || isLoading ? null : (
          <View style={styles.slot}>{rightSlot}</View>
        )}
      </View>
    </Pressable>
  );
};
