import { ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';
import { AddressFormatted } from '../cells/AddressSpan';
import { DateCell } from '../cells/DateCell';
import { MoneyCell } from '../cells/MoneyCell';
import React from 'react';
import { RegStack } from './RegStack';
import { Stack } from '../core/Stack';
import { LedgerType } from './LedgerType';
import styled from '@emotion/styled';

const RegStackHand = styled(RegStack)`
  &:hover {
    cursor: pointer;
  }
`;

export function RegularStack(props: { ledgerSummary: ILedgerSummary; onClick: () => void }) {
  return (
    <RegStackHand direction={'row'} onClick={props.onClick}>
      <DateCell date={props.ledgerSummary.date} />
      <LedgerType />
      <Stack direction="row">
        <AddressFormatted />
        <MoneyCell currency={props.ledgerSummary.equity} />
        <MoneyCell currency={props.ledgerSummary.purchases} />
        <MoneyCell currency={props.ledgerSummary.cashFlow} />
        <MoneyCell currency={props.ledgerSummary.averageCashFlow} />
      </Stack>
      <MoneyCell currency={props.ledgerSummary.balance} />
    </RegStackHand>
  );
}
