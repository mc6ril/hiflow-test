import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { typography } from '@/shared/theme/typography';

export const appTheme = Object.freeze({
  colors,
  spacing,
  typography,
  radii: Object.freeze({
    md: 18,
    lg: 28,
  }),
  shadows: Object.freeze({
    card: Object.freeze({
      shadowColor: '#122033',
      shadowOffset: Object.freeze({ width: 0, height: 10 }),
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 4,
    }),
  }),
});

export type AppTheme = typeof appTheme;
