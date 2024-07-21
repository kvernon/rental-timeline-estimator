import { Theme, useTheme } from '@emotion/react';
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from './ValidatorTypes';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ITypography } from '../../theming/ITypography';
import { RangeFieldValidator } from './RangeFieldValidator';

jest.mock('../core/InputLabel');
jest.mock('../core/InputBox');
jest.mock('../core/FormControl');
jest.mock('../core/InputSpanPaddingLeft');
jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  const useTheme: jest.MockedFn<() => Theme> = jest.fn();
  return {
    ...requireActual,
    useTheme,
  };
});

describe('input-range unit tests', () => {
  const id = 'id-for-input';
  const title = 'the title';
  let typographyMock: jest.Mocked<ITypography>;

  const validationColorOptionalRight = '#0000FF';
  const validationColorValidMiddle = '#00FF00';
  const validationColorInvalidLeft = '#FF0000';

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    typographyMock = {
      parent: {
        allPopulated: jest.fn(),
        font: 'p',
        color: 'p',
        size: 'p',
      },
      get: jest.fn().mockReturnValue({
        font: 'child',
        color: 'child',
        size: 'child',
      }),
    };

    jest.mocked(useTheme).mockReturnValue({
      palette: {
        validation: {
          Invalid: {
            validationColor: validationColorInvalidLeft,
            background: validationColorInvalidLeft,
            backgroundFocus: validationColorInvalidLeft,
          },
          Valid: {
            validationColor: validationColorValidMiddle,
            background: validationColorValidMiddle,
            backgroundFocus: validationColorValidMiddle,
          },
          Optional: {
            validationColor: validationColorOptionalRight,
            background: validationColorOptionalRight,
            backgroundFocus: validationColorOptionalRight,
          },
        },
      },
      typography: typographyMock,
    } as unknown as IThemeOptions);
  });

  describe('and defaults', () => {
    test('should render', () => {
      render(<RangeFieldValidator id={id} title={title} />);

      const label = screen.queryByLabelText<HTMLLabelElement>('');
      const actual = screen.getByLabelText<HTMLInputElement>(title);

      expect(actual.readOnly).toEqual(false);
      expect(actual.required).toEqual(false);
      expect(actual.type).toEqual('number');
      expect(actual.min).toEqual('');
      expect(actual.max).toEqual('');
      expect(actual.value).toEqual('');

      expect(label).not.toBeInTheDocument();
    });
  });

  describe('and formatting', () => {
    test('and title with default of showTitle true', () => {
      render(<RangeFieldValidator id={id} title={title} />);

      const label = screen.queryByText<HTMLLabelElement>(title);

      expect(label).toBeInTheDocument();
    });

    test('and title with default of showTitle true', () => {
      render(<RangeFieldValidator id={id} title={title} showTitle={true} />);

      const label = screen.queryByText<HTMLLabelElement>(title);

      expect(label).toBeInTheDocument();
    });

    test('and title with default of showTitle false', () => {
      render(<RangeFieldValidator id={id} title={title} showTitle={false} />);

      const label = screen.queryByText<HTMLLabelElement>(title);

      expect(label).not.toBeInTheDocument();
    });

    test('and prefix', () => {
      const text = 'text';

      render(<RangeFieldValidator id={id} prefix={text} title={title} />);

      const span = screen.queryByText<HTMLSpanElement>(text);

      expect(span).toBeInTheDocument();
    });

    test('and suffix', () => {
      const text = 'text';

      render(<RangeFieldValidator id={id} suffix={text} title={title} />);

      const span = screen.queryByText<HTMLSpanElement>(text);

      expect(span).toBeInTheDocument();
    });
  });

  test('should render required', () => {
    render(<RangeFieldValidator id={id} required={true} title={title} />);

    const actual = screen.getByLabelText<HTMLInputElement>(title);

    expect(actual.required).toEqual(true);
  });

  test('should use min max', () => {
    const min = 10;
    const max = 20;
    render(<RangeFieldValidator id={id} min={min} max={max} title={title} />);

    const actual = screen.getByLabelText<HTMLInputElement>(title);

    expect(actual.min).toEqual(min.toString());
    expect(actual.max).toEqual(max.toString());
  });

  describe('and interaction', () => {
    test('should update value', () => {
      render(<RangeFieldValidator id={id} title={title} />);
      const actual = screen.getByLabelText<HTMLInputElement>(title);

      fireEvent.change(actual, { target: { value: '23' } });
      expect(actual.value).toBe('23');
    });

    test('should dispatch change', () => {
      const onChangeMock = jest.fn();
      render(
        <RangeFieldValidator
          id={id}
          onChange={onChangeMock}
          min={10}
          max={20}
          title={title}
          value={{ value: 30, validationResult: ValidatorTypes.Valid }}
          required={true}
        />,
      );
      const actual = screen.getByLabelText<HTMLInputElement>(title);

      fireEvent.change(actual, { target: { value: '23' } });

      expect(onChangeMock).toHaveBeenCalledWith({
        id,
        title,
        max: 20,
        min: 10,
        required: true,
        value: { value: 23, validationResult: ValidatorTypes.Valid },
      });
    });
  });
});
