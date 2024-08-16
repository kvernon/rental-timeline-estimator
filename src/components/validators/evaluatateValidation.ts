import { ValidatorTypes } from './ValidatorTypes';
import { IEventResult } from './IEventResult';

export type RuleEval = (value: number, options: { min?: number; max?: number }) => ValidatorTypes;

/**
 *
 * @param isRequired
 * @param rule
 * @param selectedValue can also be NaN
 * @param options
 */
export const evaluateValidation = (
  isRequired: boolean,
  rule: RuleEval,
  selectedValue?: number,
  options?: { min?: number; max?: number },
): IEventResult<number> => {
  const validation: IEventResult<number> = {
    validationResult: ValidatorTypes.Invalid,
    value: selectedValue,
  };

  const isUndefinedOrNaN = selectedValue === undefined || isNaN(selectedValue);
  if (isRequired) {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Invalid : rule(selectedValue, options || {});
  } else {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Optional : rule(selectedValue, options || {});
  }

  return validation;
};
