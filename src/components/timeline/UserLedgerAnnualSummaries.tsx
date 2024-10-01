import React from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell, MoneyCellStyle } from './MoneyCell';
import { DateCell } from './DateCell';
import { UserLedgerMonthly } from './UserLedgerMonthly';

export function UserLedgerAnnualSummaries(props: { ledgerCollection: ILedgerCollection; year: number }) {
  const summariesAnnual = props.ledgerCollection.getSummariesAnnual(props.year);
  return summariesAnnual.map((data, i) => (
    <Stack direction={'column'}>
      <Stack direction={'row'} key={`annualSummary-${i}-${props.year}`}>
        <DateCell date={data.date} />
        <MoneyCellStyle>{data.equity}</MoneyCellStyle>
        <MoneyCellStyle>{data.purchases}</MoneyCellStyle>
        <MoneyCell currency={data.cashFlow} />
        <MoneyCell currency={data.averageCashFlow} />
        <MoneyCell currency={data.balance} />
      </Stack>
      <UserLedgerMonthly ledgerCollection={props.ledgerCollection} date={data.date} key={`UserLedgerMonthly-${i}-${props.year}`} />
    </Stack>
  ));
}
