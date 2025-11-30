import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITimeline } from '@cubedelement.com/realty-investor-timeline';

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
      state.timeline = action.payload;
      state.errorMessage = null;
    },
    setTimelineError(state, action: PayloadAction<string>) {
      state.timeline = null;
      state.errorMessage = action.payload;
    },
    setAnimationCompleted: (state, action: PayloadAction<boolean>) => {
      state.animationCompleted = action.payload;
    },
    resetResult: () => {
      return result;
    },
  },
});

export const { setTimeline, setTimelineError, setAnimationCompleted, resetResult } = timelineSlice.actions;

export default timelineSlice.reducer;
