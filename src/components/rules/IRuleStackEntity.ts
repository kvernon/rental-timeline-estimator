export interface IRuleStackEntity {
  ruleTitle: string;
  property: 0 | 1;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  isDisabled?: boolean;
}
