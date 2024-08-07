import type { ITitleDropDownParams } from '../TitleDropDownValidator';
import React from 'react';
import { ValidatorTypes } from '../ValidatorTypes';

export const TitleDropDownValidator = jest.fn((p: ITitleDropDownParams) => {
  function handleChange(event: { currentTarget: HTMLSelectElement }): void {
    const value = parseInt(event.currentTarget.value);

    if (p.onChange) {
      p.onChange({ value: { value, label: '' }, validationResult: ValidatorTypes.Valid });
    }
  }

  return (
    <select value={p.value?.value?.value} onChange={handleChange} aria-label={p.title}>
      {p.optionTitles.map((title, index) => (
        <option key={title} value={index}>
          {title}
        </option>
      ))}
    </select>
  );
});
