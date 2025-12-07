import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserLedgerSummaryForYear } from './UserLedgerSummaryForYear';
import { ILedgerCollection, ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';

// Mock dependencies
jest.mock('../cells/MoneyCell');
jest.mock('./UserLedgerHeader', () => ({
  UserLedgerHeader: () => <div data-testid="ledger-header">Header</div>,
}));
jest.mock('./UserLedgerSummariesForYearByMonth', () => ({
  UserLedgerSummariesForYearByMonth: () => <div data-testid="year-by-month">Year By Month Summaries</div>,
}));
jest.mock('@cubedelement.com/realty-investor-timeline');

describe('UserLedgerSummaryForYear', () => {
  let mockLedgerCollection: jest.Mocked<ILedgerCollection>;

  beforeEach(() => {
    mockLedgerCollection = {
      getSummaryAnnual: jest.fn(),
      filter: jest.fn(),
    } as unknown as jest.Mocked<ILedgerCollection>;
  });

  it('renders the header and the yearly summary content', () => {
    mockLedgerCollection.getSummaryAnnual.mockReturnValue({
      equity: 1,
      cashFlow: 2,
      averageCashFlow: 3,
      balance: 4,
    } as ILedgerSummary);

    render(<UserLedgerSummaryForYear ledgerCollection={mockLedgerCollection} year={2023} goal={1000} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
