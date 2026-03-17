import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createUiStateCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      width: '100%',
      maxWidth: 420,
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
