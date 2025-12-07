export const DateCell = jest.fn((props: { date?: Date }) => (
  <div data-testid="date-cell">
    {props?.date?.getFullYear()}-{props?.date?.getMonth() || 0}-1
  </div>
));
