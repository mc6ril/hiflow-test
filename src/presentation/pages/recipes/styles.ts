import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipesPageStyles = (theme: AppTheme) =>
  StyleSheet.create({
    listViewport: {
      flex: 1,
    },
    content: {
      padding: theme.spacing.xl,
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xxl * 2,
    },
  });
