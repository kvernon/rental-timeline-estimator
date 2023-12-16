import React from 'react';
import { cleanup, configure, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RuleStack } from '../../../src/components/rules/RuleStack';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import { IRuleStackProps } from '../../../src/components/rules/RuleStack';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
import { useStackValidationChildren } from '../../../src/components/hooks/useStackValidationChildren';

import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';

jest.mock('../../../src/components/validators/TitleDropDownValidator');
import { TitleDropDownValidator } from '../../../src/components/validators/TitleDropDownValidator';
import { DeleteButton } from '../../../src/components/core/DeleteButton';

jest.mock('../../../src/components/core/DragPlaceHolder', () => {
  return {
    DragPlaceholder: jest.fn().mockReturnValue(<div>DragPlaceholder</div>),
  };
});
jest.mock('../../../src/components/core/DeleteButton');
jest.mock('../../../src/components/validators/ValidationBar', () => {
  return {
    ValidationBar: jest.fn((props) => <div>ValidationBar ${props?.isValid}</div>),
  };
});

jest.mock('../../../src/components/validators/RangeFieldValidator', () => {
  return {
    RangeFieldValidator: jest.fn((p) => <input type="number" id={`rangeFieldValidator${p.id}`} />),
  };
});
jest.mock('../../../src/components/PropertyDropDown', () => {
  return {
    PropertyDropDown: jest.fn().mockReturnValue(<select id={'PropertyDropDown'}></select>),
  };
});

jest.mock('../../../src/components/hooks/useStackValidationChildren');

describe('RuleStack unit tests', () => {
  let props: IRuleStackProps;
  const useStackValidationChildrenMock = jest.mocked(useStackValidationChildren);

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let expectedValidationType: ValidatorTypes;

    beforeEach(() => {
      props = {
        id: 'RuleStack2',
        ruleStackValues: [],
        validationType: ValidatorStackTypes.Required,
      };

      expectedValidationType = ValidatorTypes.Invalid;
      useStackValidationChildrenMock.mockReturnValue({ isValid: expectedValidationType, isValidCollection: [] });

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

      expect(entity).toHaveTextContent(expectedValidationType.toString());

      expect(useStackValidationChildrenMock).toHaveBeenCalledWith(props.validationType, expect.arrayContaining([]));

      // would like to supply the mocked components in to test...
      expect((useStackValidationChildrenMock.mock.calls[0][1] as []).length).toEqual(2);
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
    let expectedValidationType: ValidatorTypes;
    const removeClickMock: jest.MockedFn<(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void> = jest.fn();

    beforeEach(() => {
      props = {
        id: 'RuleStack2',
        ruleStackValues: [
          {
            min: 3,
            prefix: 'prefix-one',
            ruleTitle: 'rule-title-one',
            max: 7,
            suffix: 'suffix-one',
          },
          {
            min: 8,
            prefix: 'prefix-two',
            ruleTitle: 'rule-title-two',
            max: 20,
            suffix: 'suffix-two',
          },
        ],
        validationType: ValidatorStackTypes.Required,
        removeClick: removeClickMock,
      };

      expectedValidationType = ValidatorTypes.Invalid;
      useStackValidationChildrenMock.mockReturnValue({ isValid: expectedValidationType, isValidCollection: [] });

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
