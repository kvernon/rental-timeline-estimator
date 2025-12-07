import { renderHook } from '@testing-library/react';
import { useTimeline } from './useTimeline';
import { useFormDispatch, useFormSelector } from '../redux/hooks';
import { getErrorMessage, getTimeline } from '../redux/timelineSelectors';
import { generateTimelineThunk } from '../redux/timelineThunk';
import { IWizardFormData } from '../redux/formSlice';
import { when } from 'jest-when';

jest.mock('../redux/hooks');
jest.mock('../redux/timelineSelectors');
jest.mock('../redux/timelineThunk');

describe('useTimeline', () => {
  const mockDispatch = jest.fn();
  const mockFormData = { someField: 'value' } as unknown as IWizardFormData;
  const mockTimeline = { id: 'timeline-1' };
  const mockErrorMessage = 'error message';
  const mockThunkAction = { type: 'thunk-action' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (generateTimelineThunk as jest.Mock).mockReturnValue(mockThunkAction);

    // Setup selectors using jest-when to return specific values based on the selector function passed
    when(useFormSelector as jest.Mock)
      .calledWith(getTimeline)
      .mockReturnValue(mockTimeline);

    when(useFormSelector as jest.Mock)
      .calledWith(getErrorMessage)
      .mockReturnValue(mockErrorMessage);
  });

  it('should dispatch generateTimelineThunk on mount', () => {
    renderHook(() => useTimeline(mockFormData));

    expect(generateTimelineThunk).toHaveBeenCalledWith(mockFormData);
    expect(mockDispatch).toHaveBeenCalledWith(mockThunkAction);
  });

  it('should return timeline and errorMessage from state', () => {
    const { result } = renderHook(() => useTimeline(mockFormData));

    expect(result.current.timeline).toBe(mockTimeline);
    expect(result.current.errorMessage).toBe(mockErrorMessage);
  });

  it('should dispatch generateTimelineThunk when formData changes', () => {
    const { rerender } = renderHook(({ data }) => useTimeline(data), {
      initialProps: { data: mockFormData },
    });

    expect(generateTimelineThunk).toHaveBeenCalledTimes(1);

    const newFormData = { ...mockFormData, otherField: 'newValue' } as unknown as IWizardFormData;

    rerender({ data: newFormData });

    expect(generateTimelineThunk).toHaveBeenCalledWith(newFormData);
    expect(generateTimelineThunk).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
