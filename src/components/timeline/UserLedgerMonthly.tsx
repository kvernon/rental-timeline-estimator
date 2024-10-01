import React from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell } from './MoneyCell';
import { DateCell, DateCellStyle } from './DateCell';
import { AddressSpan } from './AddressSpan';
import { getDate } from '../../data/getDate';

export function UserLedgerMonthly(props: { ledgerCollection: ILedgerCollection; date: Date }) {
  const ledgerItems = props.ledgerCollection.filter((l) => l.dateMatchesYearAndMonth(props.date));

  return ledgerItems.map((data, i) => (
    <Stack direction={'row'} key={`ledgerItem-${i}-${getDate(data.created as Date)}`}>
      <DateCellStyle>&gt;&gt;&gt;</DateCellStyle>
      <DateCell date={data.created} />
      <AddressSpan>{data.type}</AddressSpan>
      <AddressSpan>{data.note}</AddressSpan>
      <MoneyCell currency={data.amount} />
    </Stack>
  ));
}
