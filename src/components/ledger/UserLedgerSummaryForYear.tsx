import React from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell } from '../cells/MoneyCell';
import { DateCellStyle } from '../cells/DateCell';
import { AddressSpan } from '../cells/AddressSpan';
import { UserLedgerHeader } from './UserLedgerHeader';
import styled from '@emotion/styled';
import { LedgerType } from './LedgerType';

const StackYearHeader = styled(Stack)`
  background-color: rgba(0, 0, 0, 0.24);
`;

const LastMoneyCell = styled(MoneyCell)`
  padding-right: 20px;
`;

/**
 * returns a each year's summary
 * @param props
 * @constructor
 */
export function UserLedgerSummaryForYear(props: { ledgerCollection: ILedgerCollection; year: number; goal: number }) {
  const currentYear = props.ledgerCollection.getSummaryAnnual(props.year);
  return (
    <Stack direction={'column'}>
      <UserLedgerHeader />
      <StackYearHeader direction={'row'}>
        <DateCellStyle />
        <Stack direction="row" paddingLeft={'20px'} spacing={1}>
          <AddressSpan />
          <LedgerType></LedgerType>
          <MoneyCell currency={currentYear.equity} />
          <MoneyCell currency={currentYear.purchases} />
          <MoneyCell currency={currentYear.cashFlow} />
          <MoneyCell currency={currentYear.averageCashFlow} />
        </Stack>
        <LastMoneyCell currency={currentYear.balance} />
      </StackYearHeader>
    </Stack>
  );
}
