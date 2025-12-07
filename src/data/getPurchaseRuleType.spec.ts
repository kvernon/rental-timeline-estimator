import { getPurchaseRuleType } from './getPurchaseRuleType';
import { PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';

describe('getPurchaseRuleType', () => {
  test('returns None for empty or none', () => {
    expect(getPurchaseRuleType('')).toBe(PurchaseRuleTypes.None);
    expect(getPurchaseRuleType('none')).toBe(PurchaseRuleTypes.None);
    expect(getPurchaseRuleType('NoNe')).toBe(PurchaseRuleTypes.None);
  });

  test('converts spaced names to enum key by lowercasing first word and joining', () => {
    expect(getPurchaseRuleType('Buy Every Years')).toBe('buyEveryYears' as PurchaseRuleTypes);
    expect(getPurchaseRuleType('Buy When CashFlow')).toBe('buyWhenCashFlow' as PurchaseRuleTypes);
  });
});
