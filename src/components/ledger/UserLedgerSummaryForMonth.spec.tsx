import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserLedgerSummaryForMonth } from './UserLedgerSummaryForMonth';
import { ILedgerCollection, ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerItems } from './UserLedgerItems';

// Mock dependencies
jest.mock('./RegularStack');
jest.mock('./WinningStack');
jest.mock('./UserLedgerItems');
jest.mock('@cubedelement.com/realty-investor-timeline');

describe('UserLedgerSummaryForMonth', () => {
  let mockLedgerCollection: jest.Mocked<ILedgerCollection>;
  let mockLedgerSummary: ILedgerSummary;

  beforeEach(() => {
    mockLedgerCollection = {
      getSummaryAnnual: jest.fn(),
      filter: jest.fn(),
    } as unknown as jest.Mocked<ILedgerCollection>;

    mockLedgerSummary = {
      balance: 0,
      cashFlow: 1,
      date: new Date(),
      equity: 2,
      purchases: 3,
      averageCashFlow: 1.2,
    };
  });

  it('renders RegularStack when goal is not met', () => {
    render(
      <UserLedgerSummaryForMonth
        ledgerCollection={mockLedgerCollection}
        ledgerSummary={mockLedgerSummary}
        year={2023}
        goal={11} // Goal higher than cashFlow
      />,
    );

    expect(screen.getByText('RegularStack')).toBeInTheDocument();
    expect(screen.queryAllByText('WinningStack')).toEqual([]);
  });

  it('renders WinningStack when goal is met', () => {
    render(
      <UserLedgerSummaryForMonth
        ledgerCollection={mockLedgerCollection}
        ledgerSummary={mockLedgerSummary}
        year={2023}
        goal={1} // Goal higher than cashFlow
      />,
    );

    expect(screen.getByText('WinningStack')).toBeInTheDocument();
    expect(screen.queryAllByText('RegularStack')).toEqual([]);
  });

  it('toggles details on click', () => {
    render(<UserLedgerSummaryForMonth ledgerCollection={mockLedgerCollection} ledgerSummary={mockLedgerSummary} year={2023} goal={2000} />);

    const stack = screen.getByText('RegularStack');

    expect(UserLedgerItems).not.toHaveBeenCalled();

    fireEvent.click(stack);

    expect(UserLedgerItems).toHaveBeenCalled();
    expect(UserLedgerItems).toHaveBeenNthCalledWith(
      1,
      { ledgerCollection: mockLedgerCollection, date: mockLedgerSummary.date, goalMet: false },
      undefined,
    );
  });
});
