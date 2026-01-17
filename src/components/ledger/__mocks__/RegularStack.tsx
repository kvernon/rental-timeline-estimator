import { ILedgerDetailSummary, ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';

export const RegularStack = jest.fn((props: { ledgerDetailSummary: ILedgerDetailSummary; onClick: () => void }) => (
  <div>
    <span onClick={props.onClick}>RegularStack</span>
    <div>balance: {props.ledgerDetailSummary.balance}</div>
    <div>equity: {props.ledgerDetailSummary.equity}</div>
    <div>cashFlow: {props.ledgerDetailSummary.cashFlow}</div>
    <div>averageCashFlow: {props.ledgerDetailSummary.averageCashFlow}</div>
    <div>purchases: {props.ledgerDetailSummary.purchases}</div>
  </div>
));
