import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';

export const UserLedgerSummaryForYear = jest.fn((props: { ledgerCollection: ILedgerCollection; year: number; goal: number }) => (
  <div>
    {props.year} {props.goal}
  </div>
));
