import { IRangeFieldValidatorProps } from '../IRangeFieldValidatorProps';
import React from 'react';
import { ValidatorTypes } from '../ValidatorTypes';

export const RangeFieldValidator = jest.fn((p: IRangeFieldValidatorProps) => {
  return (
    <input
      type="number"
      id={p.id}
      value={p.value?.value}
      name={p.title}
      aria-label={p.title}
      onChange={(e) => {
        if (p.onChange)
          p.onChange({
            id: p.id,
            min: p.min,
            max: p.max,
            value: { value: parseInt(e.target.value), validationResult: ValidatorTypes.Valid },
          });
      }}
    />
  );
});
