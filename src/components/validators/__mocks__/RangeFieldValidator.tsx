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
      min={p.min}
      max={p.max}
      onChange={(e) => {
        if (p.onChange)
          p.onChange({
            value: parseInt(e.target.value),
            validationResult: ValidatorTypes.Valid,
          });
      }}
    />
  );
});
