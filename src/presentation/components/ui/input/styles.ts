import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { normalize } from '@/presentation/utils/normalize';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      minHeight: normalize(56),
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      borderRadius: theme.radii.md,
      borderWidth: normalize(1),
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      ...theme.shadows.card,
    },
    containerFocused: {
      borderColor: theme.colors.accent,
    },
    containerDisabled: {
      opacity: 0.6,
    },
    input: {
      flex: 1,
      color: theme.colors.text,
      paddingVertical: theme.spacing.md,
      ...theme.typography.body,
    },
    slot: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
