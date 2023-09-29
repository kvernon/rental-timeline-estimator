import { ValidatorTypes } from '../validators/ValidatorTypes';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IEventResult } from '../validators/IEventResult';

export const translateToValidationType = (validationType: ValidatorStackTypes): IEventResult<number> => {
  if (validationType === ValidatorStackTypes.Required) {
    return {
      validationResult: ValidatorTypes.Invalid,
      validationResultName: ValidatorTypes[ValidatorTypes.Invalid],
    };
  }

  return {
    validationResult: ValidatorTypes.Optional,
    validationResultName: ValidatorTypes[ValidatorTypes.Optional],
  };
};
