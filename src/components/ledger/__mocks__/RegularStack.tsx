import { ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';

export const RegularStack = jest.fn((props: { ledgerSummary: ILedgerSummary; onClick: () => void }) => (
  <div>
    <span onClick={props.onClick}>RegularStack</span>
    <div>balance: {props.ledgerSummary.balance}</div>
    <div>equity: {props.ledgerSummary.equity}</div>
    <div>cashFlow: {props.ledgerSummary.cashFlow}</div>
    <div>averageCashFlow: {props.ledgerSummary.averageCashFlow}</div>
    <div>purchases: {props.ledgerSummary.purchases}</div>
  </div>
));
