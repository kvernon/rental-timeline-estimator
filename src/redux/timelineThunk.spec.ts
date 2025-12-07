import { generateTimelineThunk } from './timelineThunk';
import { setTimeline, setTimelineError } from './timelineSlice';
import * as gen from '../data/generate';
import type { AppDispatch, RootState } from './store';
import type { IWizardFormData } from './formSlice';

describe('timelineThunk', () => {
  const dispatch = jest.fn() as unknown as AppDispatch;
  const getState = jest.fn() as unknown as () => RootState;

  const formData: IWizardFormData = {
    // minimal valid structure for our thunk/generate usage
    userInfo: {} as IWizardFormData['userInfo'],
    propertiesInfo: {} as IWizardFormData['propertiesInfo'],
    settings: {} as IWizardFormData['settings'],
    rulesConfig: { purchaseRules: [], holdRules: [] },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('dispatches setTimeline when generate succeeds', () => {
    const timeline = { id: 'ok' } as unknown as ReturnType<typeof gen.generate>;
    jest.spyOn(gen, 'generate').mockReturnValueOnce(timeline);

    generateTimelineThunk(formData)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(setTimeline(timeline));
  });

  test('dispatches setTimelineError when generate throws', () => {
    jest.spyOn(gen, 'generate').mockImplementationOnce(() => {
      throw new Error('bad');
    });

    generateTimelineThunk(formData)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(setTimelineError('bad'));
  });
});
