import { IEventResult } from './IEventResult';
import { ISelectOption } from '../core/ISelectOption';

export interface IPropertyDropDownParams {
  title: string;
  value?: IEventResult<ISelectOption>;
  onChange?: (inputData: IEventResult<ISelectOption>) => void;
}
