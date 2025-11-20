import React from 'react';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerSummaryForYear } from './UserLedgerSummaryForYear';
import { Stack } from '../core/Stack';
import { UserLedgerSummariesForYearByMonth } from './UserLedgerSummariesForYearByMonth';
import { ValidationPanel } from '../panels/ValidationPanel';
import { ValidatorTypes } from '../validators/ValidatorTypes';

export function UserLedgerPage(props: { ledgerCollection: ILedgerCollection; startDate: Date; endDate: Date; monthlyIncomeAmountGoal: number }) {
  const years: number[] = [];
  for (let i = props.startDate.getFullYear(); i < props.endDate.getFullYear() + 1; i++) {
    years.push(i);
  }

  return (
    <>
      {years.map((year) => {
        const isValid = () => {
          const b = props.ledgerCollection.getMonthlyCashFlowByYear(year).some((cashFlow) => cashFlow >= props.monthlyIncomeAmountGoal);
          return b ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
        };
        return (
          <ValidationPanel key={`${year}`} title={year.toString()} validationType={isValid()}>
            <Stack direction={'column'} key={`ledger-annual-${year}`}>
              <UserLedgerSummaryForYear
                key={`ledger-annual-summary-${year}`}
                ledgerCollection={props.ledgerCollection}
                year={year}
                goal={props.monthlyIncomeAmountGoal}
              />
              <UserLedgerSummariesForYearByMonth
                key={`ledger-annual-summaries-${year}`}
                ledgerCollection={props.ledgerCollection}
                year={year}
                goal={props.monthlyIncomeAmountGoal}
              />
            </Stack>
          </ValidationPanel>
        );
      })}
    </>
  );
}
