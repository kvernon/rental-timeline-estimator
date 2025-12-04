import { HoldRuleTypes, PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IRuleConfig } from './IRuleConfig';
import { getPropertyIndex } from '../components/validators/PropertyOptions';

export const holdConfig: IRuleConfig = {
  panelTitle: 'Hold Rules',
  collection: [
    {
      propertyType: getPropertyIndex(PropertyType.SingleFamily),
      ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    { propertyType: getPropertyIndex(PropertyType.SingleFamily), ruleType: HoldRuleTypes.MinSellIfHighEquityPercent, min: 0, max: 100, suffix: '%' },
    { propertyType: getPropertyIndex(PropertyType.SingleFamily), ruleType: HoldRuleTypes.MinSellInYears, min: 1, max: 30, suffix: 'Year(s)' },
    { propertyType: getPropertyIndex(PropertyType.SingleFamily), ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent, min: 0, max: 100, suffix: '%' },
    { propertyType: getPropertyIndex(PropertyType.SingleFamily), ruleType: HoldRuleTypes.MinSellIfHighEquityPercent, min: 0, max: 100, suffix: '%' },
    {
      propertyType: getPropertyIndex(PropertyType.PassiveApartment),
      ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent,
      min: 0,
      max: 100,
      suffix: '%',
    },
    { propertyType: getPropertyIndex(PropertyType.PassiveApartment), ruleType: HoldRuleTypes.MinSellIfHighEquityPercent, min: 0, max: 100, suffix: '%' },
    { propertyType: getPropertyIndex(PropertyType.PassiveApartment), ruleType: HoldRuleTypes.MinSellInYears, min: 1, max: 30, suffix: 'Year(s)' },
    { propertyType: getPropertyIndex(PropertyType.PassiveApartment), ruleType: HoldRuleTypes.MinSellIfLowCashFlowPercent, min: 0, max: 100, suffix: '%' },
    { propertyType: getPropertyIndex(PropertyType.PassiveApartment), ruleType: HoldRuleTypes.MinSellIfHighEquityPercent, min: 0, max: 100, suffix: '%' },
  ],
};
