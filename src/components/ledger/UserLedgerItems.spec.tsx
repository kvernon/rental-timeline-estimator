import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserLedgerItems } from './UserLedgerItems';
import { ILedgerCollection, LedgerItem } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerItem } from './UserLedgerItem';

jest.mock('@cubedelement.com/realty-investor-timeline');
jest.mock('./UserLedgerItem');

// Mock the single item component

describe('UserLedgerItems', () => {
  const mockDate = new Date(2023, 0, 1);
  const mockLedgerCollection: jest.Mocked<ILedgerCollection> = {
    filter: jest.fn(),
  } as unknown as jest.Mocked<ILedgerCollection>;

  it('renders a list of ledger items', () => {
    const ledgerItem1: jest.Mocked<LedgerItem> = new LedgerItem() as jest.Mocked<LedgerItem>;
    ledgerItem1.note = 'Item 1';
    ledgerItem1.amount = 100;
    ledgerItem1.created = new Date(2023, 0, 1);
    ledgerItem1.dateMatchesYearAndMonth.mockReturnValue(true);

    const ledgerItem2: jest.Mocked<LedgerItem> = new LedgerItem() as jest.Mocked<LedgerItem>;
    ledgerItem2.note = 'Goal Met';
    ledgerItem2.amount = 100;
    ledgerItem2.created = new Date(2023, 0, 2);
    ledgerItem2.dateMatchesYearAndMonth.mockReturnValue(true);

    mockLedgerCollection.filter.mockReturnValue([ledgerItem1, ledgerItem2]);

    render(<UserLedgerItems ledgerCollection={mockLedgerCollection} date={mockDate} goalMet={true} />);

    expect(UserLedgerItem).toHaveBeenNthCalledWith(1, { data: ledgerItem1, date: mockDate, goalMet: true }, undefined);
    expect(UserLedgerItem).toHaveBeenNthCalledWith(2, { data: ledgerItem2, date: mockDate, goalMet: true }, undefined);
  });
});
