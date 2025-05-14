import { configure, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MoneyCell, MoneyCellStyle } from './MoneyCell';

describe('MoneyCell unit tests', () => {
  describe('and with defaults', () => {
    beforeEach(() => {
      render(<MoneyCell />);
    });
    test('should render', () => {
      const entity = screen.getByText<HTMLSpanElement>('$0.00');

      const expectedStyle = `
        white-space: nowrap;
        border: none;
        width: 96px;
        min-width: 96px;
        text-align: right;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });

  describe('and with value', () => {
    beforeEach(() => {
      render(<MoneyCell currency={99.9} />);
    });

    test('should render', () => {
      const entity = screen.getByText<HTMLSpanElement>('$99.90');

      const expectedStyle = `
        white-space: nowrap;
        border: none;
        width: 96px;
        min-width: 96px;
        text-align: right;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});

describe('MoneyCellStyle unit tests', () => {
  describe('and with defaults', () => {
    beforeEach(() => {
      configure({ testIdAttribute: 'id' });
      render(<MoneyCellStyle id="style" />);
    });

    test('should render', () => {
      const entity = screen.getByTestId<HTMLSpanElement>('style');

      const expectedStyle = `
        white-space: nowrap;
        border: none;
        width: 96px;
        min-width: 96px;
        text-align: right;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});
