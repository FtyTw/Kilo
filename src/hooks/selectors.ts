import { useSelector } from 'react-redux';

import { selectAnswers, selectQuestions } from '../state/selectors';

export const useAnswers = () => {
  const { answers } = useSelector(selectAnswers);

  return answers;
};

export const useQuestions = () => {
  const questionState = useSelector(selectQuestions);

  return questionState;
};
