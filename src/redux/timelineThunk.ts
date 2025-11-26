import { TimelineThunk } from './store';
import { setTimeline, setTimelineError } from './timelineSlice';
import { generate } from '../data/generate';
import { IWizardFormData } from './formSlice';

export const generateTimelineThunk =
  (formData: IWizardFormData): TimelineThunk =>
  (dispatch) => {
    try {
      //console.log('generateTimelineThunk', formData);
      const timeline = generate(formData.userInfo, formData.propertiesInfo, formData.settings); // sync call
      dispatch(setTimeline(timeline));
    } catch (err) {
      dispatch(setTimelineError((err as Error).message));
    }
  };
