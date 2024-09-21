import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { AddListButton } from './AddListButton';
import { themeMock } from '../../../__tests__/ThemeMock';

describe('AddListButton unit tests', () => {
  describe('and defaults', () => {
    beforeEach(() => {
      render(
        <AddListButton
          role={'button'}
          label={'Add'}
          theme={themeMock}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />,
      );
    });

    test('should generate with AddListButton', () => {
      const entity = screen.getByRole<HTMLButtonElement>('button');

      const expectedStyle = `
      align-items: flex-start;
      display: inline-block;
      transition: background-color 0.4s ease-out;
      height: 70px;
      width: 100%;
      font-family: font;
      background-color: ButtonFace;
      border-radius: 0.3rem;
      border-width: 0;
      border-bottom: 5px solid #021c26;
      box-shadow: 0 10px 1px #05465e;
      margin: 0;
      cursor: pointer;
      transition: background-color 0.4s ease-out;`;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });

  describe('and disabled', () => {
    beforeEach(() => {
      render(
        <AddListButton
          role={'button'}
          label={'Add'}
          theme={themeMock}
          isDisabled={true}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />,
      );
    });

    test('style should be gray', () => {
      const entity = screen.getByRole<HTMLButtonElement>('button');

      const expectedStyle = `
      align-items: flex-start;
      display: inline-block;
      transition: background-color 0.4s ease-out;
      height: 70px;
      width: 100%;
      font-family: font;
      background-color: rgba(255, 0, 0, 0.506);
      border-radius: 0.3rem;
      border-width: 0;
      border-bottom: 5px solid #021c26;
      box-shadow: 0 10px 1px #05465e;
      margin: 0;
      cursor: pointer;
      transition: background-color 0.4s ease-out;`;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});
