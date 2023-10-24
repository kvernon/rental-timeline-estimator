import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Input } from '../../../src/components/core/input';

describe('input unit tests', () => {
  describe('and defaults', () => {
    beforeEach(() => {
      render(<Input role="input" />);
    });

    test('should contain styles', () => {
      const entity = screen.getByRole<HTMLInputElement>('input');

      expect(entity).toMatchSnapshot();
    });
  });

  describe('and no spinner', () => {
    beforeEach(() => {
      render(<Input hasSpinner role="input" />);
    });

    test('should contain styles and spinner removal', () => {
      const entity = screen.getByRole<HTMLInputElement>('input');

      expect(entity).toMatchSnapshot();
    });
  });

  describe('and useUnderlineOnly', () => {
    beforeEach(() => {
      render(<Input useUnderlineOnly role="input" />);
    });

    test('should contain styles with no border and underline', () => {
      const entity = screen.getByRole<HTMLInputElement>('input');

      expect(entity).toMatchSnapshot();
    });
  });
});
