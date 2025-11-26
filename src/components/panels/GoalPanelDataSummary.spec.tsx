import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';

import { GoalPanelDataSummary } from './GoalPanelDataSummary';

import { currencyFormatter } from '../../data/currency-formatter';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { useFormDispatch, useFormSelector } from '../../redux/hooks';
jest.mock('react-confetti');
jest.mock('@number-flow/react');
jest.mock('../../data/currency-formatter');
jest.mock('react-redux');
import { when } from 'jest-when';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store';
import { getEstimatedCashFlow, getGoalMetForUser } from '../../redux/timeilneSelectors';

describe('GoalPanelDataSummary unit tests', () => {
  const props: { data: number; validationType: ValidatorTypes } = {
    data: 1,
    validationType: ValidatorTypes.Valid,
  };

  let useFormSelectorMock: jest.MockWithArgs<TypedUseSelectorHook<RootState>> & TypedUseSelectorHook<RootState> & {};

  beforeEach(() => {
    useFormSelectorMock = jest.mocked(useFormSelector).mockImplementation(() => {});
    when(useFormSelectorMock).calledWith(getEstimatedCashFlow).mockReturnValue(10);
    when(useFormSelectorMock).calledWith(getGoalMetForUser).mockReturnValue(true);
    jest.mocked(useFormDispatch).mockImplementation().mockReturnValue(jest.fn());
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    jest.mocked(currencyFormatter).mockReturnValue((10).toString());
    render(<GoalPanelDataSummary />);
  });

  describe('and defaults', () => {
    test('should render title', () => {
      const panelDataSummary = screen.getByText<HTMLDivElement>('Estimated monthly cash flow');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test('should render data', () => {
      const panelDataSummary = screen.getByText<HTMLDivElement>(10);

      expect(panelDataSummary).toBeInTheDocument();
    });
  });
});
