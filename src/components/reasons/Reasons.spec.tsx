import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Reasons } from './Reasons';
import { IRentalPropertyEntity, IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline';

// Mock child components to make assertions easier and avoid tight coupling
jest.mock('./ReasonUserHasNoMoneyToInvest', () => ({
  ReasonUserHasNoMoneyToInvest: (props: { reason: string }) =>
    props.reason.startsWith('UserHasNoMoneyToInvest') ? <span data-testid="no-money">NoMoney</span> : null,
}));

jest.mock('./ReasonDoesNotMeetUserRuleAnnualCashFlow', () => ({
  ReasonDoesNotMeetUserRuleAnnualCashFlow: (props: { reason: string }) =>
    props.reason.startsWith('DoesNotMeetUserRuleAnnualCashFlow') ? <span data-testid="rule-cash">RuleCash</span> : null,
}));

jest.mock('../cells/DateCell', () => ({
  DateCell: (props: { date: Date }) => <span data-testid="date-cell">{props.date.toISOString()}</span>,
}));

describe('Reasons', () => {
  const baseHistorical = (reasons: { date: Date; reason: string }[]): IHistoricalProperty => ({
    property: { address: '123 Main' } as IRentalPropertyEntity,
    reasons,
  });

  test('returns null when no reasons', () => {
    const { container } = render(<Reasons historicalProperty={baseHistorical([])} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders list items with DateCell and specific reason components', () => {
    const reasons = [
      { date: new Date('2024-01-01T00:00:00.000Z'), reason: 'UserHasNoMoneyToInvest:1000' },
      { date: new Date('2024-02-01T00:00:00.000Z'), reason: 'DoesNotMeetUserRuleAnnualCashFlow:0' },
      { date: new Date('2024-03-01T00:00:00.000Z'), reason: 'SomeOtherReason' },
    ];

    render(<Reasons historicalProperty={baseHistorical(reasons)} />);

    // DateCell renders ISO string for each
    expect(screen.getByText('2024-01-01T00:00:00.000Z')).toBeInTheDocument();
    expect(screen.getByText('2024-02-01T00:00:00.000Z')).toBeInTheDocument();
    expect(screen.getByText('2024-03-01T00:00:00.000Z')).toBeInTheDocument();

    // Specific reason components
    expect(screen.getByTestId('no-money')).toBeInTheDocument();
    expect(screen.getByTestId('rule-cash')).toBeInTheDocument();

    // Fallback reason appears when neither specialized component matches
    expect(screen.getByText('SomeOtherReason')).toBeInTheDocument();
  });
});
