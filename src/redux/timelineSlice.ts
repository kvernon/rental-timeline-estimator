import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITimeline } from '@cubedelement.com/realty-investor-timeline';
import { useState } from 'react';

export type NullableTimeline = ITimeline | null;

export interface IResult {
  timeline: NullableTimeline;
  errorMessage: string | null;
  animationCompleted: boolean;
}

const result: IResult = { timeline: null, errorMessage: null, animationCompleted: false };

const timelineSlice = createSlice({
  name: 'result',
  initialState: result,
  reducers: {
    setTimeline: (state, action: PayloadAction<NullableTimeline>) => {
      //console.log('setTimeline: ', action.payload);
      state.timeline = action.payload;
      state.errorMessage = null;
    },
    setTimelineError(state, action: PayloadAction<string>) {
      //console.log('setTimelineError: ', action.payload);
      state.timeline = null;
      state.errorMessage = action.payload;
    },
    setAnimationCompleted: (state, action: PayloadAction<boolean>) => {
      console.log('setAnimationCompleted: ', action.payload);
      state.animationCompleted = action.payload;
    },
    resetResult: () => {
      console.log('resetResult:');
      return result;
    },
  },
});

export const { setTimeline, setTimelineError, setAnimationCompleted, resetResult } = timelineSlice.actions;

export default timelineSlice.reducer;
