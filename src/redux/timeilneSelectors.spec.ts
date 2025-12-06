/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  getTimeline,
  getErrorMessage,
  getRentals,
  getActivelyOwnedProperties,
  getActivelyOwnedPropertiesCount,
  getOwnedOrSoldProperties,
  getOwnedOrSoldPropertiesCount,
  getEndDateBalanceForUser,
  getStartAndEndDate,
  getEstimatedCashFlow,
  getUser,
  getGoalMetForUser,
  getEquity,
  getLedgerCollection,
  getAnimationCompleted,
  getCompletedValidation,
} from './timeilneSelectors';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';

describe('timeilneSelectors', () => {
  const end = new Date('2024-01-31T00:00:00.000Z');
  const start = new Date('2023-01-01T00:00:00.000Z');

  const makeState = () => {
    const rentals = [
      {
        property: {
          isOwned: true,
          soldDate: null,
          getCashFlowByDate: (d: Date) => (d.getTime() === end.getTime() ? 100 : 0),
          getEstimatedEquityFromSell: (d: Date) => (d.getTime() === end.getTime() ? 1000 : 0),
        },
      },
      {
        property: {
          isOwned: false,
          soldDate: new Date('2023-06-01T00:00:00.000Z'),
          getCashFlowByDate: () => 50,
          getEstimatedEquityFromSell: () => 500,
        },
      },
    ];

    const user = {
      metMonthlyGoal: (d: Date) => d.getTime() === end.getTime(),
      ledgerCollection: { items: [1, 2, 3] },
    } as any;

    const timeline = {
      rentals,
      startDate: start,
      endDate: end,
      getBalance: (d: Date) => (d.getTime() === end.getTime() ? 999 : 0),
      user,
    } as any;

    return {
      result: {
        timeline,
        errorMessage: 'oops',
        animationCompleted: true,
      },
      form: {} as any,
    } as any;
  };

  test('basic selectors', () => {
    const state = makeState();
    expect(getTimeline(state)).toBe(state.result.timeline);
    expect(getErrorMessage(state)).toBe('oops');
    expect(getAnimationCompleted(state)).toBe(true);
  });

  test('rentals and owned/sold properties selectors', () => {
    const state = makeState();
    expect(getRentals(state)).toHaveLength(2);
    expect(getActivelyOwnedProperties(state)).toHaveLength(2); // owned or has soldDate counts
    expect(getActivelyOwnedPropertiesCount(state)).toBe(2);
    expect(getOwnedOrSoldProperties(state)).toHaveLength(1); // only isOwned === true
    expect(getOwnedOrSoldPropertiesCount(state)).toBe(1);
  });

  test('dates, balances, and aggregates', () => {
    const state = makeState();
    expect(getStartAndEndDate(state)).toEqual([state.result.timeline.startDate, state.result.timeline.endDate]);
    expect(getEndDateBalanceForUser(state)).toBe(999);
    expect(getEstimatedCashFlow(state)).toBe(150);
    expect(getEquity(state)).toBe(1500);
  });

  test('user and goal', () => {
    const state = makeState();
    expect(getUser(state)).toBe(state.result.timeline.user);
    expect(getGoalMetForUser(state)).toBe(true);
  });

  test('ledger and completed validation', () => {
    const state = makeState();
    expect(getLedgerCollection(state)).toEqual({ items: [1, 2, 3] });
    expect(getCompletedValidation(state)).toBe(ValidatorTypes.Valid);
  });

  test('null timeline cases return fallbacks', () => {
    const state = makeState();
    state.result.timeline = null;
    expect(getRentals(state)).toEqual([]);
    expect(getActivelyOwnedProperties(state)).toEqual([]);
    expect(getActivelyOwnedPropertiesCount(state)).toBe(0);
    expect(getOwnedOrSoldProperties(state)).toEqual([]);
    expect(getOwnedOrSoldPropertiesCount(state)).toBe(0);
    expect(getEndDateBalanceForUser(state)).toBe(0);
    expect(getStartAndEndDate(state)).toEqual([null, null]);
    expect(getEstimatedCashFlow(state)).toBe(0);
    expect(getUser(state)).toBeUndefined();
    // getGoalMetForUser with [null, null] returns false
    expect(getGoalMetForUser(state)).toBe(false);
    expect(getEquity(state)).toBe(0);
    expect(getLedgerCollection(state)).toBeNull();
  });
});
