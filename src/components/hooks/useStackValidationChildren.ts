import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import React, { useMemo, useState } from 'react';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { useChildrenValueNames } from './useChildrenValueNames';
import { useChildrenIdsList } from './useChildrenIdsList';
import { useValid } from './useValid';
import { useWatcher } from './useWatcher';
import { IIdentifier } from '../validators/IIdentifier';

const translateValues = (names: string[], valid: ValidatorTypes) => {
  return names.map((c) => {
    return {
      name: c,
      result: valid,
    };
  });
};

export const useStackValidationChildren = (
  panelValidatorStackType: ValidatorStackTypes = ValidatorStackTypes.Optional,
  children: React.ReactElement<IIdentifier>[] | React.ReactElement<IIdentifier> = [],
) => {
  const [theChildrenIds] = useChildrenIdsList(children);

  const [isValid] = useValid(panelValidatorStackType);

  const [childrenValidationResultNames] = useChildrenValueNames(theChildrenIds, 'validationResult');

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
      const newOne = [...isValidCollection];
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
