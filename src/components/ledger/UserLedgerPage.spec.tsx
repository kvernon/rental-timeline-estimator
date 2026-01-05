import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserLedgerPage } from './UserLedgerPage';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store';
import { when } from 'jest-when';
import { getUser } from '../../redux/timelineSelectors';
import { useFormSelector } from '../../redux/hooks';
import { ILedgerCollection, IUser } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerSummaryForYear } from './UserLedgerSummaryForYear';
import { UserLedgerSummariesForYearByMonth } from './UserLedgerSummariesForYearByMonth';
import { useYears } from './useYears';

jest.mock('./UserLedgerSummaryForYear');
jest.mock('./UserLedgerSummariesForYearByMonth');
jest.mock('../panels/ValidationPanel');
jest.mock('react-redux');

// Mock other likely dependencies
jest.mock('../core/Card');
jest.mock('./useYears');

describe('UserLedgerPage', () => {
  let mockLedgerCollection: jest.Mocked<ILedgerCollection>;
  let useFormSelectorMock: jest.MockWithArgs<TypedUseSelectorHook<RootState>> & TypedUseSelectorHook<RootState> & {};

  beforeEach(() => {
    mockLedgerCollection = {
      getSummaryAnnual: jest.fn(),
      getMonthlyCashFlowByYear: jest.fn().mockReturnValue([1, 2]),
      filter: jest.fn(),
    } as unknown as jest.Mocked<ILedgerCollection>;

    jest.mocked(useYears).mockReturnValue([2026]);

    useFormSelectorMock = jest.mocked(useFormSelector).mockImplementation(() => {});
    when(useFormSelectorMock)
      .calledWith(getUser)
      .mockReturnValue({
        monthlyIncomeAmountGoal: 1,
        ledgerCollection: mockLedgerCollection,
        monthlySavedAmount: 2,
        getCashFlowMonth: jest.fn(),
        clone: jest.fn(),
        loanSettings: null,
      } as unknown as jest.Mocked<IUser>);
  });

  it('renders the page structure', () => {
    render(<UserLedgerPage />);

    expect(UserLedgerSummaryForYear).toHaveBeenNthCalledWith(1, { goal: 1, ledgerCollection: mockLedgerCollection, year: 2026 }, undefined);
    expect(UserLedgerSummariesForYearByMonth).toHaveBeenNthCalledWith(1, { goal: 1, ledgerCollection: mockLedgerCollection, year: 2026 }, undefined);
  });
});
