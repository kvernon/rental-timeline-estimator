import { currencyFormatter } from '../../data/currency-formatter';
import styled from '@emotion/styled';
import { IHistoricalReason } from '@cubedelement.com/realty-investor-timeline';

const SpanRule = styled.span`
  padding-left: 5px;
  width: unset;
`;

export function ReasonUserHasNoMoneyToInvest(props: { reason: IHistoricalReason }) {
  if (!props.reason.reason.startsWith('UserHasNoMoneyToInvest')) {
    return null;
  }

  return (
    <>
      <span>No Money To Invest</span>
      {props.reason.additionalInfo.map((x) => (
        <SpanRule key={x.name}>
          {x.name}: ${currencyFormatter(x.value)}
        </SpanRule>
      ))}
    </>
  );
}
