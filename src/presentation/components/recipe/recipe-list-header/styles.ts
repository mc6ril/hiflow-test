import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createRecipeListHeaderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    title: {
      color: theme.colors.text,
      textAlign: 'center',
      ...theme.typography.title,
    },
    subtitle: {
      color: theme.colors.textMuted,
      textAlign: 'center',
      ...theme.typography.body,
    },
  });
