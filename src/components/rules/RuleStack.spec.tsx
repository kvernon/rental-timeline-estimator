import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
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

describe('RuleStack unit tests', () => {
  beforeEach(() => {
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
        ruleStackValues: [{ ruleTitle: 'title' }, { ruleTitle: 'nothing' }],
        value: {
          title: { value: undefined, validationResult: ValidatorTypes.Optional },
          property: { value: undefined, validationResult: ValidatorTypes.Optional },
          range: { value: undefined, validationResult: ValidatorTypes.Optional },
        },
      };
      render(<RuleStack {...props} />);
    });

    test('should generate with StackBase', () => {
      const entity = screen.getByLabelText<HTMLDivElement>(`Rule`);

      expect(entity).toHaveStyle('background-color: #4f41b9');
      expect(entity).toHaveStyle('padding-left:0');
    });

    test('should generate with DragPlaceHolder', () => {
      const entity = screen.getByText<HTMLDivElement>(/DragPlaceholder/);

      expect(entity).toBeInTheDocument();
    });

    test('should generate with ValidationBar', () => {
      const entity = screen.getByText<HTMLDivElement>(/ValidationBar/);

      expect(entity).toHaveTextContent(ValidatorTypes.Optional.toString());
    });

    test('should generate with TitleDropDownValidator', () => {
      const entity = screen.getByLabelText<HTMLDivElement>(`Rule`);

      expect(entity).toBeInTheDocument();
      expect(TitleDropDownValidator).toHaveBeenCalledWith(
        {
          title: 'Rule Title',
          value: props.value.title,
          /*          onChange: expect.any(Function),*/
          optionTitles: props.ruleStackValues.map((x) => x.ruleTitle),
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
          required: false,
          title: 'Rule Range',
          showTitle: false,
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

      expect(entity).toHaveTextContent(ValidatorTypes.Invalid.toString());
    });

    test('should generate with TitleDropDownValidator', () => {
      const entity = screen.getByLabelText<HTMLDivElement>(`Rule`);

      expect(entity).toBeInTheDocument();
      expect(TitleDropDownValidator).toHaveBeenCalledWith(
        {
          title: 'Rule Title',
          value: props.value.title,
          optionTitles: props.ruleStackValues.map((x) => x.ruleTitle),
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
        },
        {},
      );
    });

    test('should generate with RangeFieldValidator', () => {
      const entity = screen.getByLabelText<HTMLElement>(/Rule Range/);

      expect(entity).toBeInTheDocument();
      expect(RangeFieldValidator).toHaveBeenCalledWith(
        {
          min: props.ruleStackValues[1].min,
          max: props.ruleStackValues[1].max,
          prefix: props.ruleStackValues[1].prefix,
          suffix: props.ruleStackValues[1].suffix,

          required: false,
          id: 'rule-range',
          title: 'Rule Range',
          showTitle: false,
        },
        {},
      );
    });
  });
});
