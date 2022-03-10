import { AppSlice } from './app/AppSlice';
import { QuestionsSlice } from './questions/QuestionsSlice';
import { AnswersSlice } from './answers/AnswersSlice';

export const actions = {
  app: AppSlice.actions,
  questions: QuestionsSlice.actions,
  answers: AnswersSlice.actions,
};
