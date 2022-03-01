import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const INITIAL_STATE: AppReducerState = {
  needToUpdate: false,
};

export interface AppReducerState {
  needToUpdate: boolean;
}

export const AppSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'app',
  reducers: {
    clearState: () => INITIAL_STATE,
    setAppUpdateFlag: (state, action: PayloadAction<boolean>) => {
      state.needToUpdate = action.payload;
    },

    getMinAppVersion: (
      state,
      action: PayloadAction<{
        minAppVersion: string;
        forceUpdateRequired: boolean;
      }>,
    ) => state,
  },
});
