import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createStartupFallbackPageStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.xl,
    },
    card: {
      width: '100%',
      maxWidth: 420,
      borderRadius: theme.radii.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      gap: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.card,
    },
    title: {
      color: theme.colors.text,
      textAlign: 'center',
      ...theme.typography.title,
    },
    subtitle: {
      color: theme.colors.textMuted,
      textAlign: 'center',
      ...theme.typography.body,
    },
    message: {
      color: theme.colors.text,
      textAlign: 'center',
      ...theme.typography.body,
    },
    button: {
      minWidth: 160,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.accent,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
    },
    buttonLabel: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20,
    },
  });
