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
    containerPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.99 }],
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
  });
