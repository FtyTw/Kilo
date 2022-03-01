import { put, takeLatest } from 'typed-redux-saga';
import { ActionFromCreator } from '@typings/general';

import { actions } from '../actions';

export function* appSagas() {
  yield* takeLatest(actions.app.getMinAppVersion.type, getMinAppVersion);
}

function* getMinAppVersion({
  payload: { forceUpdateRequired },
}: ActionFromCreator<typeof actions.app.getMinAppVersion>) {
  try {
    if (forceUpdateRequired) {
      yield* put(actions.app.clearState());
      yield* put(actions.app.setAppUpdateFlag(true));
    } else {
      yield* put(actions.app.setAppUpdateFlag(false));
    }
  } catch (e) {
    console.log(e);
  }
}
