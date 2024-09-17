import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '@emotion/react';
import { RuleStack } from './RuleStack';
import { TitleDropDownValidator } from '../validators/TitleDropDownValidator';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { IRuleStackProps } from './IRuleStackProps';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { PropertyDropDownValidator } from '../validators/PropertyDropDownValidator';
import { DeleteButton } from '../core/DeleteButton';
import { getValidationResult } from './getValidationResult';

jest.mock('../rules/getValidationResult');
jest.mock('../validators/TitleDropDownValidator');
jest.mock('../validators/RangeFieldValidator');
jest.mock('../validators/PropertyDropDownValidator');
jest.mock('../core/DragPlaceHolder', () => {
  return {
    DragPlaceholder: jest.fn().mockReturnValue(<div>DragPlaceholder</div>),
  };
});
jest.mock('../core/DeleteButton');
jest.mock('../validators/ValidationBar', () => {
  return {
    ValidationBar: jest.fn((props) => <div>ValidationBar ${props?.isValid}</div>),
  };
});

function getRuleName(index: number) {
  return `Rule Number ${index}`;
}

describe('RuleStack unit tests', () => {
  beforeEach(() => {
    jest.mocked(getValidationResult).mockReturnValue(ValidatorTypes.Optional);
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let props: IRuleStackProps;

    beforeEach(() => {
      props = {
        index: 0,
        ruleStackValues: [
          { ruleTitle: 'title', property: 0 },
          { ruleTitle: 'nothing', property: 1 },
        ],
        value: {
          title: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Optional },
          property: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Optional },
          range: { value: undefined, validationResult: ValidatorTypes.Optional },
        },
      };
      render(<RuleStack {...props} />);
    });

    test('should generate with StackBase', () => {
      const entity = screen.getByLabelText<HTMLDivElement>(getRuleName(props.index));

      expect(entity).toHaveStyle('background-color: #4f41b9');
      expect(entity).toHaveStyle('padding-left:0');
    });

    test('should generate with DragPlaceHolder', () => {
      const entity = screen.getByText<HTMLDivElement>(/DragPlaceholder/);

      expect(entity).toBeInTheDocument();
    });

    test('should generate with ValidationBar', () => {
      const entity = screen.getByText<HTMLDivElement>(/ValidationBar/);

      expect(jest.mocked(getValidationResult)).toHaveBeenCalledWith(
        [ValidatorTypes.Optional, ValidatorTypes.Optional, ValidatorTypes.Optional],
        false,
      );

      expect(entity).toHaveTextContent(ValidatorTypes.Optional.toString());
    });

    test('should generate with TitleDropDownValidator', () => {
      const entity = screen.getByLabelText<HTMLDivElement>(getRuleName(props.index));

      expect(entity).toBeInTheDocument();
      expect(TitleDropDownValidator).toHaveBeenCalledWith(
        {
          title: 'Rule Title',
          value: props.value.title,
          onChange: expect.any(Function),
          optionTitles: props.ruleStackValues.map((x) => ({
            title: x.ruleTitle,
            isDisabled: x.isDisabled,
          })),
        },
        {},
      );
    });

    test('should generate PropertyDropDown', () => {
      const entity = screen.getByLabelText<HTMLElement>(/Property Picker/);

      expect(entity).toBeInTheDocument();
    });

    test('should generate with RangeFieldValidator', () => {
      const entity = screen.getByLabelText<HTMLElement>(/Rule Range/);

      expect(entity).toBeInTheDocument();
      expect(RangeFieldValidator).toHaveBeenCalledWith(
        {
          min: undefined,
          max: undefined,
          prefix: undefined,
          suffix: undefined,
          id: 'rule-range',
          title: 'Rule Range',
          showTitle: false,
          useUnderlineOnly: false,
          onChange: expect.any(Function),
        },
        {},
      );
    });

    test('should generate with DeleteButton', () => {
      const entity = screen.getByRole<HTMLDivElement>('delete-button');

      expect(entity).toBeInTheDocument();
    });
  });

  describe('and value supplied', () => {
    let props: IRuleStackProps;

    beforeEach(() => {
      props = {
        index: 0,
        required: true,
        ruleStackValues: [
          {
            min: 3,
            prefix: 'prefix-one',
            ruleTitle: 'rule-title-one',
            property: 1,
            max: 7,
            suffix: 'suffix-one',
          },
          {
            min: 8,
            prefix: 'prefix-two',
            ruleTitle: 'rule-title-two',
            property: 1,
            max: 20,
            suffix: 'suffix-two',
          },
        ],
        value: {
          property: { value: { value: 0, label: 'property' }, validationResult: ValidatorTypes.Valid },
          range: { value: 1, validationResult: ValidatorTypes.Valid },
          title: { value: { value: 1, label: 'nothing' }, validationResult: ValidatorTypes.Invalid },
        },
      };
      render(<RuleStack {...props} />);
    });

    test('should generate with ValidationBar', () => {
      const entity = screen.getByText<HTMLDivElement>(/ValidationBar/);

      expect(jest.mocked(getValidationResult)).toHaveBeenCalledWith(
        [ValidatorTypes.Valid, ValidatorTypes.Valid, ValidatorTypes.Invalid],
        props.required,
      );

      expect(entity).toHaveTextContent(ValidatorTypes.Optional.toString());
    });

    test('should generate with TitleDropDownValidator', () => {
      const entity = screen.getByLabelText<HTMLDivElement>(getRuleName(props.index));

      expect(entity).toBeInTheDocument();
      expect(TitleDropDownValidator).toHaveBeenCalledWith(
        {
          title: 'Rule Title',
          value: props.value.title,
          optionTitles: props.ruleStackValues.map((x) => ({
            title: x.ruleTitle,
            isDisabled: x.isDisabled,
          })),
          onChange: expect.any(Function),
        },
        {},
      );
    });

    test('should generate PropertyDropDown', () => {
      const entity = screen.getByLabelText<HTMLElement>(/Property Picker/);

      expect(entity).toBeInTheDocument();
      expect(PropertyDropDownValidator).toHaveBeenCalledWith(
        {
          className: expect.any(String),
          title: 'Property Picker',
          value: props.value.property,
          onChange: expect.any(Function),
        },
        {},
      );
    });

    test('should generate with RangeFieldValidator', () => {
      const entity = screen.getByLabelText<HTMLElement>(/Rule Range/);

      expect(entity).toBeInTheDocument();
      expect(RangeFieldValidator<false>).toHaveBeenCalledWith(
        {
          min: props.ruleStackValues[1].min,
          max: props.ruleStackValues[1].max,
          prefix: props.ruleStackValues[1].prefix,
          suffix: props.ruleStackValues[1].suffix,
          onChange: expect.any(Function),
          id: 'rule-range',
          title: 'Rule Range',
          showTitle: false,
          useUnderlineOnly: false,
        },
        {},
      );
    });
  });

  describe('and using component', () => {
    const removeClickMock: jest.MockedFn<(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void> = jest.fn();
    let props: IRuleStackProps;

    beforeEach(() => {
      props = {
        index: 0,
        value: {
          property: { value: { value: 0, label: 'property' }, validationResult: ValidatorTypes.Valid },
          range: { value: 1, validationResult: ValidatorTypes.Valid },
          title: { value: { value: 1, label: 'nothing' }, validationResult: ValidatorTypes.Invalid },
        },
        ruleStackValues: [
          {
            min: 3,
            prefix: 'prefix-one',
            ruleTitle: 'rule-title-one',
            property: 1,
            max: 7,
            suffix: 'suffix-one',
          },
          {
            min: 8,
            prefix: 'prefix-two',
            ruleTitle: 'rule-title-two',
            property: 1,
            max: 20,
            suffix: 'suffix-two',
          },
        ],
        required: true,
        removeClick: removeClickMock,
        onUpdate: jest.fn(),
      };

      render(<RuleStack {...props} />);
    });

    describe('and press delete', () => {
      test('should call removeClick', () => {
        const deleteButton = screen.getByRole<HTMLDivElement>('delete-button');
        expect(deleteButton.innerHTML).toEqual('This is the delete button');

        expect(jest.mocked(DeleteButton)).toHaveBeenCalledWith(
          {
            onClick: expect.any(Function),
          },
          {},
        );

        fireEvent.click(deleteButton);

        expect(removeClickMock).toHaveBeenCalled();
      });
    });

    describe('and title change', () => {
      test('and should update range validator', async () => {
        expect(TitleDropDownValidator).toHaveBeenCalledWith(
          {
            title: 'Rule Title',
            value: props.value.title,
            optionTitles: props.ruleStackValues.map((x) => ({
              title: x.ruleTitle,
              isDisabled: x.isDisabled,
            })),
            onChange: expect.any(Function),
          },
          {},
        );

        expect(RangeFieldValidator<false>).toHaveBeenCalledWith(
          {
            min: props.ruleStackValues[1].min,
            max: props.ruleStackValues[1].max,
            prefix: props.ruleStackValues[1].prefix,
            suffix: props.ruleStackValues[1].suffix,
            onChange: expect.any(Function),
            id: 'rule-range',
            title: 'Rule Range',
            showTitle: false,
            useUnderlineOnly: false,
          },
          {},
        );

        const entity = screen.getByLabelText<HTMLSelectElement>(`Rule Title`);

        const value = 0;

        fireEvent.change(entity, {
          target: { value },
        });

        expect(props.onUpdate).toHaveBeenCalledTimes(1);
        expect(props.onUpdate).toHaveBeenNthCalledWith(1, {
          property: { value: props.value.property.value },
          range: { value: props.value.range.value },
          title: {
            value: { value, label: props.ruleStackValues.map((x) => x.ruleTitle)[value] },
          },
        });
      });
    });

    describe('and property change', () => {
      test('and should update range validator', async () => {
        expect(PropertyDropDownValidator).toHaveBeenCalledWith(
          {
            className: expect.any(String),
            title: 'Property Picker',
            value: props.value.property,
            onChange: expect.any(Function),
          },
          {},
        );

        const entity = screen.getByLabelText<HTMLSelectElement>(`Property Picker`);

        const value = 0;

        fireEvent.change(entity, {
          target: { value },
        });

        expect(props.onUpdate).toHaveBeenCalledTimes(1);
        expect(props.onUpdate).toHaveBeenNthCalledWith(1, {
          title: { value: props.value.title.value },
          range: { value: props.value.range.value },
          property: {
            value: { value, label: 'apartment' },
          },
        });
      });
    });

    describe('and range change', () => {
      test('and should update range validator', async () => {
        expect(RangeFieldValidator).toHaveBeenCalledWith(
          {
            min: props.ruleStackValues[1].min,
            max: props.ruleStackValues[1].max,
            prefix: props.ruleStackValues[1].prefix,
            suffix: props.ruleStackValues[1].suffix,
            onChange: expect.any(Function),
            id: 'rule-range',
            title: 'Rule Range',
            showTitle: false,
            useUnderlineOnly: false,
          },
          {},
        );

        const entity = screen.getByLabelText<HTMLInputElement>(`Rule Range`);

        const value = 55;

        fireEvent.change(entity, {
          target: { value },
        });

        expect(props.onUpdate).toHaveBeenCalledTimes(1);
        expect(props.onUpdate).toHaveBeenNthCalledWith(1, {
          title: { value: props.value.title.value },
          property: { value: props.value.property.value },
          range: {
            value,
          },
        });
      });
    });
  });
});
