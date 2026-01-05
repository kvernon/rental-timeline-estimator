import React from 'react';
import { UserLedgerSummaryForYear } from './UserLedgerSummaryForYear';
import { Stack } from '../core/Stack';
import { UserLedgerSummariesForYearByMonth } from './UserLedgerSummariesForYearByMonth';
import { ValidationPanel } from '../panels/ValidationPanel';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { useFormSelector } from '../../redux/hooks';
import { getUser } from '../../redux/timelineSelectors';
import { AnimatedWrapPanel } from '../AnimatedWrapPanel';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';
import { useYears } from './useYears';

export function UserLedgerPage() {
  const user = useFormSelector(getUser);
  const years = useYears();

  if (!user)
    return (
      <ValidationPanel title="No data" validationType={ValidatorTypes.Invalid}>
        <Stack>
          <span>No data</span>
        </Stack>
      </ValidationPanel>
    );

  return (
    <>
      {years.map((year, i) => {
        const isValid = () => {
          const b = user.ledgerCollection.getMonthlyCashFlowByYear(year).some((cashFlow) => cashFlow >= user.monthlyIncomeAmountGoal);
          return b ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
        };

        return (
          <AnimatedWrapPanel delay={i + DEFAULT_START_DELAY} key={`anim-${year}`}>
            <ValidationPanel key={`va-${year}`} title={year.toString()} validationType={isValid()}>
              <Stack key={`ledger-annual-${year}`}>
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
          </AnimatedWrapPanel>
        );
      })}
    </>
  );
}
