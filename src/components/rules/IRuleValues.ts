import { IEventValue } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';

export interface IRuleValues {
  title: IEventValue<ISelectOption>;
  property: IEventValue<ISelectOption>;
  range: IEventValue<number>;
}
