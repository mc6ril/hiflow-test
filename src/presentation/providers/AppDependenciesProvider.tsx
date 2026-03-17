import { createContext, type ReactNode } from 'react';
import type { AppDependencies } from '@/app/createAppDependencies';

export const AppDependenciesContext = createContext<AppDependencies | null>(
  null,
);

type AppDependenciesProviderProps = {
  dependencies: AppDependencies;
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
