import React from 'react';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerAnnualSummary } from './UserLedgerAnnualSummary';
import { Stack } from '../core/Stack';
import { UserLedgerAnnualSummaries } from './UserLedgerAnnualSummaries';
import { Panel } from '../panels/Panel';

export function UserLedger(props: { ledgerCollection: ILedgerCollection; startDate: Date; endDate: Date }) {
  const years: number[] = [];
  for (let i = props.startDate.getFullYear(); i < props.endDate.getFullYear(); i++) {
    years.push(i);
  }

  return (
    <>
      {years.map((year) => {
        return (
          <Panel title={year.toString()}>
            <Stack direction={'column'} key={`ledger-annual-${year}`}>
              <UserLedgerAnnualSummary ledgerCollection={props.ledgerCollection} year={year} />
              <UserLedgerAnnualSummaries ledgerCollection={props.ledgerCollection} year={year} />
            </Stack>
          </Panel>
        );
      })}
    </>
  );
}
