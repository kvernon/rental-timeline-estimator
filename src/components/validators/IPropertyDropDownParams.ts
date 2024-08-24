import { IEventResult, IEventValue } from './IEventResult';
import { ISelectOption } from '../core/ISelectOption';

export interface IPropertyDropDownParams {
  title: string;
  value: IEventResult<ISelectOption>;
  onChange?: (inputData: IEventValue<ISelectOption>) => void;
}
