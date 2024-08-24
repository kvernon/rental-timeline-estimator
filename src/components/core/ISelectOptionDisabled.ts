import { ISelectOption } from './ISelectOption';

export interface ISelectOptionDisabled extends ISelectOption {
  isDisabled?: boolean;
}
