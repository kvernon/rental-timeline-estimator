import { IEntityDataValueResult } from '../../FormRuleStackEntityDataValueResult';
import { ITitleDropDownOption } from '../validators/TitleDropDownValidator';

export interface IFieldType {
  propertyDropDown: IEntityDataValueResult<ITitleDropDownOption>;
  titleDropDown: IEntityDataValueResult<ITitleDropDownOption>;
  rangeFieldValidator: IEntityDataValueResult<number>;
}
