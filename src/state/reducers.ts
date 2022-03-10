import { AnyAction, CombinedState, combineReducers } from 'redux';

import { AppReducerState, AppSlice } from './app/AppSlice';
import {
  QuestionsReducerState,
  QuestionsSlice,
} from './questions/QuestionsSlice';
import { AnswersReducerState, AnswersSlice } from './answers/AnswersSlice';

export interface RootState {
  app: AppReducerState;
  questions: QuestionsReducerState;
  answers: AnswersReducerState;
}

export interface PersistedAppState extends RootState {
  _persist: { version: number; rehydrated: boolean };
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  app: AppSlice.reducer,
  questions: QuestionsSlice.reducer,
  answers: AnswersSlice.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);

export { rootReducer };
