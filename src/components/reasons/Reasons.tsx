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
        const isNoMoney = x.reason.startsWith('UserHasNoMoneyToInvest');
        const isRuleCash = x.reason.startsWith('DoesNotMeetUserRuleAnnualCashFlow');
        return (
          <li key={`reason-${props.historicalProperty.property.address}-${x.date.toISOString()}-${x.reason}`}>
            <DateCell date={x.date} />
            {isNoMoney && <ReasonUserHasNoMoneyToInvest reason={x.reason} />}
            {isRuleCash && <ReasonDoesNotMeetUserRuleAnnualCashFlow reason={x.reason} />}
            {!isNoMoney && !isRuleCash && x.reason}
          </li>
        );
      })}
    </ul>
  );
}
