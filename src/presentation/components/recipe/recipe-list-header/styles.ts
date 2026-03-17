import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeListHeaderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
  });
