import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReasonUserHasNoMoneyToInvest } from './ReasonUserHasNoMoneyToInvest';

describe('ReasonUserHasNoMoneyToInvest', () => {
  test('returns null when reason does not match prefix', () => {
    const { container } = render(<ReasonUserHasNoMoneyToInvest reason={{ reason: 'OtherReason:1000', additionalInfo: [], date: new Date() }} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders label and formatted balance when reason matches', () => {
    render(
      <ReasonUserHasNoMoneyToInvest
        reason={{ reason: 'UserHasNoMoneyToInvest:12345', additionalInfo: [{ name: 'Balance', value: 12345 }], date: new Date() }}
      />,
    );
    expect(screen.getByText('No Money To Invest')).toBeInTheDocument();
    // currencyFormatter will add locale formatting (commas); look for Balance prefix and number substring
    expect(screen.getByText(/Balance:/)).toHaveTextContent(/12,345|12345/);
  });
});
