import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createSearchInputStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      minHeight: 56,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      ...theme.shadows.card,
    },
    containerFocused: {
      borderColor: theme.colors.accent,
    },
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
    input: {
      flex: 1,
      color: theme.colors.text,
      paddingVertical: theme.spacing.md,
      ...theme.typography.body,
    },
  });
