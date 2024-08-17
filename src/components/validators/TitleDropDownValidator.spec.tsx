import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { render, screen } from '@testing-library/react';
import { ITitleDropDownParams, TitleDropDownValidator } from './TitleDropDownValidator';
import React from 'react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import { ValidatorTypes } from './ValidatorTypes';
import { themeMock } from '../../../__tests__/ThemeMock';

describe('TitleDropDownValidator unit test', () => {
  let params: ITitleDropDownParams;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);

    params = {
      title: 'Title Drop',
      optionTitles: [],
      onChange: jest.fn(),
      value: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
    };
  });

  describe('and defaults', () => {
    test('should render', () => {
      render(<TitleDropDownValidator {...params} />);

      const actual = screen.getByLabelText<HTMLInputElement>(params.title);

      expect(actual).toBeInTheDocument();
    });

    describe('and options', () => {
      describe('and empty', () => {
        test('should have no options', () => {
          render(<TitleDropDownValidator {...params} />);

          const element = screen.getByLabelText<HTMLInputElement>(params.title);

          selectEvent.openMenu(element);

          const emptyNode = screen.getByText<HTMLDivElement>('No options');

          expect(emptyNode).toBeInTheDocument();
        });
      });

      describe('and populated', () => {
        test('should have no options', () => {
          params.optionTitles = ['one'];

          render(<TitleDropDownValidator {...params} />);

          const element = screen.getByLabelText<HTMLInputElement>(params.title);

          selectEvent.openMenu(element);

          const options = screen.getAllByRole<HTMLDivElement>('option');

          options.forEach((e, i) => {
            expect(e).toHaveTextContent(params.optionTitles[i]);
          });
        });
      });
    });
  });

  describe('and value prop is updated', () => {
    test('should receive updated entry', () => {
      params.optionTitles = ['one', 'two', 'three'];
      params.value = {
        value: {
          value: 1,
          label: params.optionTitles[1],
        },
        validationResult: ValidatorTypes.Valid,
      };

      render(<TitleDropDownValidator title={params.title} value={params.value} optionTitles={params.optionTitles} onChange={params.onChange} />);

      const element = screen.getByLabelText<HTMLInputElement>(params.title);

      expect(element.value).toEqual('');
    });

    describe('and onChange', () => {
      test('should not be called', async () => {
        params.optionTitles = ['one', 'two', 'three'];
        params.value = {
          value: {
            value: 1,
            label: params.optionTitles[1],
          },
          validationResult: ValidatorTypes.Valid,
        };

        render(<TitleDropDownValidator title={params.title} value={params.value} optionTitles={params.optionTitles} onChange={params.onChange} />);

        const element = screen.getByLabelText(params.title);

        await selectEvent.select(element, params.optionTitles[1]);

        expect(params.onChange).toHaveBeenCalledTimes(0);
      });

      test('should be called', async () => {
        params.optionTitles = ['one', 'two', 'three'];
        params.value = {
          value: {
            value: 1,
            label: params.optionTitles[1],
          },
          validationResult: ValidatorTypes.Valid,
        };

        render(<TitleDropDownValidator title={params.title} value={params.value} optionTitles={params.optionTitles} onChange={params.onChange} />);

        const element = screen.getByLabelText(params.title);

        await selectEvent.select(element, params.optionTitles[2]);

        expect(params.onChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
