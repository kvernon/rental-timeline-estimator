export const MoneyCell = jest.fn((props: { currency?: number }) => (
  <div data-testid="money-cell">
    <span>MoneyCell</span>
    {props.currency}
  </div>
));
