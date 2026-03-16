import { useRef } from 'react';

import {
  createAppDependencies,
  type AppDependencies,
} from '@/app/createAppDependencies';
import { AppLayout } from '@/presentation/layout';
import { BootstrapPage } from '@/presentation/pages/bootstrap';

export function AppRoot() {
  const dependenciesRef = useRef<AppDependencies | null>(null);
  const dependencies =
    dependenciesRef.current ??
    (dependenciesRef.current = createAppDependencies());

  return (
    <AppLayout dependencies={dependencies}>
      <BootstrapPage />
    </AppLayout>
  );
}
