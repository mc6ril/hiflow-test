import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createBootstrapCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
    logo: {
      width: 88,
      height: 88,
      marginBottom: theme.spacing.sm,
    },
    eyebrow: {
      color: theme.colors.accent,
      textTransform: 'uppercase',
      ...theme.typography.eyebrow,
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
  });
