import { ValidatorTypes } from './ValidatorTypes';
import { IEventResult } from './IEventResult';
import { ValidatorStackTypes } from './ValidatorStackTypes';

export type RuleEval = (value: number, options: { min?: number; max?: number }) => ValidatorTypes;

/**
 *
 * @param validationType
 * @param rule
 * @param selectedValue can also be NaN
 * @param options
 */
export const evaluateValidation = (
  validationType: ValidatorStackTypes,
  rule: RuleEval,
  selectedValue?: number,
  options?: { min?: number; max?: number },
): IEventResult<number> => {
  const validation: IEventResult<number> = {
    validationResult: ValidatorTypes.Invalid,
    validationResultName: ValidatorTypes[ValidatorTypes.Invalid],
    value: selectedValue,
  };

  const isUndefinedOrNaN = selectedValue === undefined || isNaN(selectedValue);
  if (validationType === ValidatorStackTypes.Required) {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Invalid : rule(selectedValue, options || {});
  } else {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Optional : rule(selectedValue, options || {});
  }

  validation.validationResultName = ValidatorTypes[validation.validationResult];

  return validation;
};
