import React from 'react';
import { ValidatorTypes } from '../ValidatorTypes';

import { IPropertyDropDownParams } from '../IPropertyDropDownParams';

export const PropertyDropDownValidator = jest.fn((p: IPropertyDropDownParams) => {
  function handleChange(event: { currentTarget: HTMLSelectElement }): void {
    const value = parseInt(event.currentTarget.value);

    if (p.onChange) {
      p.onChange({ value: { value, label: '' }, validationResult: ValidatorTypes.Valid });
    }
  }

  return (
    <select value={p.value?.value?.value} onChange={handleChange} aria-label={p.title}>
      {[].map((title, index) => (
        <option key={title} value={index}>
          {title}
        </option>
      ))}
    </select>
  );
});