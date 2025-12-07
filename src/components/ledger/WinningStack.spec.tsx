import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WinningStack } from './WinningStack';

// Mock the StackWin styled component
jest.mock('./StackWin', () => ({
  StackWin: (props: any) => <div data-testid="stack-win" {...props} />,
}));

describe('WinningStack', () => {
  const mockOnClick = jest.fn();
  const mockLedgerSummary: any = {
    amount: 2000,
  };

  it('renders correctly and handles click', () => {
    render(<WinningStack ledgerSummary={mockLedgerSummary} onClick={mockOnClick} />);

    const stack = screen.getByTestId('stack-win');
    expect(stack).toBeInTheDocument();

    fireEvent.click(stack);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
