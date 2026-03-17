import { StatusBar } from 'expo-status-bar';
import { type ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { AppDependencies } from '@/app/createAppDependencies';
import { AppDependenciesProvider } from '@/presentation/providers/AppDependenciesProvider';

type AppLayoutProps = {
  dependencies: AppDependencies;
  children: ReactNode;
};

export const AppLayout = ({ dependencies, children }: AppLayoutProps) => {
  return (
    <AppDependenciesProvider dependencies={dependencies}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {children}
      </SafeAreaProvider>
    </AppDependenciesProvider>
  );
};
