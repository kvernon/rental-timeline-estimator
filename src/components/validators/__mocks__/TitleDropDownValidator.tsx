import type { ITitleDropDownParams } from '../TitleDropDownValidator';
import React from 'react';
import { ValidatorTypes } from '../ValidatorTypes';

export const TitleDropDownValidator = jest.fn((p: ITitleDropDownParams) => {
  function handleChange(event: { currentTarget: HTMLSelectElement }): void {
    const value = parseInt(event.currentTarget.value);
    const option = { label: p.titles[value], value };

    if (p.onChange) {
      p.onChange({ ...option, validationResult: ValidatorTypes.Valid });
    }
  }

  return (
    <select id={`titleDropDownValidator${p.id}`} value={p.defaultIndex} onChange={handleChange}>
      {p.titles.map((title, index) => (
        <option key={title} value={index}>
          {title}
        </option>
      ))}
    </select>
  );
});
