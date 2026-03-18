import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { normalize } from '@/presentation/utils/normalize';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      width: '100%',
      maxWidth: normalize(420),
      gap: theme.spacing.md,
      alignSelf: 'stretch',
    },
    alignCenter: {
      alignItems: 'center',
    },
    topSlot: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      gap: theme.spacing.md,
      alignSelf: 'stretch',
    },
    action: {
      alignSelf: 'stretch',
    },
  });
