import { HoldRuleTypes, PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IRuleConfig } from './IRuleConfig';
import { getPropertyIndex } from '../components/validators/PropertyOptions';

export const holdConfig: IRuleConfig = {
  panelTitle: 'Hold Rules',
  collection: [
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent,
      description: 'Sell property if cash flow is below this percentage',
      min: 0,
      max: 100,
      suffix: '%',
      rule: 'HoldRuleTypes',
    },
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: HoldRuleTypes.MinSellIfHighEquityPercent,
      description: 'Sell property if equity is above this percentage',
      min: 0,
      max: 100,
      suffix: '%',
      rule: 'HoldRuleTypes',
    },
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: HoldRuleTypes.MinSellInYears,
      description: 'Sell property after this many years',
      min: 1,
      max: 30,
      suffix: 'Year(s)',
      rule: 'HoldRuleTypes',
    },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent,
      description: 'Sell property if cash flow is below this percentage',
      min: 0,
      max: 100,
      suffix: '%',
      rule: 'HoldRuleTypes',
    },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: HoldRuleTypes.MinSellIfHighEquityPercent,
      description: 'Sell property if equity is above this percentage',
      min: 0,
      max: 300,
      suffix: '%',
      rule: 'HoldRuleTypes',
    },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: HoldRuleTypes.MinSellInYears,
      description: 'Sell property after this many years',
      min: 1,
      max: 30,
      suffix: 'Year(s)',
      rule: 'HoldRuleTypes',
    },
  ],
};
