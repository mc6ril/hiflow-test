import type { I18n } from '@/shared/i18n/types';
import { useRequiredDependencies } from '@/presentation/hooks/useRequiredDependencies';

export const useI18n = (): I18n => {
  return useRequiredDependencies().i18n;
};
