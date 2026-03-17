import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeListEmptyStateStyles = (theme: AppTheme) =>
  StyleSheet.create({
    label: {
      color: theme.colors.textMuted,
      textAlign: 'center',
      ...theme.typography.body,
    },
  });
