import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipePaginationLoadingOverlayStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: theme.spacing.xl,
      right: theme.spacing.xl,
      bottom: theme.spacing.lg,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
  });
