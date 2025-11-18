import React from 'react';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { getDate } from '../../data/getDate';
import { UserLedgerItem } from './UserLedgerItem';

/**
 * returns a ledger item collection for the given month
 * @param props
 * @constructor
 */
export function UserLedgerItems(props: { ledgerCollection: ILedgerCollection; date: Date; goalMet: boolean }) {
  const ledgerItems = props.ledgerCollection.filter((l) => l.dateMatchesYearAndMonth(props.date));

  return ledgerItems.map((data, i) => {
    return <UserLedgerItem data={data} date={props.date} goalMet={props.goalMet} key={`ledgerItem-${getDate(data.created as Date)}-${i}`} />;
  });
}
