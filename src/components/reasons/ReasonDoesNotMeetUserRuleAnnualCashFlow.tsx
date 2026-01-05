import { currencyFormatter } from '../../data/currency-formatter';
import styled from '@emotion/styled';
import { IHistoricalReason } from '@cubedelement.com/realty-investor-timeline';

const SpanRule = styled.span`
  padding-left: 5px;
  width: unset;
`;

export function ReasonDoesNotMeetUserRuleAnnualCashFlow(props: { reason: IHistoricalReason }) {
  if (!props.reason.reason.startsWith('DoesNotMeetUserRuleAnnualCashFlow')) {
    return null;
  }

  //"DoesNotMeetUserRuleAnnualCashFlow rule: 3600 property: 3156",
  return (
    <>
      <span>Does Not Meet Annual Cash Flow</span>
      {props.reason.additionalInfo.map((x) => (
        <SpanRule key={x.name}>
          {x.name}: {currencyFormatter(x.value)}
        </SpanRule>
      ))}
    </>
  );
}
