import React from 'react';
import { App } from '../src/app';
import { render, screen } from '@testing-library/react';
import { matchers } from '@emotion/jest';

jest.mock('../src/components/validators/TitleDropDownValidator');

expect.extend(matchers);

describe('App unit tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
  });

  describe('and App', () => {
    describe('and success', () => {
      test('should create', async () => {
        render(<App />);
        expect(screen.getByText('Hi', {})).toBeInTheDocument();
      });
    });
  });
});
