import { IIdentifier } from './IIdentifier';
import { IEventResult } from './IEventResult';

export type onChangeType = (evt: IEventResult<number>) => void;

export interface IRangeFieldValidatorChange extends IIdentifier {
  onChange?: onChangeType;
}
