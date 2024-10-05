import React, { useState } from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection, ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell, MoneyCellStyle } from './MoneyCell';
import { DateCell } from './DateCell';
import { UserLedgerMonthly } from './UserLedgerMonthly';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import styled from '@emotion/styled';
import { AddressSpan } from './AddressSpan';

const AdjustedButton = styled.button`
  width: 50px;
`;

export function UserLedgerAnnualSummary(props: { ledgerCollection: ILedgerCollection; ledgerSummary: ILedgerSummary; year: number }) {
  //this is doing it for all, it should be individual
  const [isExpanded, setIsExpanded] = useState(false);

  const coreTheme = useTheme() as IThemeOptions;

  return (
    <Stack direction={'column'}>
      <Stack direction={'row'}>
        <AdjustedButton
          role={'expand'}
          theme={coreTheme}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? '-' : '+'}
        </AdjustedButton>
        <Stack direction={'row'}>
          <AddressSpan />
          <DateCell date={props.ledgerSummary.date} />
          <MoneyCellStyle>{props.ledgerSummary.equity}</MoneyCellStyle>
          <MoneyCellStyle>{props.ledgerSummary.purchases}</MoneyCellStyle>
          <MoneyCell currency={props.ledgerSummary.cashFlow} />
          <MoneyCell currency={props.ledgerSummary.averageCashFlow} />
          <MoneyCell currency={props.ledgerSummary.balance} />
        </Stack>
      </Stack>

      {isExpanded && <UserLedgerMonthly ledgerCollection={props.ledgerCollection} date={props.ledgerSummary.date} />}
    </Stack>
  );
}

export function UserLedgerAnnualSummaries(props: { ledgerCollection: ILedgerCollection; year: number }) {
  const summariesAnnual = props.ledgerCollection.getSummariesAnnual(props.year);

  return summariesAnnual.map((data, i) => (
    <UserLedgerAnnualSummary ledgerCollection={props.ledgerCollection} ledgerSummary={data} year={i} key={`annualSummary-${i}}`} />
  ));
}
