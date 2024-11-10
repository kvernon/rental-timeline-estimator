import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputSpanPaddingLeft } from './InputSpanPaddingLeft';
import React from 'react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { FontGroups } from '../../theming/fontGroups';

describe('InputSpanPaddingLeft unit tests', () => {
  describe('and no title', () => {
    test('should generate with InputSpanPaddingLeft', () => {
      render(<InputSpanPaddingLeft themeOptions={themeMock} role="Span-Test" />);

      const entity = screen.getByRole<HTMLSpanElement>('Span-Test');

      const expectedStyle = `
      font-family: font;
      font-size: 10px;
      color: rgba(200, 0, 255, 0.247);
      margin: 0;
      padding: 7px;
      display: inline-flex;
    `;

      expect(entity).toHaveStyle(expectedStyle);
    });

    describe('and font group', () => {
      test('should generate with InputSpanPaddingLeft', () => {
        render(<InputSpanPaddingLeft themeOptions={themeMock} role="Span-Test" />);

        const entity = screen.getByRole<HTMLSpanElement>('Span-Test');

        const expectedStyle = `
      font-family: font;
      font-size: 10px;
      color: rgba(200, 0, 255, 0.247);
      margin: 0;
      padding: 7px;
      display: inline-flex;
    `;

        expect(entity).toHaveStyle(expectedStyle);
      });
    });
  });

  describe('and title', () => {
    test('should generate with InputSpanPaddingLeft', () => {
      render(<InputSpanPaddingLeft themeOptions={themeMock} role="Span-Test" title="A Title" fontGroup={FontGroups.inputLabel} />);

      const entity = screen.getByRole<HTMLSpanElement>('Span-Test');

      const expectedStyle = `
      font-family: font;
      font-size: 10px;
      color: rgba(200, 0, 255, 0.247);
      margin: 0;
      padding: 5.5px 7px;
      display: inline-flex;
    `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});
