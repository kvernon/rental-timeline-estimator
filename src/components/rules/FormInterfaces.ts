import { IEntityDataValueResult } from '../../FormRuleStackEntityDataValueResult';
import { IOption } from '../validators/TitleDropDownValidator';

export interface IFieldType {
  titleDropDown: IEntityDataValueResult<IOption>;
  rangeFieldValidator: IEntityDataValueResult<number>;
}

export type IAry<Name extends string> = {
  [key in Name]: IFieldType[];
};
