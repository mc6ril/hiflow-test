import { colors } from '@/presentation/theme/colors';
import { spacing } from '@/presentation/theme/spacing';
import { typography } from '@/presentation/theme/typography';
import { normalize } from '@/presentation/utils/normalize';

export const appTheme = Object.freeze({
  colors,
  spacing,
  typography,
  radii: Object.freeze({
    md: normalize(18),
    lg: normalize(28),
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
