import React from 'react';
import { cleanup, configure, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RuleStack } from './RuleStack';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRuleStackProps } from './RuleStack';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { TitleDropDownValidator } from '../validators/TitleDropDownValidator';
import { DeleteButton } from '../core/DeleteButton';

jest.mock('../validators/TitleDropDownValidator');
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

jest.mock('../validators/RangeFieldValidator', () => {
  return {
    RangeFieldValidator: jest.fn((p) => <input type="number" id={`rangeFieldValidator${p.id}`} />),
  };
});
jest.mock('../validators/PropertyDropDownValidator', () => {
  return {
    PropertyDropDownValidator: jest.fn().mockReturnValue(<select id={'PropertyDropDownValidator'}></select>),
  };
});

describe('RuleStack unit tests', () => {
  let props: IRuleStackProps;

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    beforeEach(() => {
      props = {
        id: 'RuleStack2',
        ruleStackValues: [],
        validationType: ValidatorStackTypes.Required,
      };

      render(<RuleStack {...props} />);
    });

    test('should generate with StackBase', () => {
      const entity = screen.getByTestId<HTMLDivElement>('RuleStack2');

      expect(entity).toHaveStyle('background-color: #4f41b9');
      expect(entity).toHaveStyle('padding-left:0');
    });

    test('should generate with DragPlaceHolder', () => {
      const entity = screen.getByText<HTMLDivElement>(/DragPlaceholder/);

      expect(entity).toBeInTheDocument();
    });

    test('should generate with ValidationBar', () => {
      const entity = screen.getByText<HTMLDivElement>(/ValidationBar/);

      expect(entity).toHaveTextContent(ValidatorTypes.Invalid.toString());
    });

    test('should generate with TitleDropDownValidator', () => {
      const entity = screen.getByTestId<HTMLSelectElement>(`titleDropDownValidator${props.id}`);

      expect(entity).toBeInTheDocument();
      expect(TitleDropDownValidator).toHaveBeenCalledWith(
        {
          defaultIndex: 0,
          id: props.id,
          onChange: expect.any(Function),
          titles: [],
          validationType: props.validationType,
        },
        {},
      );
    });

    test('should generate PropertyDropDown', () => {
      const entity = screen.getByTestId<HTMLElement>(/PropertyDropDown/);

      expect(entity).toBeInTheDocument();
    });

    test('should generate with RangeFieldValidator', () => {
      const entity = screen.getByTestId<HTMLElement>(`rangeFieldValidator${props.id}`);

      expect(entity).toBeInTheDocument();
      expect(RangeFieldValidator).toHaveBeenCalledWith(
        {
          id: props.id,
          min: undefined,
          max: undefined,
          onChange: expect.any(Function),
          prefix: undefined,
          suffix: undefined,
          validationType: props.validationType,
        },
        {},
      );
    });

    test('should generate with DeleteButton', () => {
      const entity = screen.getByRole<HTMLDivElement>('delete-button');

      expect(entity).toBeInTheDocument();
    });
  });

  describe('and using component', () => {
    const removeClickMock: jest.MockedFn<(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void> = jest.fn();

    beforeEach(() => {
      props = {
        id: 'RuleStack2',
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
        validationType: ValidatorStackTypes.Required,
        removeClick: removeClickMock,
      };

      render(<RuleStack {...props} />);
    });

    describe('and title change', () => {
      test('and should update range validator', async () => {
        expect(TitleDropDownValidator).toHaveBeenCalledWith(
          {
            defaultIndex: 0,
            id: props.id,
            onChange: expect.any(Function),
            titles: ['rule-title-one', 'rule-title-two'],
            validationType: props.validationType,
          },
          {},
        );

        expect(RangeFieldValidator).toHaveBeenNthCalledWith(
          1,
          {
            id: 'RuleStack2',
            max: undefined,
            min: undefined,
            onChange: expect.any(Function),
            prefix: undefined,
            suffix: undefined,
            validationType: props.validationType,
          },
          {},
        );

        const entity = screen.getByTestId<HTMLElement>(`titleDropDownValidator${props.id}`);

        const value = 1;

        fireEvent.change(entity, {
          target: { value },
        });

        expect(RangeFieldValidator).toHaveBeenNthCalledWith(
          2,
          {
            id: 'RuleStack2',
            max: 7,
            min: 3,
            onChange: expect.any(Function),
            prefix: 'prefix-one',
            suffix: 'suffix-one',
            validationType: props.validationType,
          },
          {},
        );
      });
    });

    describe('and press delete', () => {
      test('should call removeClick', () => {
        const deleteButton = screen.getByRole<HTMLDivElement>('delete-button');
        expect(deleteButton.innerHTML).toEqual('This is the delete button');

        const DeleteButtonCtor = jest.mocked(DeleteButton);

        expect(DeleteButtonCtor).toHaveBeenCalledWith(
          {
            onClick: expect.any(Function),
          },
          {},
        );

        fireEvent.click(deleteButton);

        expect(removeClickMock).toHaveBeenCalled();
      });
    });
  });
});
