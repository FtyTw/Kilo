import React, { memo, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useTheme } from '@assets/theme';
import styled, { ThemeProvider } from 'styled-components/native';

import Navigator from './routes/Navigator';
import { configStore } from './state/store';

const { store, persistor } = configStore();
export { store };
export const dispatch = store.dispatch;
export const persistedStore = persistor;

const App = memo(() => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedApplication />
      </PersistGate>
    </Provider>
  );
});

// We need ThemedApplication as separate entity to have access to user state
const ThemedApplication = memo(() => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <NavWrapper>
        <Navigator />
      </NavWrapper>
    </ThemeProvider>
  );
});

App.displayName = 'App';
ThemedApplication.displayName = 'ThemedApplication';

const NavWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex: 1;
`;

export default App;
