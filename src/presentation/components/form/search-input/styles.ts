import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { normalize } from '@/presentation/utils/normalize';

export const createSearchInputStyles = (theme: AppTheme) =>
  StyleSheet.create({
    iconContainer: {
      width: normalize(18),
      height: normalize(18),
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconLens: {
      width: normalize(12),
      height: normalize(12),
      borderRadius: normalize(6),
      borderWidth: normalize(2),
      borderColor: theme.colors.textMuted,
    },
    iconHandle: {
      position: 'absolute',
      right: 0,
      bottom: 1,
      width: normalize(7),
      height: normalize(2),
      borderRadius: normalize(1),
      backgroundColor: theme.colors.textMuted,
      transform: [{ rotate: '45deg' }],
    },
  });
