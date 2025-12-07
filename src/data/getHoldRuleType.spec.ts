import { getHoldRuleType } from './getHoldRuleType';
import { HoldRuleTypes } from '@cubedelement.com/realty-investor-timeline';

describe('getHoldRuleType', () => {
  test('returns None for empty or none', () => {
    expect(getHoldRuleType('')).toBe(HoldRuleTypes.None);
    expect(getHoldRuleType('none')).toBe(HoldRuleTypes.None);
    expect(getHoldRuleType('NoNe')).toBe(HoldRuleTypes.None);
  });

  test('converts spaced names to enum key by lowercasing first word and joining', () => {
    expect(getHoldRuleType('Sell In Years')).toBe('sellInYears' as HoldRuleTypes);
    expect(getHoldRuleType('Hold Until Goal')).toBe('holdUntilGoal' as HoldRuleTypes);
  });
});
