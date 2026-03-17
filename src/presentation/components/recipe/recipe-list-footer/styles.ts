import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeListFooterStyles = (theme: AppTheme) =>
  StyleSheet.create({
    errorCard: {
      gap: theme.spacing.md,
      alignItems: 'center',
    },
    spacer: {
      height: theme.spacing.xl,
    },
    retryButton: {
      minWidth: 160,
    },
  });
