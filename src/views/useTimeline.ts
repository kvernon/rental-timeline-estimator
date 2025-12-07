import { useEffect } from 'react';
import { useFormSelector, useFormDispatch } from '../redux/hooks';
import { getErrorMessage, getTimeline } from '../redux/timelineSelectors';
import { generateTimelineThunk } from '../redux/timelineThunk';
import { IWizardFormData } from '../redux/formSlice';

export const useTimeline = (formData: IWizardFormData) => {
  const dispatch = useFormDispatch();
  const timeline = useFormSelector(getTimeline);
  const errorMessage = useFormSelector(getErrorMessage);

  useEffect(() => {
    dispatch(generateTimelineThunk(formData));
  }, [dispatch, formData]);

  return { timeline, errorMessage };
};
