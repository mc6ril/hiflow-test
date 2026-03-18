import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { RECIPE_LIST_HEADER_HEIGHT } from '@/features/recipes/presentation/components/recipe-list/layout';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      minHeight: RECIPE_LIST_HEADER_HEIGHT - theme.spacing.lg,
    },
  });
