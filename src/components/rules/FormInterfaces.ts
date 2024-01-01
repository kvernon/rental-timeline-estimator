import { IEntityDataValueResult } from '../../FormRuleStackEntityDataValueResult';
import { ITitleDropDownOption } from '../validators/TitleDropDownValidator';

export interface IFieldType {
  titleDropDown: IEntityDataValueResult<ITitleDropDownOption>;
  rangeFieldValidator: IEntityDataValueResult<number>;
}

export type IAry<Name extends string> = {
  [key in Name]: IFieldType[];
};
