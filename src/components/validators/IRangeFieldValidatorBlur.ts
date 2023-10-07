import { IIdentifier } from './IIdentifier';
import { IEventResult } from './IEventResult';

export interface IRangeFieldValidatorBlur extends IIdentifier {
  onBlur?: (evt: IEventResult<number>) => void;
}
