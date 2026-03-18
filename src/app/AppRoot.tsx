import type { AppDependencies } from '@/app/createAppDependencies';
import * as SplashScreen from 'expo-splash-screen';
import { type ReactNode, useCallback, useRef } from 'react';
import { View } from 'react-native';

import { AppLayout } from '@/app/AppLayout';
import { AppErrorBoundary } from '@/app/AppErrorBoundary';
import { RecipesPage } from '@/features/recipes/presentation/pages/recipes';
import { useRecipesStartup } from '@/features/recipes/presentation/hooks/useRecipesStartup';
import { InitPage } from '@/presentation/pages/init';
import { StartupFallbackPage } from '@/presentation/pages/startup-fallback';

type AppRootProps = {
  dependencies: AppDependencies;
};

export const AppRoot = ({ dependencies }: AppRootProps) => {
  const { handleRetryStartup, startupAttempt, startupState } =
    useRecipesStartup({
      startApp: dependencies.startApp,
    });

  // Guard to ensure hideAsync is called only once even if multiple layouts occur.
  const hasHiddenSplashScreenRef = useRef(false);

  const handleStartupContentLayout = useCallback(() => {
    if (hasHiddenSplashScreenRef.current) {
      return;
    }

    hasHiddenSplashScreenRef.current = true;
    void SplashScreen.hideAsync().catch(() => undefined);
  }, []);

  const renderStartupContent = useCallback(
    (content: ReactNode) => {
      return (
        // We hide the splash after this container has been laid out to avoid visual flicker.
        <View onLayout={handleStartupContentLayout} style={{ flex: 1 }}>
          {content}
        </View>
      );
    },
    [handleStartupContentLayout],
  );

  return (
    <AppLayout
      dependencies={{
        i18n: dependencies.i18n,
        theme: dependencies.theme,
      }}
    >
      <AppErrorBoundary
        // Any unexpected render/runtime error during startup falls back to a retryable page.
        fallback={() =>
          renderStartupContent(
            <StartupFallbackPage
              message={dependencies.i18n.t('startup.unexpectedErrorMessage')}
              onRetry={handleRetryStartup}
            />,
          )
        }
        // Retry increments startupAttempt, forcing the boundary state to reset.
        resetKey={startupAttempt}
      >
        {/* ready: app initialized, error: recoverable startup failure, else: initialization in progress */}
        {startupState.status === 'ready' ? (
          renderStartupContent(
            <RecipesPage
              dependencies={{
                computeRecipeStatus: dependencies.computeRecipeStatus,
                flattenRecipesPages: dependencies.flattenRecipesPages,
                getNextRecipesPageOffset: dependencies.getNextRecipesPageOffset,
                loadRecipesPage: dependencies.loadRecipesPage,
                previewInstructionStepToggle:
                  dependencies.previewInstructionStepToggle,
                toRecipeProgressKey: dependencies.toRecipeProgressKey,
                toggleInstructionStep: dependencies.toggleInstructionStep,
              }}
              snapshot={startupState.snapshot}
            />,
          )
        ) : startupState.status === 'error' ? (
          renderStartupContent(
            <StartupFallbackPage
              message={startupState.message}
              onRetry={handleRetryStartup}
            />,
          )
        ) : (
          <InitPage />
        )}
      </AppErrorBoundary>
    </AppLayout>
  );
};
