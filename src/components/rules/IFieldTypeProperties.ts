import { IEntityDataValueResult } from '../../FormRuleStackEntityDataValueResult';
import { ITitleDropDownOption } from '../validators/TitleDropDownValidator';

export const defaultFieldItem: IFieldTypeProperties = {
  propertyDropDown: {},
  titleDropDown: {},
  rangeFieldValidator: {},
};

export interface IFieldTypeProperties {
  propertyDropDown: IEntityDataValueResult<ITitleDropDownOption>;
  titleDropDown: IEntityDataValueResult<ITitleDropDownOption>;
  rangeFieldValidator: IEntityDataValueResult<number>;
}
