import React from 'react';

import { IRangeFieldValidatorProps } from '../../validators/IRangeFieldValidatorProps';

export const GoalPanel = jest.fn((p: IRangeFieldValidatorProps) => {
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
            id: p.id,
            min: p.min,
            max: p.max,
            value: { value: parseInt(e.target.value) },
          });
      }}
    />
  );
});
