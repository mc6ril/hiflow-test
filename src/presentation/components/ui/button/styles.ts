import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createUiButtonStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: {
      minHeight: 48,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.lg,
    },
    sizeMd: {
      minHeight: 48,
      paddingVertical: theme.spacing.md,
    },
    sizeLg: {
      minHeight: 56,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
    },
    primary: {
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
      ...theme.shadows.card,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.accent,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    fullWidth: {
      alignSelf: 'stretch',
    },
    pressed: {
      opacity: 0.92,
      transform: [{ scale: 0.985 }],
    },
    disabled: {
      opacity: 0.55,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
    slot: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
