import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const INITIAL_STATE: AppReducerState = {
  needToUpdate: false,
  direction: 'horizontal',
};

export interface AppReducerState {
  needToUpdate: boolean;
  direction: string;
}

export const AppSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'app',
  reducers: {
    clearState: () => INITIAL_STATE,
    setGestureDirection: (state, action: PayloadAction<string>) => {
      state.direction = action.payload;
    },
    setAppUpdateFlag: (state, action: PayloadAction<boolean>) => {
      state.needToUpdate = action.payload;
    },

    getMinAppVersion: state => state,
  },
});
