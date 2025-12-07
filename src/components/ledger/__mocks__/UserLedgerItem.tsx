import { LedgerItem } from '@cubedelement.com/realty-investor-timeline';

export const UserLedgerItem = jest.fn((props: { data: LedgerItem; date: Date; goalMet: boolean }) => (
  <div>
    {props.data.amount} - {props.goalMet ? 'Goal Met' : 'Goal Not Met'}
  </div>
));
