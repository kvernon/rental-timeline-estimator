import React from 'react';
import { App } from '../src/app';
import { configure, render, screen } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import '@testing-library/jest-dom';

jest.mock('../src/components/validators/TitleDropDownValidator');

expect.extend(matchers);

describe('App unit tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
    configure({ testIdAttribute: 'id' });
  });

  describe('and App', () => {
    describe('and success', () => {
      test('should create', () => {
        render(<App />);
        expect(screen.getByTestId('validatorStackmonthToMonthGoal', {})).toBeInTheDocument();
        expect(screen.getByTitle('Amount Saved at Start', {})).toBeInTheDocument();
        expect(screen.getByTitle('Amount Saved Per Month', {})).toBeInTheDocument();
      });
    });
  });
});
