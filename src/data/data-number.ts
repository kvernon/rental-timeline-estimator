'use strict';

export const fixedAndFloat = (value: number, precision?: number) => parseFloat(value.toFixed(precision || 2));

export function randomNumberBetween(start: number, end: number) {
  const diff = end - start;
  return Math.floor(Math.random() * diff + start);
}

export function currencyFormatter(value: number): string {
  const amount = fixedAndFloat(value);
  if (amount < 0) {
    return `$(${(amount * -1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;
  }
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
