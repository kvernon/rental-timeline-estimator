import { PropertyType, PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';
import { IRuleConfig } from './IRuleConfig';
import { getPropertyIndex } from '../components/validators/PropertyOptions';

export const purchaseConfig: IRuleConfig = {
  panelTitle: 'Purchase Rules',
  collection: [
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: PurchaseRuleTypes.MinEstimatedAnnualCashFlow,
      min: 0,
      max: 7200,
      prefix: '$',
    },
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: PurchaseRuleTypes.MinEstimatedCashOnCashPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
      min: 1000,
      max: 100000,
      prefix: '$',
    },
    { propertyType: getPropertyIndex(PropertyType.SingleFamily), ruleType: PurchaseRuleTypes.MinAskingPrice, min: 0, max: 100000, prefix: '$' },
    { propertyType: getPropertyIndex(PropertyType.SingleFamily), ruleType: PurchaseRuleTypes.MinAfterRepairPrice, min: 0, max: 100000, prefix: '$' },

    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: PurchaseRuleTypes.MinEstimatedAnnualCashFlow,
      min: 0,
      max: 10000,
      prefix: '$',
    },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: PurchaseRuleTypes.MinEstimatedCashOnCashPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
      min: 1000,
      max: 100000,
      prefix: '$',
    },
    { propertyType: getPropertyIndex(PropertyType.PassiveApartment), ruleType: PurchaseRuleTypes.MinAskingPrice, min: 0, max: 400000, prefix: '$' },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: PurchaseRuleTypes.MinAfterRepairPrice,
      min: 0,
      max: 200000000,
      prefix: '$',
    },
  ],
};
