import { ILedgerCollection, ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';

export const UserLedgerSummaryForMonth = jest.fn(
  (props: { ledgerCollection: ILedgerCollection; ledgerSummary: ILedgerSummary; year: number; goal: number }) => (
    <div>
      <span>UserLedgerSummaryForMonth</span>
      {props.year} {props.goal}
    </div>
  ),
);
