import React, { useState } from 'react';
import { Stack } from '../core/Stack';
import { ILedgerCollection, ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';
import { MoneyCell } from '../cells/MoneyCell';
import { DateCell } from '../cells/DateCell';
import { UserLedgerMonthly } from './UserLedgerMonthly';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import styled from '@emotion/styled';
import { AddressSpan } from '../cells/AddressSpan';

const AdjustedButton = styled.button`
  width: 50px;
`;

const StackWin = styled(Stack)`
  background-color: darkgreen;
`;

function RegularStack(props: { ledgerSummary: ILedgerSummary }) {
  return (
    <Stack direction={'row'}>
      <AddressSpan />
      <DateCell date={props.ledgerSummary.date} />
      <MoneyCell currency={props.ledgerSummary.equity} />
      <MoneyCell currency={props.ledgerSummary.purchases} />
      <MoneyCell currency={props.ledgerSummary.cashFlow} />
      <MoneyCell currency={props.ledgerSummary.averageCashFlow} />
      <MoneyCell currency={props.ledgerSummary.balance} />
    </Stack>
  );
}
function WinningStack(props: { ledgerSummary: ILedgerSummary }) {
  return (
    <StackWin direction={'row'}>
      <AddressSpan />
      <DateCell date={props.ledgerSummary.date} />
      <MoneyCell currency={props.ledgerSummary.equity} />
      <MoneyCell currency={props.ledgerSummary.purchases} />
      <MoneyCell currency={props.ledgerSummary.cashFlow} />
      <MoneyCell currency={props.ledgerSummary.averageCashFlow} />
      <MoneyCell currency={props.ledgerSummary.balance} />
    </StackWin>
  );
}

export function UserLedgerAnnualSummary(props: { ledgerCollection: ILedgerCollection; ledgerSummary: ILedgerSummary; year: number; goal: number }) {
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
        {props.ledgerSummary.cashFlow < props.goal && <RegularStack ledgerSummary={props.ledgerSummary} />}
        {props.ledgerSummary.cashFlow >= props.goal && <WinningStack ledgerSummary={props.ledgerSummary} />}
      </Stack>

      {isExpanded && <UserLedgerMonthly ledgerCollection={props.ledgerCollection} date={props.ledgerSummary.date} />}
    </Stack>
  );
}

export function UserLedgerAnnualSummaries(props: { ledgerCollection: ILedgerCollection; year: number; goal: number }) {
  const summariesAnnual = props.ledgerCollection.getSummariesAnnual(props.year);

  return summariesAnnual.map((data, i) => (
    <UserLedgerAnnualSummary
      ledgerCollection={props.ledgerCollection}
      ledgerSummary={data}
      year={i}
      goal={props.goal}
      key={`ledger-annual-summaries-${props.year}-${i}`}
    />
  ));
}
