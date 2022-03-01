import { StatusBar, StatusBarStyle } from 'react-native';
import {
  createNavigationContainerRef,
  NavigationAction,
  NavigationState,
} from '@react-navigation/native';
import { Route } from '@routes/RouteNames';

export const navigationRef = createNavigationContainerRef();

export const navigate = (scene: Route) =>
  navigationRef.current?.navigate(scene);

export const goBack = () => navigationRef.current?.goBack();

export const dispatchNavigationAction = (action: NavigationAction) =>
  navigationRef.current?.dispatch(action);

export const getActiveRouteName = (state?: NavigationState): string | null => {
  if (state !== undefined || navigationRef.current !== undefined) {
    const currentState = state ? state : navigationRef.current.getRootState();
    const route = currentState.routes[currentState.index];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state as NavigationState);
    }

    return route.name;
  }

  return null;
};

export const setStatusBar = (screenName: string) => {
  const statusBar = getStatusBarStyle(screenName);
  StatusBar.setBarStyle(statusBar.style as StatusBarStyle);

  if (!global.isIOS) {
    if (statusBar.bg) {
      StatusBar.setBackgroundColor(statusBar.bg);
    }

    StatusBar.setTranslucent(statusBar.translucent);
  }
};

const getStatusBarStyle = (screenName: string) => {
  switch (screenName) {
    case 'success':
    case 'error':
    case 'checkout':
      return {
        style: 'light-content',
        bg: 'transparent',
        translucent: true,
      };
    default:
      return {
        style: 'dark-content',
        bg: 'transparent',
        translucent: true,
      };
  }
};
