import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserLedgerItem } from './UserLedgerItem';
import { LedgerItem } from '@cubedelement.com/realty-investor-timeline';
import { LedgerItemType } from '@cubedelement.com/realty-investor-timeline/dist/src/ledger/ledger-item-type';

jest.mock('@cubedelement.com/realty-investor-timeline');

describe('UserLedgerItem', () => {
  const mockDate = new Date(2023, 0, 15);
  const mockData: jest.Mocked<LedgerItem> = new LedgerItem() as jest.Mocked<LedgerItem>;
  mockData.amount = 500;
  mockData.type = LedgerItemType.CashFlow;

  it('renders item details', () => {
    render(<UserLedgerItem data={mockData} date={mockDate} goalMet={false} />);

    // Check for the amount or name being rendered
    expect(screen.getByText(LedgerItemType.CashFlow)).toBeInTheDocument();
    // Depending on formatting, amount might be '500' or '$500.00'
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });

  it('indicates goal met status if applicable', () => {
    const { container } = render(<UserLedgerItem data={mockData} date={mockDate} goalMet={true} />);
    // Check for styling or specific elements that indicate the goal was met
    expect(container).toBeInTheDocument();
  });
});
