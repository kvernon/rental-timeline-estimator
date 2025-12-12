import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReasonDoesNotMeetUserRuleAnnualCashFlow } from './ReasonDoesNotMeetUserRuleAnnualCashFlow';

describe('ReasonDoesNotMeetUserRuleAnnualCashFlow', () => {
  test('returns null when reason does not match prefix', () => {
    const { container } = render(<ReasonDoesNotMeetUserRuleAnnualCashFlow reason="OtherReason:1000" />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders label and formatted balance when reason matches', () => {
    render(<ReasonDoesNotMeetUserRuleAnnualCashFlow reason="DoesNotMeetUserRuleAnnualCashFlow rule: 3600 property: 3156" />);
    expect(screen.getByText('Does Not Meet Annual Cash Flow')).toBeInTheDocument();
    expect(screen.getByText(/Rule:/)).toHaveTextContent(/3,600.00/);
    expect(screen.getByText(/Property:/)).toHaveTextContent(/3,156/);
  });
});
