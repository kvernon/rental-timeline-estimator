import React from 'react';
import { IPropertyDropDownParams } from '../IPropertyDropDownParams';

const properties = ['apartment', 'house'];

export const PropertyDropDownValidator = jest.fn((p: IPropertyDropDownParams) => {
  function handleChange(event: { currentTarget: HTMLSelectElement }): void {
    const value = parseInt(event.currentTarget.value);

    if (p.onChange) {
      p.onChange({ value: { value, label: properties[value] } });
    }
  }

  return (
    <select value={p.value?.value?.value} onChange={handleChange} aria-label={p.title}>
      {properties.map((title, index) => (
        <option key={title} value={index}>
          {title}
        </option>
      ))}
    </select>
  );
});
