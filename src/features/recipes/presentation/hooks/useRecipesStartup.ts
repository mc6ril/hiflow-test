import { useEffect, useState } from 'react';

import type {
  RecipesStartupResult,
  RecipesStartupSnapshot,
} from '@/features/recipes/domain/startup';

type RecipesStartupState =
  | {
      status: 'loading';
    }
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'ready';
      snapshot: RecipesStartupSnapshot;
    };

type UseRecipesStartupParams = {
  startApp: () => Promise<RecipesStartupResult>;
};

type UseRecipesStartupResult = {
  handleRetryStartup: () => void;
  startupAttempt: number;
  startupState: RecipesStartupState;
};

export const useRecipesStartup = ({
  startApp,
}: UseRecipesStartupParams): UseRecipesStartupResult => {
  const [startupAttempt, setStartupAttempt] = useState(0);
  const [startupState, setStartupState] = useState<RecipesStartupState>({
    status: 'loading',
  });

  useEffect(() => {
    // Prevent state updates when the effect instance is no longer active.
    let cancelled = false;

    const runStartup = async () => {
      const result = await startApp();

      if (cancelled) {
        return;
      }

      if (result.success) {
        setStartupState({
          status: 'ready',
          snapshot: result.data,
        });
      } else {
        setStartupState({
          status: 'error',
          message: result.error.message,
        });
      }
    };

    void runStartup();

    return () => {
      cancelled = true;
    };
  }, [startApp, startupAttempt]);

  const handleRetryStartup = () => {
    // Show loading feedback immediately while a new startup attempt is triggered.
    setStartupState({
      status: 'loading',
    });
    // startupAttempt is the explicit trigger that re-runs the startup effect.
    setStartupAttempt((currentAttempt) => currentAttempt + 1);
  };

  return {
    handleRetryStartup,
    startupAttempt,
    startupState,
  };
};
