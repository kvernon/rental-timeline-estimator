import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OwnershipSpan } from './OwnershipSpan';

describe('OwnershipSpan styling', () => {
  it('applies nowrap, fixed width, and no border', () => {
    render(<OwnershipSpan role="Span-Test">text</OwnershipSpan>);

    const el = screen.getByRole<HTMLSpanElement>('Span-Test');

    const expectedStyle = `
      white-space: nowrap;
      width: 100px;
      border: none;
    `;

    expect(el).toHaveStyle(expectedStyle);
  });
});
