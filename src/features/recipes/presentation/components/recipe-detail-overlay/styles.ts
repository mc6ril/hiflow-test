import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { normalize } from '@/presentation/utils/normalize';

export const createStyles = (theme: AppTheme) =>
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
      padding: theme.spacing.md,
      gap: theme.spacing.xs,
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
    ingredientsList: {
      gap: theme.spacing.sm,
    },
    ingredientRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    ingredientBullet: {
      width: normalize(8),
      height: normalize(8),
      borderRadius: normalize(4),
      backgroundColor: theme.colors.accent,
      marginTop: normalize(8),
    },
    ingredientText: {
      flex: 1,
    },
    stepsList: {
      gap: theme.spacing.sm,
    },
    stepCard: {
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.md,
    },
    stepCardCompleted: {
      borderColor: theme.colors.statusDone,
      backgroundColor: theme.colors.surfaceMuted,
    },
    checkbox: {
      width: normalize(24),
      height: normalize(24),
      borderRadius: normalize(12),
      borderWidth: normalize(2),
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: normalize(2),
      backgroundColor: theme.colors.surface,
    },
    checkboxCompleted: {
      borderColor: theme.colors.statusDone,
      backgroundColor: theme.colors.statusDone,
    },
    checkboxMark: {
      width: normalize(8),
      height: normalize(8),
      borderRadius: normalize(4),
      backgroundColor: theme.colors.surface,
    },
    stepContent: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    stepTextCompleted: {
      color: theme.colors.textMuted,
      textDecorationLine: 'line-through',
    },
    errorMessage: {
      color: theme.colors.accent,
    },
    footer: {
      borderTopWidth: normalize(1),
      borderTopColor: theme.colors.border,
      paddingHorizontal: theme.spacing.xl,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
  });
