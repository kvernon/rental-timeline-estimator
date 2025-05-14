import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DragPlaceholder } from './DragPlaceHolder';
import React from 'react';

describe('DragPlaceHolder unit tests', () => {
  beforeEach(() => {
    render(<DragPlaceholder role={'drag-handle'} />);
  });

  test('should generate with DragPlaceHolder', () => {
    const entity = screen.getByRole<HTMLDivElement>('drag-handle');

    const expectedStyle = `
      transition: background 0.4s ease-out;
      width: 20px;
      background-color: rgb(56, 56, 56);
      opacity: 1;
      background-image: radial-gradient(ellipse farthest-corner at 4px 4px, #202030, #202030 50%, transparent 50%);
      background-size: 4px 4px;
      cursor: pointer;`;

    expect(entity).toHaveStyle(expectedStyle);
  });
});
