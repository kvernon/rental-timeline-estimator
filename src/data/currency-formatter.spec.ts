import { currencyFormatter } from './currency-formatter';

describe('currencyFormatter', () => {
  test('returns dash for zero', () => {
    expect(currencyFormatter(0)).toBe('-');
  });

  test('formats positive numbers with two decimals', () => {
    const out = currencyFormatter(12345.678);
    expect(out).toMatch(/12,345\.68|12345\.68/);
  });

  test('formats negative numbers in parentheses', () => {
    const out = currencyFormatter(-9876.5432);
    expect(out).toMatch(/^\(9,876\.54\)|^\(9876\.54\)/);
  });
});
