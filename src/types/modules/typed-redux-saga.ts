import { SelectEffect, Tail } from '@redux-saga/core/effects';
import 'typed-redux-saga';

import { RootState } from '../../state/reducers';

declare module 'typed-redux-saga' {
  export function select<Fn extends (state: RootState, ...args: any[]) => any>(
    selector: Fn,
    ...args: Tail<Parameters<Fn>>
  ): SagaGenerator<ReturnType<Fn>, SelectEffect>;
}
