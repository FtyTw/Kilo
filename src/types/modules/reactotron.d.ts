import { Reactotron } from 'reactotron-core-client';

// Augment console to have reactotron type
declare global {
  interface Console {
    tron:
      | (Reactotron<ReactotronReactNative> & ReactotronReactNative)
      | {
          log: () => null;
          error: () => null;
        };
  }
}

interface Reactotron {
  createSagaMonitor: () => Promise<void>;
  selectProduct: (product: unknown) => void;
}
