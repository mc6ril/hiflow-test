import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    padded: {
      padding: theme.spacing.xl,
    },
  });
