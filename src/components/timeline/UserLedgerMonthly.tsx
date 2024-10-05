import React from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell, MoneyCellStyle } from './MoneyCell';
import { DateCell } from './DateCell';
import { AddressSpan } from './AddressSpan';
import { getDate } from '../../data/getDate';
import { ButtonCell } from './ButtonCell';
import { TypeSpan } from './TypeSpan';

export function UserLedgerMonthly(props: { ledgerCollection: ILedgerCollection; date: Date }) {
  const ledgerItems = props.ledgerCollection.filter((l) => l.dateMatchesYearAndMonth(props.date));

  return ledgerItems.map((data, i) => (
    <Stack direction={'row'} key={`ledgerItem-${i}-${getDate(data.created as Date)}`}>
      <ButtonCell>&gt;&gt;&gt;</ButtonCell>
      <AddressSpan>{data.note}</AddressSpan>
      <DateCell date={data.created} />
      <TypeSpan>{data.type}</TypeSpan>
      <MoneyCellStyle />
      <MoneyCellStyle />
      <MoneyCellStyle />
      <MoneyCell currency={data.amount} />
    </Stack>
  ));
}
