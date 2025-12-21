import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegularStack } from './RegularStack';
import { ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';

// Mock the RegStack styled component to avoid needing theme providers for this unit test
jest.mock('./RegStack', () => ({
  RegStack: (props: { ledgerSummary: ILedgerSummary; onClick: () => void }) => <div data-testid="reg-stack" {...props} />,
}));

describe('RegularStack', () => {
  const mockOnClick = jest.fn();
  const mockLedgerSummary: ILedgerSummary = {
    date: new Date(),
    balance: 0,
    cashFlow: 0,
    averageCashFlow: 0,
    purchases: 0,
    equity: 0,
  };

  it('renders correctly and handles click', () => {
    render(<RegularStack ledgerSummary={mockLedgerSummary} onClick={mockOnClick} />);

    const stack = screen.getByTestId('reg-stack');
    expect(stack).toBeInTheDocument();

    fireEvent.click(stack);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
