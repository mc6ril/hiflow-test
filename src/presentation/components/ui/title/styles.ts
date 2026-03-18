import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: {
      color: theme.colors.text,
      fontWeight: '700',
    },
    level1: {
      ...theme.typography.title,
    },
    level2: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '700',
    },
    level3: {
      ...theme.typography.recipeTitle,
    },
    left: {
      textAlign: 'left',
    },
    center: {
      textAlign: 'center',
    },
    right: {
      textAlign: 'right',
    },
    default: {
      color: theme.colors.text,
    },
    muted: {
      color: theme.colors.textMuted,
    },
    accent: {
      color: theme.colors.accent,
    },
    inverse: {
      color: theme.colors.surface,
    },
  });
