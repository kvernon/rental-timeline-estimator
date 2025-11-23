import { resetResult } from '../redux/timelineSlice';
import { store } from '../redux/store';
import { ActionFunction } from 'react-router';

export const ActionRoute: ActionFunction = async (args) => {
  console.log('ActionRoute', args);
  // This runs in a data-router action context (not a React render),
  // so we must dispatch directly via the Redux store (no hooks here).
  store.dispatch(resetResult());
};
