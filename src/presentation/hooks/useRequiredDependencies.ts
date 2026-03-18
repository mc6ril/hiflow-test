import { useContext } from 'react';

import {
  AppDependenciesContext,
  type PresentationDependencies,
} from '@/presentation/providers/AppDependenciesProvider';

export const useRequiredDependencies = (): PresentationDependencies => {
  const dependencies = useContext(AppDependenciesContext);

  if (!dependencies) {
    throw new Error('App dependencies are not available in the current tree.');
  }

  return dependencies;
};
