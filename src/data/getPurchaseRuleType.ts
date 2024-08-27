import { PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';

export function getPurchaseRuleType(ruleName: string): PurchaseRuleTypes {
  if (ruleName === '' || ruleName.toLowerCase() === 'none') {
    return PurchaseRuleTypes.None;
  }

  const a = ruleName.split(' ');
  a[0] = a[0].toLowerCase();

  return a.join('') as PurchaseRuleTypes;
}
