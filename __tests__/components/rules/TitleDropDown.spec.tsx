import { IThemeOptions } from '../../../src/theme';
import React from 'react';
import { configure, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ITitleDropDownParams, TitleDropDownValidator } from '../../../src/components/validators/TitleDropDownValidator';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import { FormProvider, useForm } from 'react-hook-form';

jest.mock('@emotion/react', () => {
  const all = jest.requireActual('@emotion/react');
  return {
    ...all,
    useTheme: jest.fn().mockReturnValue({
      palette: {
        validation: {
          Invalid: {
            validationColor: '0',
            background: '0',
          },
          Valid: {
            validationColor: '1',
            background: '1',
          },
          Optional: {
            validationColor: '2',
            background: '2',
          },
        },
      },
      typography: {
        get: jest.fn(),
      },
    } as unknown as IThemeOptions),
  };
});

const TitleDropDownValidatorSetup = (props: ITitleDropDownParams) => {
  const methods = useForm({});
  methods.getValues = jest.fn().mockReturnValue({});
  return (
    <FormProvider {...methods}>
      <TitleDropDownValidator {...props} />
    </FormProvider>
  );
};

describe('TitleDropDown unit tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn().mockReturnValue('3') },
    });
  });

  beforeEach(() => {
    configure({ testIdAttribute: 'name' });
  });

  describe('and titles supplied', () => {
    test('should have title', async () => {
      const title = 'Hi';

      render(<TitleDropDownValidatorSetup titles={[title]} validationType={ValidatorStackTypes.Required} />);

      const actual = screen.getByTestId(`titleDropDown${3}.value`);
      expect(actual).toBeInTheDocument();
    });
  });

  describe('and no titles supplied', () => {
    test('should have title', async () => {
      render(<TitleDropDownValidatorSetup titles={[]} validationType={ValidatorStackTypes.Optional} />);

      expect(screen.getByTestId(`titleDropDown${3}.value`)).toBeInTheDocument();
    });
  });
});
