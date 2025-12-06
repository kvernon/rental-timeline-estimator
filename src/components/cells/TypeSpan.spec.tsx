import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TypeSpan } from './TypeSpan';

describe('TypeSpan styling', () => {
  it('applies nowrap, fixed width, and no border', () => {
    render(<TypeSpan role="Span-Test">text</TypeSpan>);

    const el = screen.getByRole<HTMLSpanElement>('Span-Test');

    const expectedStyle = `
      white-space: nowrap;
      width: 95px;
      border: none;
    `;

    expect(el).toHaveStyle(expectedStyle);
  });
});
