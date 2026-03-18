import { normalize } from '@/presentation/utils/normalize';

export const typography = Object.freeze({
  eyebrow: Object.freeze({
    fontSize: normalize(13),
    fontWeight: '600',
    letterSpacing: 0.4,
    lineHeight: normalize(18),
  }),
  recipeTitle: Object.freeze({
    fontSize: normalize(18),
    fontWeight: '600',
    lineHeight: normalize(24),
  }),
  caption: Object.freeze({
    fontSize: normalize(13),
    fontWeight: '400',
    lineHeight: normalize(18),
  }),
  badge: Object.freeze({
    fontSize: normalize(12),
    fontWeight: '700',
    lineHeight: normalize(16),
  }),
  title: Object.freeze({
    fontSize: normalize(30),
    fontWeight: '700',
    lineHeight: normalize(36),
  }),
  body: Object.freeze({
    fontSize: normalize(16),
    fontWeight: '400',
    lineHeight: normalize(24),
  }),
});
