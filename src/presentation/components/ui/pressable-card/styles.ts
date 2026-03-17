import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createUiPressableCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: {
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.card,
    },
    padded: {
      padding: theme.spacing.lg,
    },
    default: {
      backgroundColor: theme.colors.surface,
    },
    muted: {
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.surfaceMuted,
    },
    accent: {
      backgroundColor: theme.colors.accentSoft,
      borderColor: theme.colors.accentSoft,
    },
    pressed: {
      opacity: 0.88,
      transform: [{ scale: 0.99 }],
    },
    disabled: {
      opacity: 0.6,
    },
  });
