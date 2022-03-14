import createSagaMiddleware from 'redux-saga';
import { compact } from 'lodash';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import * as Sentry from '@sentry/react-native';

import { storage } from '../utils/storage';
import { initReactotron } from '../utils/reactotron';
import FeatureEnabler from '../featureEnabler';
import { rootSaga } from './sagas';
import { PersistedAppState, rootReducer, RootState } from './reducers';

const persistorConfig = {
  key: '@<YourAppName>:state',
  storage: storage,
  whitelist: ['questions', 'answers'],
};

export const configStore = (initialState?: PersistedAppState) => {
  let sagaMonitor = undefined;
  let reactorEnhancer = undefined;

  if (FeatureEnabler.reactotron) {
    const Reactotron = initReactotron();
    sagaMonitor = Reactotron.createSagaMonitor();
    reactorEnhancer = Reactotron.createEnhancer();
    console.tron = Reactotron;
  } else {
    console.tron = {
      log: (): null => null,
      error: (): null => null,
    };
  }

  let sentryReduxEnhancer = undefined;

  if (FeatureEnabler.sentry) {
    sentryReduxEnhancer = Sentry.createReduxEnhancer({
      // Optionally pass options listed below
      // State logging
      stateTransformer: (state: RootState) => ({
        app: state.app,
      }),
      // Actions logging
      //  actionTransformer: action => {
      //    if (action.type === "GOVERNMENT_SECRETS") {
      //      // Return null to not log the action to Sentry
      //      return null;
      //    } else {
      //      return action;
      //    }
      //  },
      // set tags derived from state
      configureScopeWithState: () => {
        // const userInfo = state.user.userInfo;
        // const unitSystem = userInfo?.unit_system;
        // if (unitSystem) {
        //   scope.setTag('user.unitSystem', unitSystem);
        // }
        // const userEmail = userInfo?.email;
        // if (userEmail) {
        //   scope.setTag('user.email', userEmail);
        // }
        // scope.setTag('user.status', state.user.userInfo?.status);
      },
    });
  }

  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const appliedMiddleware = applyMiddleware(sagaMiddleware);
  const enhancers = compose(
    ...compact([appliedMiddleware, reactorEnhancer, sentryReduxEnhancer]),
  );
  const persistedReducer = persistReducer(persistorConfig, rootReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = createStore(persistedReducer, initialState, enhancers as any);
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
