import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createUiBadgeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: {
      alignSelf: 'flex-start',
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    softNeutral: {
      backgroundColor: theme.colors.surfaceMuted,
    },
    softAccent: {
      backgroundColor: theme.colors.accentSoft,
    },
    softSuccess: {
      backgroundColor: theme.colors.surfaceMuted,
    },
    softWarning: {
      backgroundColor: theme.colors.accentSoft,
    },
    solidNeutral: {
      backgroundColor: theme.colors.textMuted,
    },
    solidAccent: {
      backgroundColor: theme.colors.accent,
    },
    solidSuccess: {
      backgroundColor: theme.colors.statusDone,
    },
    solidWarning: {
      backgroundColor: theme.colors.statusInProgress,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 1,
    },
    dotAccent: {
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
    },
    dotInverse: {
      backgroundColor: theme.colors.surface,
      borderColor: '#4B5563',
    },
  });
