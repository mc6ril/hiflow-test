import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';

import {
  createAppDependencies,
  type AppDependencies,
} from '@/app/createAppDependencies';
import { startApp, type AppStartupSnapshot } from '@/core/usecases/startApp';
import { AppLayout } from '@/presentation/layout';
import { InitPage } from '@/presentation/pages/init';
import { RecipesPage } from '@/presentation/pages/recipes';
import { StartupFallbackPage } from '@/presentation/pages/startup-fallback';

type AppRootState =
  | {
      status: 'loading';
    }
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'ready';
      snapshot: AppStartupSnapshot;
    };

export const AppRoot = () => {
  const dependenciesRef = useRef<AppDependencies | null>(null);
  const dependencies =
    dependenciesRef.current ??
    (dependenciesRef.current = createAppDependencies());
  const [startupAttempt, setStartupAttempt] = useState(0);
  const [state, setState] = useState<AppRootState>({
    status: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    const runStartup = async () => {
      await SplashScreen.preventAutoHideAsync().catch(() => undefined);

      const result = await startApp(dependencies.recipesRepository, {
        limit: dependencies.startup.initialRecipesPageSize,
        skip: 0,
      });

      if (cancelled) {
        return;
      }

      if (result.success) {
        setState({
          status: 'ready',
          snapshot: result.data,
        });
      } else {
        setState({
          status: 'error',
          message: result.error.message,
        });
      }

      await SplashScreen.hideAsync().catch(() => undefined);
    };

    void runStartup();

    return () => {
      cancelled = true;
    };
  }, [dependencies, startupAttempt]);

  const handleRetry = () => {
    setState({
      status: 'loading',
    });
    setStartupAttempt((currentAttempt) => currentAttempt + 1);
  };

  return (
    <AppLayout dependencies={dependencies}>
      {state.status === 'ready' ? (
        <RecipesPage snapshot={state.snapshot} />
      ) : state.status === 'error' ? (
        <StartupFallbackPage message={state.message} onRetry={handleRetry} />
      ) : (
        <InitPage />
      )}
    </AppLayout>
  );
};
