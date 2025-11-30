import { IRuleValues } from '../IRuleValues';
import { IEventResult } from '../../validators/IEventResult';
import { ISelectOption } from '../../core/ISelectOption';
import { getValidationResult } from './getValidationResult';
import { ValidatorTypes } from '../../validators/ValidatorTypes';

export function useEnableButton(values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[]): boolean {
  if (values.length === 0) {
    return true;
  }

  return getValidationResult(values.map((x) => Object.values(x).map((x) => x.validationResult)).flat(), true) !== ValidatorTypes.Invalid;
}
