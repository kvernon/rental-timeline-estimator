import type { ITitleDropDownParams } from '../TitleDropDownValidator2';
import React from 'react';

export const TitleDropDownValidator2 = jest.fn((p: ITitleDropDownParams) => {
  function handleChange(event: { currentTarget: HTMLSelectElement }): void {
    const value = parseInt(event.currentTarget.value);
    const option = { label: p.titles[value], value };

    if (p.onChange) {
      p.onChange(option);
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
