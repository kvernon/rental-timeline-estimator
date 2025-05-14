import React from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell, MoneyCellStyle } from '../cells/MoneyCell';
import { DateCellStyle } from '../cells/DateCell';
import { AddressSpan } from '../cells/AddressSpan';
import { ButtonCell } from '../cells/ButtonCell';

function LedgerHeader() {
  return (
    <Stack direction={'row'}>
      <ButtonCell />
      <AddressSpan />
      <DateCellStyle>Date:</DateCellStyle>
      <MoneyCellStyle>Equity:</MoneyCellStyle>
      <MoneyCellStyle>Purchases:</MoneyCellStyle>
      <MoneyCellStyle>Cash flow:</MoneyCellStyle>
      <MoneyCellStyle>Avg cash flow:</MoneyCellStyle>
      <MoneyCellStyle>Balance:</MoneyCellStyle>
    </Stack>
  );
}

export function UserLedgerAnnualSummary(props: { ledgerCollection: ILedgerCollection; year: number }) {
  const currentYear = props.ledgerCollection.getSummaryAnnual(props.year);
  return (
    <Stack direction={'column'}>
      <LedgerHeader />
      <Stack direction={'row'}>
        <ButtonCell>&gt;&gt;</ButtonCell>
        <AddressSpan />
        <DateCellStyle />
        <MoneyCell currency={currentYear.equity} />
        <MoneyCell currency={currentYear.purchases} />
        <MoneyCell currency={currentYear.cashFlow} />
        <MoneyCell currency={currentYear.averageCashFlow} />
        <MoneyCell currency={currentYear.balance} />
      </Stack>
    </Stack>
  );
}
