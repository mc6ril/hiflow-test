import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/shared/theme/appTheme';

export const createUiTextStyles = (theme: AppTheme) =>
  StyleSheet.create({
    base: {
      color: theme.colors.text,
    },
    body: {
      ...theme.typography.body,
    },
    caption: {
      ...theme.typography.caption,
    },
    eyebrow: {
      ...theme.typography.eyebrow,
    },
    left: {
      textAlign: 'left',
    },
    center: {
      textAlign: 'center',
    },
    right: {
      textAlign: 'right',
    },
    default: {
      color: theme.colors.text,
    },
    muted: {
      color: theme.colors.textMuted,
    },
    accent: {
      color: theme.colors.accent,
    },
    inverse: {
      color: theme.colors.surface,
    },
    regular: {
      fontWeight: '400',
    },
    medium: {
      fontWeight: '500',
    },
    semibold: {
      fontWeight: '600',
    },
    bold: {
      fontWeight: '700',
    },
  });
