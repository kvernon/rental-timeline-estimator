import { useEffect, useState } from 'react';
import { translateClassToNameWithProperty } from '../nameTranslates/translateClassToNameWithProperty';
import { IIdentifierType } from '../validators/IIdentifierType';

export const useChildrenValueNames = (
  theChildrenProps: IIdentifierType[] = [],
  property: 'value' | 'validationResult' = 'validationResult',
): [string[]] => {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const newValues = theChildrenProps.map((x) => translateClassToNameWithProperty(x, property));
    if (names.join(',') !== newValues.join(',')) {
      setNames(() => newValues);
    }
  }, [theChildrenProps, names, property]);

  return [names];
};
