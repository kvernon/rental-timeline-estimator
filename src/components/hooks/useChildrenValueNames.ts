import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';
import { useEffect, useState } from 'react';
import { RangeFieldValidatorName } from '../naming/RangeFieldValidatorName';

export type NameTranslate = (value: IRangeFieldValidatorProps) => string;

export const translateFieldValidatorResult: NameTranslate = (entity: IRangeFieldValidatorProps) => {
  return `${RangeFieldValidatorName(entity.id)}.validationResult`;
};
export const translateRangeFieldValidatorValue: NameTranslate = (entity: IRangeFieldValidatorProps) => {
  return `${RangeFieldValidatorName(entity.id)}.value`;
};
export const useChildrenValueNames = (theChildrenProps: IRangeFieldValidatorProps[] = [], nameTranslate: NameTranslate = (x) => x.id): [string[]] => {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const newValues = theChildrenProps.map((x) => nameTranslate(x));
    if (names.join(',') !== newValues.join(',')) {
      // console.log('useChildrenValueNames::useEffect [theChildrenProps, names]');
      setNames(() => newValues);
    }
  }, [theChildrenProps, names]);

  return [names];
};
