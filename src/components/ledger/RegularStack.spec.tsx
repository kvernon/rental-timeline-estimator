import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegularStack } from './RegularStack';

// Mock the RegStack styled component to avoid needing theme providers for this unit test
jest.mock('./RegStack', () => ({
  RegStack: (props: any) => <div data-testid="reg-stack" {...props} />,
}));

describe('RegularStack', () => {
  const mockOnClick = jest.fn();
  const mockLedgerSummary: any = {
    amount: 1000,
    // Add other properties if strictly required by the component logic,
    // but for a visual stack usually the amount/height matters.
  };

  it('renders correctly and handles click', () => {
    render(<RegularStack ledgerSummary={mockLedgerSummary} onClick={mockOnClick} />);

    const stack = screen.getByTestId('reg-stack');
    expect(stack).toBeInTheDocument();

    fireEvent.click(stack);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
