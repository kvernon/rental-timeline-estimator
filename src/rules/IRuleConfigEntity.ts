export interface IRuleConfigEntity {
  ruleType: string;
  description?: string;
  min?: number;
  max?: number;
  suffix?: string;
  prefix?: string;
}

export interface IRuleConfigWithPropertyType extends IRuleConfigEntity {
  propertyType: number;
  rule: 'PurchaseRuleTypes' | 'HoldRuleTypes';
}
