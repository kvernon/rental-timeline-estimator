import { ValidatorTypes } from './ValidatorTypes';
import { ValidatorStackTypes } from './ValidatorStackTypes';

export const ValidateResults = (validatorStackType: ValidatorStackTypes, children: ValidatorTypes[] = []): ValidatorTypes => {
  if (children.every((s) => s === undefined)) {
    return validatorStackType === ValidatorStackTypes.Optional ? ValidatorTypes.Optional : ValidatorTypes.Invalid;
  }

  if (children.some((s) => s === ValidatorTypes.Invalid)) {
    return ValidatorTypes.Invalid;
  }

  if (children.some((s) => s === ValidatorTypes.Valid)) {
    return ValidatorTypes.Valid;
  }

  if (validatorStackType === ValidatorStackTypes.Required) {
    return ValidatorTypes.Invalid;
  }
  return ValidatorTypes.Optional;
};
