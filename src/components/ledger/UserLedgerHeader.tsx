import { Stack } from '../core/Stack';
import { AddressFormatted } from '../cells/AddressSpan';
import { DateCellStyle } from '../cells/DateCell';
import { MoneyCellStyle } from '../cells/MoneyCell';
import React from 'react';
import styled from '@emotion/styled';
import { LedgerType } from './LedgerType';

const StackHeader = styled(Stack)`
  background-color: rgba(0, 0, 0, 0.37);
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LastHeader = styled(MoneyCellStyle)`
  /* padding-right: 20px;*/
`;

const DateCellStyleHeader = styled(DateCellStyle)`
  margin-left: 20px;
`;

export function UserLedgerHeader() {
  return (
    <StackHeader direction={'row'}>
      <DateCellStyleHeader>Date:</DateCellStyleHeader>
      <LedgerType>Type:</LedgerType>
      <Stack direction="row" spacing={1}>
        <AddressFormatted note={'Note:'} />
        <MoneyCellStyle>Equity:</MoneyCellStyle>
        <MoneyCellStyle>Purchases:</MoneyCellStyle>
        <MoneyCellStyle>Cash Flow:</MoneyCellStyle>
      </Stack>
      <LastHeader>Balance:</LastHeader>
    </StackHeader>
  );
}
