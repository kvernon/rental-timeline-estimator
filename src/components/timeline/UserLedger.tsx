import React from 'react';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerAnnualSummary } from './UserLedgerAnnualSummary';
import { Stack } from '../core/Stack';
import { UserLedgerAnnualSummaries } from './UserLedgerAnnualSummaries';
import { ValidationPanel } from '../panels/ValidationPanel';

export function UserLedger(props: { ledgerCollection: ILedgerCollection; startDate: Date; endDate: Date; monthlyIncomeAmountGoal: number }) {
  const years: number[] = [];
  for (let i = props.startDate.getFullYear(); i < props.endDate.getFullYear() + 1; i++) {
    years.push(i);
  }

  return (
    <>
      {years.map((year) => {
        const isValid = () => {
          return props.ledgerCollection.getMonthlyCashFlowByYear(year).some((cashFlow) => cashFlow >= props.monthlyIncomeAmountGoal);
        };
        return (
          <ValidationPanel key={`${year}`} title={year.toString()} isValid={isValid}>
            <Stack direction={'column'} key={`ledger-annual-${year}`}>
              <UserLedgerAnnualSummary key={`ledger-annual-summary-${year}`} ledgerCollection={props.ledgerCollection} year={year} />
              <UserLedgerAnnualSummaries key={`ledger-annual-summaries-${year}`} ledgerCollection={props.ledgerCollection} year={year} />
            </Stack>
          </ValidationPanel>
        );
      })}
    </>
  );
}
