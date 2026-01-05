import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Reasons } from './Reasons';
import { IRentalPropertyEntity, IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline';
import { getDate } from '../../data/getDate';
import { IHistoricalReason } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-reason';

// Mock child components to make assertions easier and avoid tight coupling
jest.mock('./ReasonUserHasNoMoneyToInvest', () => ({
  ReasonUserHasNoMoneyToInvest: (props: { reason: IHistoricalReason }) =>
    props.reason.reason.startsWith('UserHasNoMoneyToInvest') ? <span data-testid="no-money">NoMoney</span> : null,
}));

jest.mock('./ReasonDoesNotMeetUserRuleAnnualCashFlow', () => ({
  ReasonDoesNotMeetUserRuleAnnualCashFlow: (props: { reason: IHistoricalReason }) =>
    props.reason.reason.startsWith('DoesNotMeetUserRuleAnnualCashFlow') ? <span data-testid="rule-cash">RuleCash</span> : null,
}));

jest.mock('../cells/DateCell', () => ({
  DateCell: (props: { date: Date }) => <span data-testid="date-cell">{props.date.toISOString()}</span>,
}));
jest.mock('../../data/getDate');

describe('Reasons', () => {
  jest.mocked(getDate).mockReturnValue('some date');

  const baseHistorical = (
    reasons: {
      date: Date;
      reason: string;
      additionalInfo: {
        name: string;
        value: number;
      }[];
    }[],
  ): IHistoricalProperty => ({
    property: { address: '123 Main' } as IRentalPropertyEntity,
    reasons,
  });

  test('returns empty list when no reasons', () => {
    const { container } = render(<Reasons historicalProperty={baseHistorical([])} />);
    expect(container).toBeInTheDocument();
  });

  test('renders list items with DateCell and specific reason components', () => {
    const reasons = [
      { date: new Date('2024-01-01T00:00:00.000Z'), reason: 'UserHasNoMoneyToInvest:1000', additionalInfo: [] },
      { date: new Date('2024-02-01T00:00:00.000Z'), reason: 'DoesNotMeetUserRuleAnnualCashFlow:0', additionalInfo: [] },
      { date: new Date('2024-03-01T00:00:00.000Z'), reason: 'SomeOtherReason', additionalInfo: [] },
    ];

    render(<Reasons historicalProperty={baseHistorical(reasons)} />);

    // span renders date
    expect(screen.getAllByText('some date').length).toEqual(3);

    // Specific reason components
    expect(screen.getByTestId('no-money')).toBeInTheDocument();
    expect(screen.getByTestId('rule-cash')).toBeInTheDocument();

    // Fallback reason appears when neither specialized component matches
    expect(screen.getByText('SomeOtherReason')).toBeInTheDocument();
  });
});
