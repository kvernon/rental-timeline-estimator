export interface IRuleStackEntity {
  ruleTitle: string;
  description?: string;
  property: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  isDisabled?: boolean;
  rule: 'PurchaseRuleTypes' | 'HoldRuleTypes';
}
