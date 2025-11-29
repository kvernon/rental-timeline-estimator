import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { GoalPanelDataSummary } from './GoalPanelDataSummary';
import { currencyFormatter } from '../../data/currency-formatter';
import { useFormDispatch, useFormSelector } from '../../redux/hooks';
import { when } from 'jest-when';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store';
import { getEstimatedCashFlow, getGoalMetForUser } from '../../redux/timeilneSelectors';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';

jest.mock('react-confetti');
jest.mock('@number-flow/react');
jest.mock('../../data/currency-formatter');
jest.mock('react-redux');

describe('GoalPanelDataSummary unit tests', () => {
  let useFormSelectorMock: jest.MockWithArgs<TypedUseSelectorHook<RootState>> & TypedUseSelectorHook<RootState> & {};

  beforeEach(() => {
    useFormSelectorMock = jest.mocked(useFormSelector).mockImplementation(() => {});
    when(useFormSelectorMock).calledWith(getEstimatedCashFlow).mockReturnValue(10);
    when(useFormSelectorMock).calledWith(getGoalMetForUser).mockReturnValue(true);
    jest.mocked(useFormDispatch).mockImplementation().mockReturnValue(jest.fn());
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    jest.mocked(currencyFormatter).mockReturnValue((10).toString());
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('and defaults', () => {
    test('should render title', () => {
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');

      render(<GoalPanelDataSummary />);
      const panelDataSummary = screen.getByText<HTMLDivElement>('Estimated monthly cash flow');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test.only('should render data', () => {
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');

      // 1. Render first so the useEffect runs and schedules the timeout
      render(<GoalPanelDataSummary />);

      act(() => {
        jest.advanceTimersByTime(DEFAULT_START_DELAY * 61);
      });

      // 3. Now check for the value
      const panelDataSummary = screen.getByText('10');

      expect(panelDataSummary).toBeInTheDocument();
    });
  });
});
