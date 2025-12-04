export interface IRuleConfigEntity {
  ruleType: string;
  min?: number;
  max?: number;
  suffix?: string;
  prefix?: string;
}

export interface IRuleConfigWithPropertyType extends IRuleConfigEntity {
  propertyType: number;
}
