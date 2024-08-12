import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { IRuleValues } from './IRuleValues';

export interface IRuleValuesResult extends IRuleValues {
  title: IEventResult<ISelectOption>;
  property: IEventResult<ISelectOption>;
  range: IEventResult<number>;
}
