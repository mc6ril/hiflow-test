import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeListItemStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      ...theme.shadows.card,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    thumbnail: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.surfaceMuted,
    },
    content: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    title: {
      color: theme.colors.text,
      ...theme.typography.recipeTitle,
    },
    meta: {
      color: theme.colors.textMuted,
      ...theme.typography.caption,
    },
    statusBadge: {
      alignSelf: 'flex-start',
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    statusBadgeDone: {
      backgroundColor: theme.colors.statusDone,
    },
    statusBadgeInProgress: {
      backgroundColor: theme.colors.statusInProgress,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: '#4B5563',
    },
    statusLabel: {
      color: theme.colors.surface,
      ...theme.typography.badge,
    },
  });
