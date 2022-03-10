import { useDispatch } from 'react-redux';

import { actions } from '../state/actions';

export const useQuestionsActions = () => {
  const dispatch = useDispatch();
  const getQuestionsAction = () => dispatch(actions.questions.getQuestions());
  const setQuestionsLoadingAction = (payload: boolean) =>
    dispatch(actions.questions.setLoading(payload));
  const setLastVisitedPageAction = (payload: string) =>
    dispatch(actions.questions.setLastVisitedPage(payload));

  return {
    getQuestionsAction,
    setQuestionsLoadingAction,
    setLastVisitedPageAction,
  };
};

export const useAnswersActions = () => {
  const dispatch = useDispatch();
  const addAnswerAction = payload =>
    dispatch(actions.answers.addAnswer(payload));
  const removeAnswerAction = payload =>
    dispatch(actions.answers.removeAnswer(payload));

  return {
    addAnswerAction,
    removeAnswerAction,
  };
};
