import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export interface PayloadAction<T> {
  payload: T;
  type: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionFromCreator<T extends ActionCreatorWithPayload<any>> = {
  type: T['type'];
  payload: Parameters<T>[0];
};
