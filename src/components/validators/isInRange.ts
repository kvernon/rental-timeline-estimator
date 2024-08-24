import { RuleEval } from './evaluateValidation';
import { ValidatorTypes } from './ValidatorTypes';

export const isInRange: RuleEval = (
  value: number,
  options: {
    min?: number;
    max?: number;
  },
): ValidatorTypes => {
  return (options?.min || 0) <= value && (options?.max || 100) >= value ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
};
