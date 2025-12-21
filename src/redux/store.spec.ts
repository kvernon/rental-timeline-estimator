import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import resultReducer, { NullableTimeline, resetResult, setTimeline } from './timelineSlice';
import { ITimeline, IUser } from '@cubedelement.com/realty-investor-timeline';

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
    const t: jest.Mocked<NullableTimeline> = {
      user: {} as unknown as jest.Mocked<IUser>,
      rentals: [],
      clone: jest.fn(),
      endDate: new Date(),
      startDate: new Date(),
      getCashFlowMonthByEndDate: jest.fn(),
    } as unknown as jest.Mocked<ITimeline>;
    store.dispatch(setTimeline(t));
    expect(store.getState().result.timeline).toBe(t);

    // dispatch resetResult
    store.dispatch(resetResult());
    expect(store.getState().result.timeline).toBeNull();
  });
});
