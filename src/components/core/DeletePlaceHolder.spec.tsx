import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DeleteButton } from './DeleteButton';
import React from 'react';

describe('DeletePlaceHolder unit tests', () => {
  beforeEach(() => {
    render(<DeleteButton />);
  });
  test('should generate with DeletePlaceholder', () => {
    const entity = screen.getByRole<HTMLDivElement>('delete-button');

    const expectedStyle = `
      transition: background 0.4s ease-out;
      width: 45px;
      background: rgb(82, 6, 6);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;`;

    expect(entity).toHaveStyle(expectedStyle);
  });

  test('should generate with TrashColored', () => {
    const entity = screen.getByRole<HTMLElement>('trash-can-icon', { hidden: true });

    const expectedStyle = `
      color: red;
      width: 50%;
      transform: scale(1, 1.25);
      box-shadow: 0 0 5px #2d0404;`;

    expect(entity).toHaveStyle(expectedStyle);
  });
});
