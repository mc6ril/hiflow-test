import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { RECIPE_LIST_ITEM_HEIGHT } from '@/features/recipes/presentation/components/recipe-list/layout';
import { normalize } from '@/presentation/utils/normalize';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      height: RECIPE_LIST_ITEM_HEIGHT,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    thumbnail: {
      width: normalize(64),
      height: normalize(64),
      borderRadius: normalize(32),
      backgroundColor: theme.colors.surfaceMuted,
    },
    content: {
      flex: 1,
      gap: theme.spacing.xs,
    },
  });
