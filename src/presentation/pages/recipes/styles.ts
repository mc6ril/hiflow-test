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
  });
