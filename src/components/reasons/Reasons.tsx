import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import React from 'react';
import { ReasonUserHasNoMoneyToInvest } from './ReasonUserHasNoMoneyToInvest';
import { ReasonDoesNotMeetUserRuleAnnualCashFlow } from './ReasonDoesNotMeetUserRuleAnnualCashFlow';
import styled from '@emotion/styled';
import { getDate } from '../../data/getDate';

const ListStyle = styled.ul`
  padding-left: 1rem;
  font-size: 10pt;
  min-height: 50px;
`;

const ListItemStyle = styled.li`
  padding-left: 0;
`;

const NoWidthDateCell = styled.span`
  width: unset;
  min-width: unset;
  padding-right: 0.5rem;
`;

export function Reasons(props: { historicalProperty: IHistoricalProperty }) {
  if (props.historicalProperty.reasons.length === 0) {
    return <ListStyle></ListStyle>;
  }

  return (
    <ListStyle>
      {props.historicalProperty.reasons.map((x) => {
        const isNoMoney = x.reason.startsWith('UserHasNoMoneyToInvest');
        const isRuleCash = x.reason.startsWith('DoesNotMeetUserRuleAnnualCashFlow');
        return (
          <ListItemStyle key={`reason-${props.historicalProperty.property.address}-${x.date.toISOString()}-${x.reason}`}>
            <NoWidthDateCell>{getDate(x.date)}</NoWidthDateCell>
            {isNoMoney && <ReasonUserHasNoMoneyToInvest reason={x} />}
            {isRuleCash && <ReasonDoesNotMeetUserRuleAnnualCashFlow reason={x} />}
            {!isNoMoney && !isRuleCash && x.reason}
          </ListItemStyle>
        );
      })}
    </ListStyle>
  );
}
