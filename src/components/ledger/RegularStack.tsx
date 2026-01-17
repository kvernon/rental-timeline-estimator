import { ILedgerDetailSummary } from '@cubedelement.com/realty-investor-timeline';
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

export function RegularStack(props: { ledgerDetailSummary: ILedgerDetailSummary; onClick: () => void }) {
  return (
    <RegStackHand direction={'row'} onClick={props.onClick}>
      <DateCell date={props.ledgerDetailSummary.date} />
      <LedgerType />
      <Stack direction="row">
        <AddressFormatted />
        <MoneyCell currency={props.ledgerDetailSummary.equity} />
        <MoneyCell currency={props.ledgerDetailSummary.purchases} />
        <MoneyCell currency={props.ledgerDetailSummary.cashFlow} />
        <MoneyCell currency={props.ledgerDetailSummary.averageQuarterlyCashFlow} />
      </Stack>
      <MoneyCell currency={props.ledgerDetailSummary.balance} />
    </RegStackHand>
  );
}
