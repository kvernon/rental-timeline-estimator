import { HoldRuleTypes } from '@cubedelement.com/realty-investor-timeline';
import { IRuleConfig } from './IRuleConfig';

export const holdConfig: IRuleConfig = {
  panelTitle: 'Hold Rules',
  collection: [
    {
      ruleType: HoldRuleTypes.None,
      min: 0,
      max: 1,
    },
    {
      ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      ruleType: HoldRuleTypes.MinSellIfHighEquityPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      ruleType: HoldRuleTypes.MinSellInYears,
      min: 1,
      max: 30,
      suffix: 'Year(s)',
    },
    {
      ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      ruleType: HoldRuleTypes.MinSellIfHighEquityPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
  ],
};
