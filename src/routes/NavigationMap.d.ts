import { Route } from './RouteNames';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      [Route.Demo]: undefined;
    }
  }
}
