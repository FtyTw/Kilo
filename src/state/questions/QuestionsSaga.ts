import { call, put, takeLatest } from 'typed-redux-saga';
import axios from 'axios';

import { actions } from '../actions';

const BASE_URL = 'https://api.jsonbin.io/b/61cc2384c277c467cb37ff10';

export function* questionsSagas() {
  yield takeLatest(actions.questions.getQuestions.type, fetchQuestions);
}

const getApi = async () => {
  const {
    data: {
      data: { questions = [] },
    },
  } = await axios.get(BASE_URL);

  return questions.filter(({ type }) => type.match(/multiple|single/g));
};

function* fetchQuestions() {
  try {
    yield put(actions.questions.setLoading(true));
    yield put(actions.questions.setError(false));
    const questions = yield call(getApi);
    yield put(actions.questions.addQuestions(questions));
  } catch (e) {
    yield put(actions.questions.setError(e.message));
  } finally {
    yield put(actions.questions.setLoading(false));
  }
}
