import { createContext, type ReactNode } from 'react';
import type { I18n } from '@/shared/i18n/types';
import type { AppTheme } from '@/presentation/theme/appTheme';

export type PresentationDependencies = {
  i18n: I18n;
  theme: AppTheme;
};

export const AppDependenciesContext =
  createContext<PresentationDependencies | null>(null);

type AppDependenciesProviderProps = {
  dependencies: PresentationDependencies;
  children: ReactNode;
};

export const AppDependenciesProvider = ({
  dependencies,
  children,
}: AppDependenciesProviderProps) => {
  return (
    <AppDependenciesContext.Provider value={dependencies}>
      {children}
    </AppDependenciesContext.Provider>
  );
};
