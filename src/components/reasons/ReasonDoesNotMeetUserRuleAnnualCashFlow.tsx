import { currencyFormatter } from '../../data/currency-formatter';
import styled from '@emotion/styled';

const SpanRule = styled.span`
  padding-left: 5px;
  width: unset;
`;

export function ReasonDoesNotMeetUserRuleAnnualCashFlow(props: { reason: string }) {
  if (!props.reason.startsWith('DoesNotMeetUserRuleAnnualCashFlow')) {
    return null;
  }

  //"DoesNotMeetUserRuleAnnualCashFlow rule: 3600 property: 3156",
  const strings = props.reason.split(':');
  const rule = parseInt(strings[1].replace(' property', ''));
  const propertyCashFlow = parseInt(strings[2]);

  return (
    <>
      <span>Does Not Meet Annual Cash Flow</span>
      <SpanRule>Rule: {currencyFormatter(rule)}</SpanRule>
      <SpanRule>Property: {currencyFormatter(propertyCashFlow)}</SpanRule>
    </>
  );
}
