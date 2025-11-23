import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useFormDispatch: () => AppDispatch = useDispatch;
export const useFormSelector: TypedUseSelectorHook<RootState> = useSelector;
