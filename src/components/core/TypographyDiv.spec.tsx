import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { TypographyDiv } from './TypographyDiv';

describe('TypographyDiv unit tests', () => {
  beforeEach(() => {
    render(<TypographyDiv role="title" />);
  });

  test('should generate with DragPlaceHolder', () => {
    const entity = screen.getByRole<HTMLDivElement>('title');

    const expectedStyle = `
      position: relative;
      top: 6px;
    `;

    expect(entity).toHaveStyle(expectedStyle);
  });
});
