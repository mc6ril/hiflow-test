import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipePaginationLoadingOverlayStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
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
    label: {
      color: theme.colors.text,
      ...theme.typography.body,
    },
  });
