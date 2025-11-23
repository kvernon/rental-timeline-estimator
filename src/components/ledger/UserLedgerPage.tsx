import React from 'react';
import { UserLedgerSummaryForYear } from './UserLedgerSummaryForYear';
import { Stack } from '../core/Stack';
import { UserLedgerSummariesForYearByMonth } from './UserLedgerSummariesForYearByMonth';
import { ValidationPanel } from '../panels/ValidationPanel';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { useFormSelector } from '../../redux/hooks';
import { getStartAndEndDate, getUser } from '../../redux/timeilneSelectors';

export function UserLedgerPage() {
  const [startDate, endDate] = useFormSelector(getStartAndEndDate);
  const user = useFormSelector(getUser);
  const years: number[] = [];

  if (!startDate || !endDate || !user)
    return (
      <ValidationPanel title={'No data'} validationType={ValidatorTypes.Invalid}>
        <Stack direction={'column'}>
          <span>No data</span>
        </Stack>
      </ValidationPanel>
    );

  for (let i = startDate.getFullYear(); i < endDate.getFullYear() + 1; i++) {
    years.push(i);
  }

  return (
    <>
      {years.map((year) => {
        const isValid = () => {
          const b = user.ledgerCollection.getMonthlyCashFlowByYear(year).some((cashFlow) => cashFlow >= user.monthlyIncomeAmountGoal);
          return b ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
        };
        return (
          <ValidationPanel key={`${year}`} title={year.toString()} validationType={isValid()}>
            <Stack direction={'column'} key={`ledger-annual-${year}`}>
              <UserLedgerSummaryForYear
                key={`ledger-annual-summary-${year}`}
                ledgerCollection={user.ledgerCollection}
                year={year}
                goal={user.monthlyIncomeAmountGoal}
              />
              <UserLedgerSummariesForYearByMonth
                key={`ledger-annual-summaries-${year}`}
                ledgerCollection={user.ledgerCollection}
                year={year}
                goal={user.monthlyIncomeAmountGoal}
              />
            </Stack>
          </ValidationPanel>
        );
      })}
    </>
  );
}
