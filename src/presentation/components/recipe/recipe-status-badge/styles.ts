import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeStatusBadgeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    done: {
      backgroundColor: theme.colors.statusDone,
    },
    inProgress: {
      backgroundColor: theme.colors.statusInProgress,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: '#4B5563',
    },
    label: {
      color: theme.colors.surface,
      ...theme.typography.badge,
    },
  });
