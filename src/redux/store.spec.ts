import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import resultReducer, { resetResult, setTimeline } from './timelineSlice';

// Mock router subscription to avoid side effects when importing store.ts
jest.mock('../router/router', () => ({
  Router: { subscribe: jest.fn(() => jest.fn()) },
}));

describe('store configuration', () => {
  test('can create store and dispatch actions', () => {
    const store = configureStore({
      reducer: { form: formReducer, result: resultReducer },
      middleware: (gDM) => gDM({ serializableCheck: false }),
    });

    // initial
    const initial = store.getState();
    expect(initial.result.timeline).toBeNull();

    // dispatch setTimeline
    const t = { id: 'x' } as any;
    store.dispatch(setTimeline(t));
    expect(store.getState().result.timeline).toBe(t);

    // dispatch resetResult
    store.dispatch(resetResult());
    expect(store.getState().result.timeline).toBeNull();
  });
});
