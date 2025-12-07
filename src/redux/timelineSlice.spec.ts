import reducer, { IResult, setTimeline, setTimelineError, setAnimationCompleted, resetResult } from './timelineSlice';
import type { ITimeline } from '@cubedelement.com/realty-investor-timeline';
import { UnknownAction } from '@reduxjs/toolkit';

describe('timelineSlice reducer', () => {
  test('initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    expect(state.timeline).toBeNull();
    expect(state.errorMessage).toBeNull();
    expect(state.animationCompleted).toBe(false);
  });

  test('setTimeline sets timeline and clears error', () => {
    const base = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    const timeline = { id: 't' } as unknown as ITimeline;
    const next = reducer(base, setTimeline(timeline));
    expect(next.timeline).toBe(timeline);
    expect(next.errorMessage).toBeNull();
  });

  test('setTimelineError sets error and clears timeline', () => {
    const base: IResult = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    const next = reducer(base, setTimelineError('boom'));
    expect(next.timeline).toBeNull();
    expect(next.errorMessage).toBe('boom');
  });

  test('setAnimationCompleted toggles flag', () => {
    const base = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    const next = reducer(base, setAnimationCompleted(true));
    expect(next.animationCompleted).toBe(true);
  });

  test('resetResult returns initial state', () => {
    const dirty: IResult = { timeline: {} as unknown as ITimeline, errorMessage: 'err', animationCompleted: true };
    const next = reducer(dirty, resetResult());
    expect(next.timeline).toBeNull();
    expect(next.errorMessage).toBeNull();
    expect(next.animationCompleted).toBe(false);
  });
});
