import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createDesignSystemShowcaseStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.xl,
      gap: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl * 2,
    },
    hero: {
      gap: theme.spacing.sm,
    },
    sectionHeader: {
      gap: theme.spacing.xs,
      marginBottom: theme.spacing.lg,
    },
    stackSm: {
      gap: theme.spacing.sm,
    },
    buttonGroup: {
      gap: theme.spacing.md,
    },
    inputGroup: {
      gap: theme.spacing.md,
    },
    badgeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    surfacePreview: {
      gap: theme.spacing.xs,
      marginTop: theme.spacing.lg,
    },
  });
