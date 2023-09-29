import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { useEffect, useState } from 'react';
import { ValidatorTypes } from '../validators/ValidatorTypes';

const solve = (panelValidatorStackType: ValidatorStackTypes): ValidatorTypes => {
  if (panelValidatorStackType === ValidatorStackTypes.Optional) {
    return ValidatorTypes.Optional;
  } else {
    return ValidatorTypes.Invalid;
  }
};

export const useValid = (panelValidatorStackType: ValidatorStackTypes = ValidatorStackTypes.Optional) => {
  const [isValid, setIsValid] = useState<ValidatorTypes>(ValidatorTypes.Optional);

  useEffect(() => {
    const newEval = solve(panelValidatorStackType);

    if (newEval !== isValid) {
      // console.log('useValid::useEffect [panelValidatorStackType, isValid]');
      setIsValid(newEval);
    }
  }, [panelValidatorStackType, isValid]);

  return {
    isValid,
  };
};
