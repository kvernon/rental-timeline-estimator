import { ValidatorStackTypes } from './ValidatorStackTypes';
import { ValidatorTypes } from './ValidatorTypes';

export const toValidatorType = (stackType: ValidatorStackTypes): ValidatorTypes => {
  if (stackType === ValidatorStackTypes.Optional) {
    return ValidatorTypes.Optional;
  }

  return ValidatorTypes.Invalid;
};
