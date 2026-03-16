import { StatusBar } from 'expo-status-bar';
import { type PropsWithChildren, type ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { AppDependencies } from '@/app/createAppDependencies';
import { AppDependenciesProvider } from '@/presentation/providers/AppDependenciesProvider';

type AppLayoutProps = PropsWithChildren<{
  dependencies: AppDependencies;
}>;

export function AppLayout({
  dependencies,
  children,
}: AppLayoutProps): ReactNode {
  return (
    <AppDependenciesProvider dependencies={dependencies}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {children}
      </SafeAreaProvider>
    </AppDependenciesProvider>
  );
}
