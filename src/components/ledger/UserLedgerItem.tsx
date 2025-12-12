import { LedgerItem } from '@cubedelement.com/realty-investor-timeline';
import { AddressFormatted } from '../cells/AddressSpan';
import { DateCell } from '../cells/DateCell';
import { MoneyCell, MoneyCellStyle } from '../cells/MoneyCell';
import React from 'react';
import { StackWin } from './StackWin';
import { RegStack } from './RegStack';
import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import { LedgerType } from './LedgerType';

const RegStackPad = styled(RegStack)`
  width: unset;
  margin-left: 20px;
`;

const StackWinWidthUnset = styled(StackWin)`
  width: unset;
`;

export function UserLedgerItem(props: { data: LedgerItem; date: Date; goalMet: boolean }) {
  if (props.goalMet) {
    return (
      <StackWinWidthUnset direction={'row'} paddingLeft={'20px'}>
        <DateCell date={props.data.created} />
        <LedgerType>{props.data.type}</LedgerType>
        <AddressFormatted note={props.data.note} />
        <Stack direction="row" spacing={0}>
          <MoneyCellStyle />
          <MoneyCellStyle />
        </Stack>
        <MoneyCell currency={props.data.amount} />
      </StackWinWidthUnset>
    );
  }

  return (
    <RegStackPad direction={'row'}>
      <DateCell date={props.data.created} />
      <LedgerType>{props.data.type}</LedgerType>
      <AddressFormatted note={props.data.note} />
      <Stack direction="row" spacing={1}>
        <MoneyCellStyle />
        <MoneyCellStyle />
      </Stack>
      <MoneyCell currency={props.data.amount} />
    </RegStackPad>
  );
}
