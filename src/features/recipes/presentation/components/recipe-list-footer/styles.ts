import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { normalize } from '@/presentation/utils/normalize';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    errorCard: {
      gap: theme.spacing.md,
      alignItems: 'center',
    },
    spacer: {
      height: theme.spacing.xl,
    },
    retryButton: {
      minWidth: normalize(160),
    },
  });
