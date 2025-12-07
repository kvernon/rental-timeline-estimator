import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { UserSummary } from './UserSummary';
import { getDate } from '../data/getDate';
import { useFormDispatch, useFormSelector } from '../redux/hooks';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux/store';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { when } from 'jest-when';
import {
  getActivelyOwnedPropertiesCount,
  getCompletedValidation,
  getEndDateBalanceForUser,
  getEquity,
  getGoalMetForUser,
  getOwnedOrSoldPropertiesCount,
  getStartAndEndDate,
} from '../redux/timelineSelectors';

jest.mock('../components/panels/ValidationPanel');
jest.mock('../components/panels/PanelDataSummary');
jest.mock('../components/panels/GoalPanelDataSummary');
jest.mock('react-redux');

describe('UserSummary unit tests', () => {
  const props: {
    ownedProperties: number;
    allOwnedProperties: number;
    startDate: Date;
    endDate: Date;
    metMonthlyGoal: boolean;
    balance: number;
    equity: number;
    estimatedCashFlow: number;
  } = {
    ownedProperties: 1,
    allOwnedProperties: 2,
    balance: 3,
    endDate: new Date(),
    startDate: new Date(),
    equity: 4,
    estimatedCashFlow: 5,
    metMonthlyGoal: false,
  };

  let useFormSelectorMock: jest.MockWithArgs<TypedUseSelectorHook<RootState>> & TypedUseSelectorHook<RootState> & {};

  beforeEach(() => {
    jest.mocked(useFormDispatch).mockImplementation().mockReturnValue(jest.fn());
    useFormSelectorMock = jest.mocked(useFormSelector).mockImplementation(() => {});
    when(useFormSelectorMock).calledWith(getGoalMetForUser).mockReturnValue(true);
    when(useFormSelectorMock).calledWith(getStartAndEndDate).mockReturnValue([new Date(), new Date()]);
    when(useFormSelectorMock).calledWith(getEquity).mockReturnValue(1);
    when(useFormSelectorMock).calledWith(getOwnedOrSoldPropertiesCount).mockReturnValue(2);
    when(useFormSelectorMock).calledWith(getActivelyOwnedPropertiesCount).mockReturnValue(2);
    when(useFormSelectorMock).calledWith(getEndDateBalanceForUser).mockReturnValue(4);
    when(useFormSelectorMock).calledWith(getCompletedValidation).mockReturnValue(ValidatorTypes.Valid);
    render(<UserSummary />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('and with defaults', () => {
    test('should render userSummary', () => {
      const title = `Results: ${getDate(props.startDate)} - ${getDate(props.endDate)}`;
      const userSummary = screen.getByLabelText<HTMLDivElement>(title);

      expect(userSummary).toBeInTheDocument();
    });

    test('should render Properties equity', () => {
      const panelDataSummary = screen.getByLabelText<HTMLDivElement>('Properties equity');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test('should render End balance', () => {
      const panelDataSummary = screen.getByLabelText<HTMLDivElement>('End balance');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test('should render Property owned', () => {
      const panelDataSummary = screen.getByLabelText<HTMLDivElement>('Properties owned');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test('should render Current properties', () => {
      const panelDataSummary = screen.getByLabelText<HTMLDivElement>('Current properties');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test('should render Goal Panel Data Summary', () => {
      const goalPanelDataSummary = screen.getByLabelText<HTMLDivElement>('Goal Panel Data Summary');

      expect(goalPanelDataSummary).toBeInTheDocument();
    });
  });
});
