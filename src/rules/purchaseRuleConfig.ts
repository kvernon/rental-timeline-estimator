import { PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';
import { IRuleConfig } from './IRuleConfig';

export const purchaseConfig: IRuleConfig = {
  panelTitle: 'Purchase Rules',
  collection: [
    {
      ruleType: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      ruleType: PurchaseRuleTypes.MinEstimatedCashOnCashPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      ruleType: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
      min: 1000,
      max: 100000,
      prefix: '$',
    },
    {
      ruleType: PurchaseRuleTypes.MinAskingPrice,
      min: 0,
      max: 100000,
      prefix: '$',
    },
    {
      ruleType: PurchaseRuleTypes.MinAfterRepairPrice,
      min: 0,
      max: 100000,
      prefix: '$',
    },
  ],
};
