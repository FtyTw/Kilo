import { AnyAction, CombinedState, combineReducers } from 'redux';

import { AppReducerState, AppSlice } from './app/AppSlice';

export interface RootState {
  app: AppReducerState;
}

export interface PersistedAppState extends RootState {
  _persist: { version: number; rehydrated: boolean };
}

const combinedReducer = combineReducers<CombinedState<RootState>>({
  app: AppSlice.reducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);

export { rootReducer };
