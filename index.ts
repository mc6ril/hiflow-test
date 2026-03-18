import { createElement } from 'react';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';

import { createAppDependencies } from '@/app/createAppDependencies';
import App from './App';

// Keep the native splash visible until our first meaningful React tree is painted.
void SplashScreen.preventAutoHideAsync().catch(() => undefined);

const dependencies = createAppDependencies();

const Root = () => {
  return createElement(App, {
    dependencies,
  });
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
