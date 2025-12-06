import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PropertyTypeSpan } from './PropertyTypeSpan';

describe('PropertyTypeSpan styling', () => {
  it('applies nowrap, fixed width, and no border', () => {
    render(<PropertyTypeSpan role="Span-Test">text</PropertyTypeSpan>);

    const el = screen.getByRole<HTMLSpanElement>('Span-Test');

    const expectedStyle = `
      white-space: nowrap;
      width: 125px;
      border: none;
    `;

    expect(el).toHaveStyle(expectedStyle);
  });
});
