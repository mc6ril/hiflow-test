import { useContext } from 'react';

import { AppDependenciesContext } from '@/presentation/providers/AppDependenciesProvider';
import type { AppDependencies } from '@/app/createAppDependencies';

export const useRequiredDependencies = (): AppDependencies => {
  const dependencies = useContext(AppDependenciesContext);

  if (!dependencies) {
    throw new Error('App dependencies are not available in the current tree.');
  }

  return dependencies;
};
