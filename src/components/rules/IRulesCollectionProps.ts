import { IRuleStackEntity } from './IRuleStackEntity';
import { IRuleValues } from './IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult, IEventValue } from '../validators/IEventResult';

export interface IRulesCollectionProps {
  required?: boolean;
  title: string;
  values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
  onChange?: (inputData: IRuleValues<IEventValue<ISelectOption>, IEventValue<number>>[]) => void;
  possibleChoices: IRuleStackEntity[];
}
