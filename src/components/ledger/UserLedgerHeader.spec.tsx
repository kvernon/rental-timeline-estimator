import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserLedgerHeader } from './UserLedgerHeader';

describe('UserLedgerHeader', () => {
  it('renders the header content', () => {
    // Assuming the header renders specific text or columns
    const { container } = render(<UserLedgerHeader />);
    expect(container).toBeInTheDocument();
    // You might want to check for specific text if you know what's inside, e.g.:
    // expect(screen.getByText(/Date/i)).toBeInTheDocument();
  });
});
