import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WinningStack } from './WinningStack';
import { ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';

// Mock the StackWin styled component
jest.mock('./StackWin', () => ({
  StackWin: (props: { onClick: () => void }) => <div data-testid="stack-win" {...props} />,
}));

describe('WinningStack', () => {
  const mockOnClick = jest.fn();
  const mockLedgerSummary: ILedgerSummary = {
    averageCashFlow: 0,
    balance: 0,
    cashFlow: 0,
    date: new Date(),
    equity: 0,
    purchases: 0,
  };

  it('renders correctly and handles click', () => {
    render(<WinningStack ledgerSummary={mockLedgerSummary} onClick={mockOnClick} />);

    const stack = screen.getByTestId('stack-win');
    expect(stack).toBeInTheDocument();

    fireEvent.click(stack);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
