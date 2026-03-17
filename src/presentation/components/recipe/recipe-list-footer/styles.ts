import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeListFooterStyles = (theme: AppTheme) =>
  StyleSheet.create({
    errorCard: {
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.card,
    },
    message: {
      color: theme.colors.textMuted,
      textAlign: 'center',
      ...theme.typography.body,
    },
    spacer: {
      height: theme.spacing.xl,
    },
    retryButton: {
      minWidth: 160,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.accent,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
    },
    retryButtonLabel: {
      color: theme.colors.surface,
      ...theme.typography.body,
    },
  });
