import { configure, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { DateCell, DateCellStyle } from './DateCell';
import { getDate } from '../../data/getDate';

jest.mock('../../data/getDate');

describe('DataCell unit tests', () => {
  beforeEach(() => {
    jest.mocked(getDate).mockReturnValue('date');
  });

  describe('and with defaults', () => {
    let container: HTMLElement;

    beforeEach(() => {
      configure({ testIdAttribute: 'id' });
      container = render(<DateCell />).container;
    });
    test('should render', () => {
      const entity = container.querySelector<HTMLSpanElement>('span');

      expect(entity).not.toBeNull();
    });
  });

  describe('and with value', () => {
    beforeEach(() => {
      render(<DateCell date={new Date()} />);
    });

    test('should render', () => {
      const entity = screen.getByText<HTMLSpanElement>('date');

      const expectedStyle = `
        white-space: nowrap;
        border: none;
        width: 100px;
        min-width: 100px;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});

describe('DataCellStyle unit tests', () => {
  describe('and with defaults', () => {
    beforeEach(() => {
      configure({ testIdAttribute: 'id' });
      render(<DateCellStyle id="style" />);
    });

    test('should render', () => {
      const entity = screen.getByTestId<HTMLSpanElement>('style');

      const expectedStyle = `
        white-space: nowrap;
        border: none;
        width: 100px;
        min-width: 100px;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});
