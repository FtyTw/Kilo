import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AnswersReducerState {
  answers: Array<string>;
}
const initialState: AnswersReducerState = {
  answers: [],
};

export const AnswersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    removeAnswer: (state, action: PayloadAction<string>) => {
      state.answers = state.answers.filter(({ key }) => key !== action.payload);
    },
    addAnswer: (
      state,
      action: PayloadAction<{
        key: string;
        label: string;
        answers: Array<string>;
      }>,
    ) => {
      state.answers.push(action.payload);
    },
  },
});
