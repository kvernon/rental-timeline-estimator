import { HoldRuleTypes } from '@cubedelement.com/realty-investor-timeline';

export function getHoldRuleType(ruleName: string): HoldRuleTypes {
  if (ruleName === '' || ruleName.toLowerCase() === 'none') {
    return HoldRuleTypes.None;
  }

  const a = ruleName.split(' ');
  a[0] = a[0].toLowerCase();

  return a.join('') as HoldRuleTypes;
}
