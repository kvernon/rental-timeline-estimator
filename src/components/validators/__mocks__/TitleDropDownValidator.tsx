import type { ITitleDropDownParams } from '../TitleDropDownValidator';
import React from 'react';

export const TitleDropDownValidator = jest.fn((p: ITitleDropDownParams) => {
  function handleChange(event: { currentTarget: HTMLSelectElement }): void {
    const value = parseInt(event.currentTarget.value);

    if (p.onChange) {
      p.onChange({ value: { value, label: p.optionTitles[value].title } });
    }
  }

  return (
    <select value={p.value?.value?.value} onChange={handleChange} aria-label={p.title}>
      {p.optionTitles.map((o, index) => (
        <option key={o.title} value={index} disabled={o.isDisabled || false}>
          {o.title}
        </option>
      ))}
    </select>
  );
});
