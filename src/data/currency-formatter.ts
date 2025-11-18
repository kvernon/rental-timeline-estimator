import { fixedAndFloat } from './fixed-and-float';

export function currencyFormatter(value: number): string {
  const amount = fixedAndFloat(value);
  if (amount === 0) {
    return '-';
  }

  if (amount < 0) {
    return `(${(amount * -1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;
  }
  return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
