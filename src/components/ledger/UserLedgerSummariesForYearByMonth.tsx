import React from 'react';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerSummaryForMonth } from './UserLedgerSummaryForMonth';

/**
 * returns a ledger summary collection for the given year
 * @param props
 * @constructor
 */
export function UserLedgerSummariesForYearByMonth(props: { ledgerCollection: ILedgerCollection; year: number; goal: number }) {
  const summariesAnnual = props.ledgerCollection.getSummariesAnnual(props.year);

  return summariesAnnual.map((data, i) => (
    <UserLedgerSummaryForMonth
      ledgerCollection={props.ledgerCollection}
      ledgerSummary={data}
      year={i}
      goal={props.goal}
      key={`ledger-annual-summaries-${props.year}-${i}`}
    />
  ));
}
