import { fork } from 'typed-redux-saga';

import { appSagas } from './app/AppSaga';

export function* rootSaga() {
  yield* fork(appSagas);
}
