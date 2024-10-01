import React from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell, MoneyCellStyle } from './MoneyCell';
import { DateCellStyle } from './DateCell';

function LedgerHeader() {
  return (
    <Stack direction={'column'}>
      <Stack direction={'row'}>
        <DateCellStyle>Date:</DateCellStyle>
        <MoneyCellStyle>Equity:</MoneyCellStyle>
        <MoneyCellStyle>Purchases:</MoneyCellStyle>
        <MoneyCellStyle>Cash flow:</MoneyCellStyle>
        <MoneyCellStyle>Avg cash flow:</MoneyCellStyle>
        <MoneyCellStyle>Balance:</MoneyCellStyle>
      </Stack>
    </Stack>
  );
}

export function UserLedgerAnnualSummary(props: { ledgerCollection: ILedgerCollection; year: number }) {
  const currentYear = props.ledgerCollection.getSummaryAnnual(props.year);
  return (
    <>
      <LedgerHeader />
      <Stack direction={'row'}>
        <DateCellStyle>&gt;&gt;</DateCellStyle>
        <MoneyCellStyle>{currentYear.equity}</MoneyCellStyle>
        <MoneyCellStyle>{currentYear.purchases}</MoneyCellStyle>
        <MoneyCell currency={currentYear.cashFlow} />
        <MoneyCell currency={currentYear.averageCashFlow} />
        <MoneyCell currency={currentYear.balance} />
      </Stack>
    </>
  );
}
