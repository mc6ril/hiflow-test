import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeDetailOverlayStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background,
      zIndex: 10,
    },
    header: {
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.xl,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    screenTitle: {
      color: theme.colors.textMuted,
      ...theme.typography.eyebrow,
    },
    recipeTitle: {
      color: theme.colors.text,
      textAlign: 'center',
      ...theme.typography.recipeTitle,
    },
    scrollContent: {
      gap: theme.spacing.xl,
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl,
    },
    heroImage: {
      width: '100%',
      aspectRatio: 1.18,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surfaceMuted,
    },
    metaGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    metaCard: {
      flexGrow: 1,
      flexBasis: '47%',
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      gap: theme.spacing.xs,
    },
    metaLabel: {
      color: theme.colors.textMuted,
      ...theme.typography.caption,
    },
    metaValue: {
      color: theme.colors.text,
      ...theme.typography.body,
    },
    section: {
      gap: theme.spacing.md,
    },
    sectionHeadingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },
    sectionTitle: {
      color: theme.colors.text,
      ...theme.typography.eyebrow,
    },
    helperText: {
      color: theme.colors.textMuted,
      ...theme.typography.caption,
    },
    ingredientsList: {
      gap: theme.spacing.sm,
    },
    ingredientRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    ingredientBullet: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.accent,
      marginTop: 8,
    },
    ingredientText: {
      flex: 1,
      color: theme.colors.text,
      ...theme.typography.body,
    },
    stepsList: {
      gap: theme.spacing.sm,
    },
    stepCard: {
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.md,
      ...theme.shadows.card,
    },
    stepCardPressed: {
      opacity: 0.88,
    },
    stepCardCompleted: {
      borderColor: theme.colors.statusDone,
      backgroundColor: theme.colors.surfaceMuted,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
      backgroundColor: theme.colors.surface,
    },
    checkboxCompleted: {
      borderColor: theme.colors.statusDone,
      backgroundColor: theme.colors.statusDone,
    },
    checkboxMark: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.surface,
    },
    stepContent: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    stepLabel: {
      color: theme.colors.textMuted,
      ...theme.typography.caption,
    },
    stepText: {
      color: theme.colors.text,
      ...theme.typography.body,
    },
    stepTextCompleted: {
      color: theme.colors.textMuted,
      textDecorationLine: 'line-through',
    },
    progressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    errorMessage: {
      color: theme.colors.accent,
      ...theme.typography.caption,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingHorizontal: theme.spacing.xl,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
    closeButton: {
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
    },
    closeButtonPressed: {
      opacity: 0.88,
    },
    closeButtonLabel: {
      color: theme.colors.surface,
      ...theme.typography.recipeTitle,
    },
  });
