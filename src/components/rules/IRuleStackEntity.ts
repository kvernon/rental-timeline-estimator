export interface IRuleStackEntity {
  ruleTitle: string;
  property: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  isDisabled?: boolean;
}
