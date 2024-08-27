import { IRuleStackEntity } from './IRuleStackEntity';
import { IRuleValues } from './IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult, IEventValue } from '../validators/IEventResult';

export interface IRulesCollectionProps {
  title: string;
  values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  onChange?: (inputData: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[]) => void;
  possibleChoices: IRuleStackEntity[];
}
