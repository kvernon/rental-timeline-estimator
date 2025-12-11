import { currencyFormatter } from '../../data/currency-formatter';
import styled from '@emotion/styled';

const SpanRule = styled.span`
  padding-left: 5px;
  width: unset;
`;

export function ReasonUserHasNoMoneyToInvest(props: { reason: string }) {
  if (!props.reason.startsWith('UserHasNoMoneyToInvest')) {
    return null;
  }

  return (
    <>
      <span>No Money To Invest</span>
      <SpanRule>Balance: {currencyFormatter(parseInt(props.reason.split(':')[1]))}</SpanRule>
    </>
  );
}
