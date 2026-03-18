import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { type ReactNode, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createQueryClient } from '@/app/createQueryClient';
import {
  AppDependenciesProvider,
  type PresentationDependencies,
} from '@/presentation/providers/AppDependenciesProvider';

type AppLayoutProps = {
  children: ReactNode;
  dependencies: PresentationDependencies;
};

export const AppLayout = ({ children, dependencies }: AppLayoutProps) => {
  const queryClientRef = useRef<ReturnType<typeof createQueryClient> | null>(
    null,
  );
  const queryClient =
    queryClientRef.current ?? (queryClientRef.current = createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppDependenciesProvider dependencies={dependencies}>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          {children}
        </SafeAreaProvider>
      </AppDependenciesProvider>
    </QueryClientProvider>
  );
};
