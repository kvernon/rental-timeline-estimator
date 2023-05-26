import { ValidatorTypes } from './components/validators/ValidatorTypes';
import { IRuleStackEntity } from './components/rules/IRuleStackEntity';

export interface IEntityDataValueResult<T> {
  value?: T;
  validationResult?: ValidatorTypes;
}

export class FormRuleStackEntityDataValueResult<T> implements IEntityDataValueResult<T>, IRuleStackEntity {
  ruleTitle: string;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  validationResult: ValidatorTypes;
  value?: T;

  constructor() {
    this.ruleTitle = '';
    this.validationResult = ValidatorTypes.Invalid;
  }
}

export interface IFormRuleStackEntityDataValueResult<T> {
  [k: string]: IEntityDataValueResult<T>;
}

export interface IFormRuleStackEntityDataValueResultEntity<T> {
  [k: string]: FormRuleStackEntityDataValueResult<T>;
}
