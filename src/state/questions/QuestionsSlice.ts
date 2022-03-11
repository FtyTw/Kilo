import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuestionsReducerState {
  questions: Array<string>;
  answers: Array<string>;
  error: boolean | string;
  loading: boolean;
  visited_page: string;
}

export const QuestionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    answers: [],
    error: false,
    loading: true,
    visited_page: null,
  },
  reducers: {
    addAnswer: (
      state,
      action: PayloadAction<{ question_type: string; answer: string }>,
    ) => {
      state.answers.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLastVisitedPage: (state, action) => {
      state.visited_page = action.payload;
    },
    addQuestions: (state, action) => {
      state.questions = action.payload;
      state.loading = false;
    },
    questionsRequestFailed: state => {
      state.questions = [];
    },
    getQuestions: state => state,
  },
});
