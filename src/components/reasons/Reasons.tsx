import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import React from 'react';
import { ReasonUserHasNoMoneyToInvest } from './ReasonUserHasNoMoneyToInvest';
import { ReasonDoesNotMeetUserRuleAnnualCashFlow } from './ReasonDoesNotMeetUserRuleAnnualCashFlow';
import { DateCell } from '../cells/DateCell';

export function Reasons(props: { historicalProperty: IHistoricalProperty }) {
  if (props.historicalProperty.reasons.length === 0) {
    return null;
  }

  return (
    <ul>
      {props.historicalProperty.reasons.map((x) => {
        const userHaNoMoneyToInvest = <ReasonUserHasNoMoneyToInvest reason={x.reason} />;
        const ruleCashFlowFalse = <ReasonDoesNotMeetUserRuleAnnualCashFlow reason={x.reason} />;
        return (
          <li key={`reason-${props.historicalProperty.property.address}`}>
            <DateCell date={x.date} />
            {userHaNoMoneyToInvest}
            {ruleCashFlowFalse}
            {!userHaNoMoneyToInvest && !ruleCashFlowFalse && x.reason}
          </li>
        );
      })}
    </ul>
  );
}
