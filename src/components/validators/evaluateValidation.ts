import { ValidatorTypes } from './ValidatorTypes';
import { IEventResult } from './IEventResult';
import { ConditionalNumber } from './IRangeFieldValidatorEvent';

export type RuleEval = (value: number, options: { min?: number; max?: number }) => ValidatorTypes;

/**
 *
 * @param rule
 * @param selectedValue can also be NaN
 * @param options
 */
export const evaluateValidation = <Required extends boolean = false>(
  selectedValue: ConditionalNumber<Required>,
  rule: RuleEval,
  options?: { min?: number; max?: number; isRequired?: Required },
): IEventResult<ConditionalNumber<Required>> => {
  const validation: IEventResult<ConditionalNumber<Required>> = {
    validationResult: ValidatorTypes.Invalid,
    value: selectedValue,
  };

  const isUndefinedOrNaN = selectedValue === undefined || isNaN(selectedValue);
  if (options && options?.isRequired) {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Invalid : rule(selectedValue, options || {});
  } else {
    validation.validationResult = isUndefinedOrNaN ? ValidatorTypes.Optional : rule(selectedValue, options || {});
  }

  return validation;
};
