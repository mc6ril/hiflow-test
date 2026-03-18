import type { AppTheme } from '@/presentation/theme/appTheme';
import { useRequiredDependencies } from '@/presentation/hooks/useRequiredDependencies';

export const useTheme = (): AppTheme => {
  return useRequiredDependencies().theme;
};
