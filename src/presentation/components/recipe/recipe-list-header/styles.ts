import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeListHeaderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    title: {
      color: theme.colors.text,
      ...theme.typography.title,
    },
    subtitle: {
      color: theme.colors.textMuted,
      ...theme.typography.body,
    },
    statsRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    statCard: {
      flex: 1,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.xs,
      ...theme.shadows.card,
    },
    statValue: {
      color: theme.colors.text,
      ...theme.typography.title,
    },
    statLabel: {
      color: theme.colors.textMuted,
      ...theme.typography.body,
    },
  });
