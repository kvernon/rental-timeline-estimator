import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import timelineReducer, { resetResult } from './timelineSlice';
import { Router } from '../router/router';

export const store = configureStore({
  reducer: {
    form: formReducer,
    result: timelineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 👈 disables warnings globally
    }),
});

let first = true;
const unsubscribe = Router.subscribe((state) => {
  // state is the router state; path is at state.location.pathname
  const pathname = state.location?.pathname ?? '';
  if (first) {
    first = false;
    return;
  }

  // Example rule: reset on every route EXCEPT Results
  if (pathname !== '/results') {
    store.dispatch(resetResult());
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TimelineThunk<ReturnType = void> = ThunkAction<
  ReturnType, // what the thunk returns
  RootState, // the state type
  unknown, // extra argument (rarely used)
  Action<string> // action type
>;

export { unsubscribe as unsubscribeRouter };
