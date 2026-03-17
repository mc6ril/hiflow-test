import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipesPageStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listViewport: {
      flex: 1,
    },
    content: {
      padding: theme.spacing.xl,
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xxl * 2,
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
    emptyState: {
      color: theme.colors.textMuted,
      textAlign: 'center',
      ...theme.typography.body,
    },
    paginationErrorCard: {
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.card,
    },
    paginationMessage: {
      color: theme.colors.textMuted,
      textAlign: 'center',
      ...theme.typography.body,
    },
    paginationSpacer: {
      height: theme.spacing.xl,
    },
    paginationRetryButton: {
      minWidth: 160,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.accent,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
    },
    paginationRetryButtonLabel: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20,
    },
    paginationLoadingOverlay: {
      position: 'absolute',
      left: theme.spacing.xl,
      right: theme.spacing.xl,
      bottom: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      ...theme.shadows.card,
    },
    paginationLoadingLabel: {
      color: theme.colors.text,
      ...theme.typography.body,
    },
  });
