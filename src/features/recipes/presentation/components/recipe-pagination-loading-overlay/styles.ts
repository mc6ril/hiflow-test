import { StyleSheet } from 'react-native';

import type { AppTheme } from '@/presentation/theme/appTheme';
import { normalize } from '@/presentation/utils/normalize';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      overflow: 'hidden',
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      minHeight: normalize(112),
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    container: {
      position: 'absolute',
      left: theme.spacing.xl,
      right: theme.spacing.xl,
      bottom: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    skeletonBlock: {
      borderRadius: theme.radii.md,
    },
    skeletonLine: {
      height: normalize(12),
      width: '100%',
    },
    skeletonLineShort: {
      width: '72%',
    },
    skeletonTextColumn: {
      flex: 1,
      gap: theme.spacing.sm,
    },
    skeletonThumbnail: {
      width: normalize(56),
      height: normalize(56),
      borderRadius: normalize(28),
      flexShrink: 0,
    },
    skeletonTitle: {
      height: normalize(18),
      width: '58%',
    },
  });
