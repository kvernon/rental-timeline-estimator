import React from 'react';

import { IRangeFieldValidatorProps } from '../../validators/IRangeFieldValidatorProps';
import { ValidatorTypes } from '../../validators/ValidatorTypes';

export const GoalPanel = jest.fn((p: IRangeFieldValidatorProps<true>) => {
  return (
    <input
      type="number"
      id={p.id}
      value={p.value?.value}
      name={p.title}
      aria-label={'Goal Panel'}
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
