/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { resetResult } from './timelineSlice';
import * as RouterModule from '../router/router';

// Mock the Router to capture the subscription callback
jest.mock('../router/router', () => {
  return {
    __esModule: true,
    Router: {
      subscribe: jest.fn((cb: (state: any) => void) => {
        // return unsubscribe function
        return jest.fn();
      }),
    },
  };
});

describe('store router subscription (line 18 in store.ts)', () => {
  test('subscribes to Router and dispatches resetResult based on pathname (after first event)', () => {
    // Importing store runs the subscription side effect at line 18
    const { store } = require('./store') as typeof import('./store');

    const subscribeMock = RouterModule.Router.subscribe as unknown as jest.Mock;
    expect(subscribeMock).toHaveBeenCalledTimes(1);

    // The callback passed to Router.subscribe
    const callback = subscribeMock.mock.calls[0][0] as (state: any) => void;
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // First router event is ignored (sets first=false and returns)
    callback({ location: { pathname: '/anywhere' } });
    expect(dispatchSpy).not.toHaveBeenCalled();

    // Second event for '/results' should NOT dispatch reset
    callback({ location: { pathname: '/results' } });
    expect(dispatchSpy).not.toHaveBeenCalled();

    // Third event for a different path triggers resetResult dispatch
    callback({ location: { pathname: '/another' } });
    expect(dispatchSpy).toHaveBeenCalledWith(resetResult());
  });
});
