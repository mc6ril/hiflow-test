import { AppTheme } from '@/presentation/theme/appTheme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      gap: theme.spacing.md,
      padding: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl * 2,
    },
  });
