import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createSearchInputStyles = (theme: AppTheme) =>
  StyleSheet.create({
    iconContainer: {
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconLens: {
      width: 12,
      height: 12,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.colors.textMuted,
    },
    iconHandle: {
      position: 'absolute',
      right: 0,
      bottom: 1,
      width: 7,
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.colors.textMuted,
      transform: [{ rotate: '45deg' }],
    },
  });
