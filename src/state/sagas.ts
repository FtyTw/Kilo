import { fork } from 'typed-redux-saga';

import { appSagas } from './app/AppSaga';
import { questionsSagas } from './questions/QuestionsSaga';

export function* rootSaga() {
  yield* fork(appSagas);
  yield* fork(questionsSagas);
}
