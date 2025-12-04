import { ValidatorTypes } from '../../validators/ValidatorTypes';

export const getValidationResult = (validations: ValidatorTypes[], isRequired: boolean): ValidatorTypes => {
  if (!validations || validations.length === 0) {
    return isRequired ? ValidatorTypes.Invalid : ValidatorTypes.Optional;
  }

  if (validations.some((x) => x === ValidatorTypes.Invalid || (x === ValidatorTypes.Optional && isRequired))) {
    return ValidatorTypes.Invalid;
  }

  if (validations.every((x) => x === ValidatorTypes.Optional)) {
    return ValidatorTypes.Optional;
  }

  return ValidatorTypes.Valid;
};
