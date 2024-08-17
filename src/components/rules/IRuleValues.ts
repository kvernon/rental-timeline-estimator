import { IEventValue } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';

export interface IRuleValues<TEventDrop extends IEventValue<ISelectOption>, TEventNumber extends IEventValue<number | undefined>> {
  title: TEventDrop;
  property: TEventDrop;
  range: TEventNumber;
}
