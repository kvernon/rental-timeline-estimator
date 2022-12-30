jest.mock('../../../src/components/validators/IsValid', () => ({
  IsValid: jest.fn().mockReturnValue({
    title: 'ouch',
    color: '1',
  }),
}));
import React from 'react';
import { configure, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidationBar } from '../../../src/components/validators/ValidationBar';
import { IsValid } from '../../../src/components/validators/IsValid';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';

describe('ValidationBar unit tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
  });

  beforeEach(() => {
    configure({ testIdAttribute: 'class' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('and Invalid supplied', () => {
    test('should show red', async () => {
      const expectedValidatorType = ValidatorTypes.Invalid;

      render(<ValidationBar isValid={expectedValidatorType} />);

      expect(screen.queryByTestId(/MuiBox-root/i)).toHaveStyle('background: ouch;');
      expect(IsValid).toHaveBeenCalledWith(expectedValidatorType);
    });
  });
});
