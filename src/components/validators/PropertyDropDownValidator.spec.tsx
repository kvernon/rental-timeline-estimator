import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PropertyDropDownValidator, propertyOptions } from './PropertyDropDownValidator';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import { ValidatorTypes } from './ValidatorTypes';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IPropertyDropDownParams } from './IPropertyDropDownParams';

describe('PropertyDropDownValidator unit test', () => {
  let params: IPropertyDropDownParams;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);

    params = {
      title: 'Tested',
      onChange: jest.fn(),
    };
  });

  describe('and defaults', () => {
    test('should render', () => {
      render(<PropertyDropDownValidator title={params.title} />);

      const actual = screen.getByLabelText<HTMLInputElement>(params.title);

      expect(actual).toBeInTheDocument();
    });

    test('should contain options with house selected', () => {
      render(<PropertyDropDownValidator title={params.title} />);

      const element = screen.getByLabelText<HTMLInputElement>(params.title);

      selectEvent.openMenu(element);

      const allByText = screen.getAllByRole<HTMLImageElement>('img');

      expect(
        allByText.map((x) => ({
          src: x.src,
          title: x.title,
          alt: x.alt,
        })),
      ).toEqual(
        ['house', 'apartment', 'house'].map((exp) => ({
          src: `http://localhost/images/${exp}.jpg`,
          title: exp,
          alt: exp,
        })),
      );
    });
  });

  describe('and value prop is updated', () => {
    test('should contain options with apartment selected', () => {
      params.value = {
        value: {
          value: 0,
          label: propertyOptions[0],
        },

        validationResult: ValidatorTypes.Valid,
      };

      render(<PropertyDropDownValidator title={params.title} value={params.value} />);

      const element = screen.getByLabelText<HTMLInputElement>(params.title);

      selectEvent.openMenu(element);

      const allByText = screen.getAllByRole<HTMLImageElement>('img');

      expect(
        allByText.map((x) => ({
          src: x.src,
          title: x.title,
          alt: x.alt,
        })),
      ).toEqual(
        ['apartment', 'apartment', 'house'].map((exp) => ({
          src: `http://localhost/images/${exp}.jpg`,
          title: exp,
          alt: exp,
        })),
      );
    });
  });

  describe('and value is selected', () => {
    test('onChange should be called', async () => {
      params.value = {
        value: {
          value: 1,
          label: propertyOptions[1],
        },

        validationResult: ValidatorTypes.Valid,
      };

      render(<PropertyDropDownValidator title={params.title} value={params.value} onChange={params.onChange} />);

      const element = screen.getByLabelText<HTMLInputElement>(params.title);

      selectEvent.openMenu(element);

      await selectEvent.select(element, (_content, element1): boolean => {
        return element1 instanceof HTMLImageElement && element1.alt === 'apartment';
      });

      expect(params.onChange).toHaveBeenCalledWith({
        validationResult: ValidatorTypes.Valid,
        value: {
          image: '/images/apartment.jpg',
          label: 'apartment',
          value: 0,
        },
      });
    });
  });
});
