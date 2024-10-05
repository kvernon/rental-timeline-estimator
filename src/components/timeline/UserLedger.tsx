import React from 'react';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerAnnualSummary } from './UserLedgerAnnualSummary';
import { Stack } from '../core/Stack';
import { UserLedgerAnnualSummaries } from './UserLedgerAnnualSummaries';
import { ValidationPanel } from '../panels/ValidationPanel';

export function UserLedger(props: { ledgerCollection: ILedgerCollection; startDate: Date; endDate: Date; monthlyIncomeAmountGoal: number }) {
  const years: number[] = [];
  for (let i = props.startDate.getFullYear(); i < props.endDate.getFullYear(); i++) {
    years.push(i);
  }

  return (
    <>
      {years.map((year) => {
        return (
          <ValidationPanel
            title={year.toString()}
            isValid={() => props.ledgerCollection.getCashFlowMonth(props.endDate) >= props.monthlyIncomeAmountGoal}
          >
            <Stack direction={'column'} key={`ledger-annual-${year}`}>
              <UserLedgerAnnualSummary ledgerCollection={props.ledgerCollection} year={year} />
              <UserLedgerAnnualSummaries ledgerCollection={props.ledgerCollection} year={year} />
            </Stack>
          </ValidationPanel>
        );
      })}
    </>
  );
}
