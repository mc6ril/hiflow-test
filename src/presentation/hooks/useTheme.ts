import type { AppTheme } from '@/shared/theme/appTheme';
import { useRequiredDependencies } from '@/presentation/hooks/useRequiredDependencies';

export const useTheme = (): AppTheme => {
  return useRequiredDependencies().theme;
};
