import type { AppDependencies } from '@/app/createAppDependencies';
import { AppRoot } from '@/app/AppRoot';

type AppProps = {
  dependencies: AppDependencies;
};

const App = ({ dependencies }: AppProps) => {
  return <AppRoot dependencies={dependencies} />;
};

export default App;
