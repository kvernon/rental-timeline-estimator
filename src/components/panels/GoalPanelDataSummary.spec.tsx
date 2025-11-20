import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';

import { GoalPanelDataSummary } from './GoalPanelDataSummary';

import { currencyFormatter } from '../../data/currency-formatter';
import { ValidatorTypes } from '../validators/ValidatorTypes';
jest.mock('react-confetti');
jest.mock('@number-flow/react');
jest.mock('../../data/currency-formatter');

describe('GoalPanelDataSummary unit tests', () => {
  const props: { data: number; validationType: ValidatorTypes } = {
    data: 1,
    validationType: ValidatorTypes.Valid,
  };

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    jest.mocked(currencyFormatter).mockReturnValue(props.data.toString());
    render(<GoalPanelDataSummary {...props} />);
  });

  describe('and defaults', () => {
    test('should render title', () => {
      const panelDataSummary = screen.getByText<HTMLDivElement>('Estimated monthly cash flow');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test('should render data', () => {
      const panelDataSummary = screen.getByText<HTMLDivElement>(props.data);

      expect(panelDataSummary).toBeInTheDocument();
    });
  });
});
