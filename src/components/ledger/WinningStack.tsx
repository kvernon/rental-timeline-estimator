import { ILedgerDetailSummary } from '@cubedelement.com/realty-investor-timeline';
import { AddressFormatted } from '../cells/AddressSpan';
import { DateCell } from '../cells/DateCell';
import { MoneyCell } from '../cells/MoneyCell';
import React from 'react';
import { StackWin } from './StackWin';
import { Stack } from '../core/Stack';
import { LedgerType } from './LedgerType';
import styled from '@emotion/styled';

const StackWinHand = styled(StackWin)`
  &:hover {
    cursor: pointer;
  }
`;

export function WinningStack(props: { ledgerDetailSummary: ILedgerDetailSummary; onClick: () => void }) {
  return (
    <StackWinHand direction={'row'} onClick={props.onClick}>
      <DateCell date={props.ledgerDetailSummary.date} />
      <Stack direction="row">
        <AddressFormatted />
        <LedgerType />
        <MoneyCell currency={props.ledgerDetailSummary.equity} />
        <MoneyCell currency={props.ledgerDetailSummary.purchases} />
        <MoneyCell currency={props.ledgerDetailSummary.cashFlow} />
        <MoneyCell currency={props.ledgerDetailSummary.averageQuarterlyCashFlow} />
      </Stack>
      <MoneyCell currency={props.ledgerDetailSummary.balance} />
    </StackWinHand>
  );
}
