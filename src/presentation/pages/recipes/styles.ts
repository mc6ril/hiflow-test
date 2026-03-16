import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipesPageStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    header: {
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
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 32,
    },
    statLabel: {
      color: theme.colors.textMuted,
      ...theme.typography.body,
    },
    recipeCard: {
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.sm,
      ...theme.shadows.card,
    },
    recipeTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    recipeName: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 24,
    },
    statusBadge: {
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.accentSoft,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    statusLabel: {
      color: theme.colors.accent,
      ...theme.typography.eyebrow,
    },
    recipeMeta: {
      color: theme.colors.textMuted,
      ...theme.typography.body,
    },
    emptyState: {
      color: theme.colors.textMuted,
      textAlign: 'center',
      ...theme.typography.body,
    },
  });
