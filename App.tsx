import type { AppDependencies } from '@/app/createAppDependencies';
import { AppRoot } from '@/app/AppRoot';
import type { AppTheme } from '@/presentation/theme/appTheme';

type AppProps = {
  dependencies: AppDependencies;
  theme: AppTheme;
};

export default function App({ dependencies, theme }: AppProps) {
  return <AppRoot dependencies={dependencies} theme={theme} />;
}
