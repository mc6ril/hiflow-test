import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { normalize } from '@/presentation/utils/normalize';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: {
      borderWidth: normalize(1),
      borderColor: theme.colors.border,
      ...theme.shadows.card,
    },
    radiusMd: {
      borderRadius: theme.radii.md,
    },
    radiusLg: {
      borderRadius: theme.radii.lg,
    },
    padded: {
      padding: theme.spacing.xl,
    },
    default: {
      backgroundColor: theme.colors.surface,
    },
    muted: {
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.surfaceMuted,
    },
    accent: {
      backgroundColor: theme.colors.accentSoft,
      borderColor: theme.colors.accentSoft,
    },
  });
