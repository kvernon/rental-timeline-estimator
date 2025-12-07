import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';

export const UserLedgerItems = jest.fn((props: { ledgerCollection: ILedgerCollection; date: Date; goalMet: boolean }) => (
  <div>
    <span>UserLedgerItems</span>
    {props.goalMet ? 'Goal Met' : 'Goal Not Met'}
  </div>
));
