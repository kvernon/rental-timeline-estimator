import { ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';
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

export function WinningStack(props: { ledgerSummary: ILedgerSummary; onClick: () => void }) {
  return (
    <StackWinHand direction={'row'} onClick={props.onClick}>
      <DateCell date={props.ledgerSummary.date} />
      <Stack direction="row">
        <AddressFormatted />
        <LedgerType />
        <MoneyCell currency={props.ledgerSummary.equity} />
        <MoneyCell currency={props.ledgerSummary.purchases} />
        <MoneyCell currency={props.ledgerSummary.cashFlow} />
      </Stack>
      <MoneyCell currency={props.ledgerSummary.balance} />
    </StackWinHand>
  );
}
