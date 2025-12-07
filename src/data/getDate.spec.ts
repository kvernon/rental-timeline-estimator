import { getDate } from './getDate';

describe('getDate', () => {
  test('formats date as MMM d, yyyy in UTC', () => {
    const d = new Date('2024-01-05T12:34:56.000Z');
    // With timeZone UTC, should ignore local TZ
    expect(getDate(d)).toBe('Jan 5, 2024');
  });
});
