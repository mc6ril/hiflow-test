import { createContext, type PropsWithChildren, type ReactNode } from 'react';
import type { AppDependencies } from '@/app/createAppDependencies';

export const AppDependenciesContext = createContext<AppDependencies | null>(
  null,
);

type AppDependenciesProviderProps = PropsWithChildren<{
  dependencies: AppDependencies;
}>;

export function AppDependenciesProvider({
  dependencies,
  children,
}: AppDependenciesProviderProps): ReactNode {
  return (
    <AppDependenciesContext.Provider value={dependencies}>
      {children}
    </AppDependenciesContext.Provider>
  );
}
