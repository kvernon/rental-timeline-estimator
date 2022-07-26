import { ValidatorTypes } from './ValidatorTypes';

export const IsValidGood = '#00ff00';
export const IsValidBad = '#ff0000';
export const IsValidOption = 'grey';

export const IsValid = (isValidProp: ValidatorTypes): { title: string; color: string } => {
  if (isValidProp === ValidatorTypes.Valid) {
    return { title: 'Valid', color: IsValidGood };
  }

  if (isValidProp === ValidatorTypes.Invalid) {
    return { title: 'Invalid', color: IsValidBad };
  }

  return { title: 'Optional', color: IsValidOption };
};
