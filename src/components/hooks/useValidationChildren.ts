import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import React, { useMemo, useState } from 'react';
import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { translateFieldValidatorResult, useChildrenValueNames } from './useChildrenValueNames';
import { useChildrenPropsList } from './useChildrenPropsList';
import { useValid } from './useValid';
import { useWatcher } from './useWatcher';

const translateValues = (names: string[], valid: ValidatorTypes) => {
  return names.map((c) => {
    return {
      name: c,
      result: valid,
    };
  });
};

export const useValidationChildren = (
  panelValidatorStackType: ValidatorStackTypes = ValidatorStackTypes.Optional,
  children: React.ReactElement<IRangeFieldValidatorProps>[] | React.ReactElement<IRangeFieldValidatorProps> = [],
) => {
  const { isValid } = useValid(panelValidatorStackType);

  const { theChildrenProps } = useChildrenPropsList(children);

  const [childrenValidationResultNames] = useChildrenValueNames(theChildrenProps, translateFieldValidatorResult);

  const [isValidCollection, setIsCollectionValid] = useState<ValidatorTypes[]>([]);

  useMemo(() => {
    if (childrenValidationResultNames.length !== isValidCollection.length) {
      setIsCollectionValid(Array(childrenValidationResultNames.length).fill(isValid));
    }
  }, [childrenValidationResultNames, isValid, isValidCollection]);

  const [isAllValid, setIsAllValid] = useState<ValidatorTypes>(isValid);

  const [watcherResults] = useWatcher<ValidatorTypes>(childrenValidationResultNames);

  useMemo(() => {
    if (watcherResults.some((x) => x !== undefined)) {
      const newOne = [...isValidCollection]; //?
      watcherResults.forEach((value: ValidatorTypes, idx: number) => {
        if (value !== undefined) {
          newOne[idx] = value;
        }
      });

      if (isValidCollection.join(',') !== newOne.join(',')) {
        setIsCollectionValid(newOne);
      }
    }
  }, [watcherResults, isValidCollection]);

  const [finalResult, setFinalResult] = useState<
    {
      name: string;
      result: ValidatorTypes;
    }[]
  >([]);

  useMemo(() => {
    setIsAllValid(() => {
      if (isValidCollection.some((x) => x === ValidatorTypes.Invalid)) {
        return ValidatorTypes.Invalid;
      }

      if (isValidCollection.some((x) => x === ValidatorTypes.Valid)) {
        return ValidatorTypes.Valid;
      }

      return ValidatorTypes.Optional;
    });

    const r = translateValues(childrenValidationResultNames, isValid);
    isValidCollection.forEach((x, index) => {
      r[index].result = x;
    });

    if (JSON.stringify(r) !== JSON.stringify(finalResult)) {
      setFinalResult(r);
    }
  }, [finalResult, childrenValidationResultNames, isValidCollection, isValid]);

  return {
    isValidCollection: finalResult,
    isValid: isAllValid,
  };
};
