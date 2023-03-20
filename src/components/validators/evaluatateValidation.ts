import { ValidatorTypes } from './ValidatorTypes';
import { IEventResult } from './IEventResult';
import { ValidatorStackTypes } from './ValidatorStackTypes';

/**
 *
 * @param selectedValue can also be NaN
 * @param validationType
 * @param rule
 */
export const evaluateValidation = (
  selectedValue: number,
  validationType: ValidatorStackTypes,
  rule: (value: number) => ValidatorTypes,
): IEventResult<number> => {
  const validation: IEventResult<number> = {
    validationResult: ValidatorTypes.Invalid,
    validationResultName: ValidatorTypes[ValidatorTypes.Invalid],
    value: selectedValue,
  };

  const isUndefinedOrNaN = selectedValue === undefined || isNaN(selectedValue);
  if (validationType === ValidatorStackTypes.Required) {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Invalid : rule(selectedValue);
  } else {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Optional : rule(selectedValue);
  }

  validation.validationResultName = ValidatorTypes[validation.validationResult];

  return validation;
};
