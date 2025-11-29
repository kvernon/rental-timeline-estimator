import { fireEvent, render, screen } from '@testing-library/react';
import { UserInformation } from './UserInformation';
import React from 'react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { IUserInformationProps } from './IUserInformationProps';
import { AnimatedRangeFieldValidator } from '../components/validators/AnimatedRangeFieldValidator';
import { RulesCollection } from '../components/rules/RulesCollection';
import { FontGroups } from '../theming/fontGroups';
import { evaluateValidation } from '../components/validators/evaluateValidation';
import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('../components/panels/RangeValidationPanel');
jest.mock('../components/core/Spinner');
jest.mock('../components/rules/RulesCollection');
jest.mock('../components/validators/AnimatedRangeFieldValidator');
jest.mock('../components/validators/evaluateValidation');
jest.mock('../components/validators/isInRange');
jest.mock('./getRulesValuesToRulesValuesResults');

jest.mock('react-redux');

describe('UserInformation unit tests', () => {
  let props: IUserInformationProps;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.mocked(useDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('and defaults', () => {
    describe('and success', () => {
      beforeEach(() => {
        props = {
          choices: { holdRules: [], purchaseRules: [] },
          title: 'UserInput Test',
        };
        const userInfo = {
          goal: { value: 10, validationResult: ValidatorTypes.Valid },
          savedAtStart: { value: 20, validationResult: ValidatorTypes.Valid },
          moSavings: { value: 30, validationResult: ValidatorTypes.Valid },
          purchaseRules: [],
          holdRules: [],
        };
        jest.mocked(useSelector).mockImplementation((selector: (s: unknown) => unknown) => selector({ form: { userInfo } } as unknown));
        render(<UserInformation {...props} />);
      });

      test('should render form', () => {
        const actual = screen.queryByLabelText<HTMLFormElement>(props.title);

        expect(actual).toBeInTheDocument();
      });

      test('should goal panel pieces', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Goal Panel');

        expect(AnimatedRangeFieldValidator).toHaveBeenNthCalledWith(
          1,
          {
            inputFontGroup: FontGroups.inputGoal,
            inputLabelFontGroup: FontGroups.inputGoalLabel,
            hasSpinner: false,
            showTitle: true,
            id: 'goal-panel',
            max: 100000,
            min: 1000,
            prefix: '$',
            required: true,
            title: 'Your Monthly Goal',
            useUnderlineOnly: true,
            useTransparent: true,
            value: { validationResult: ValidatorTypes.Valid, value: 10 },
            onChange: expect.any(Function),
          },
          undefined,
        );

        expect(entity).toBeInTheDocument();
      });

      test('should validation panel titled savings', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Savings');

        expect(entity).toBeInTheDocument();
      });

      test('should validation panel for savings at start', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Amount Saved at Start');

        expect(AnimatedRangeFieldValidator).toHaveBeenNthCalledWith(
          2,
          {
            delay: 0.3,
            min: 0,
            max: 9999999,
            prefix: '$',
            id: 'amount-saved-at-start',
            hasSpinner: true,
            required: true,
            title: 'Amount Saved at Start',
            showTitle: true,
            useUnderlineOnly: false,
            value: { validationResult: ValidatorTypes.Valid, value: 20 },
            onChange: expect.any(Function),
          },
          undefined,
        );

        expect(entity).toBeInTheDocument();
      });

      test('should validation panel for savings per month', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Amount Saved Per Month');

        expect(entity).toBeInTheDocument();

        expect(AnimatedRangeFieldValidator).toHaveBeenNthCalledWith(
          3,
          {
            delay: 0.5,
            min: 0,
            max: 9999999,
            prefix: '$',
            id: 'amount-saved-per-month',
            hasSpinner: true,
            required: true,
            title: 'Amount Saved Per Month',
            showTitle: true,
            useUnderlineOnly: false,
            value: { validationResult: ValidatorTypes.Valid, value: 30 },
            onChange: expect.any(Function),
          },
          undefined,
        );
      });

      test('should have purchase rules', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Purchase Rules');

        expect(entity).toBeInTheDocument();

        expect(RulesCollection).toHaveBeenNthCalledWith(
          1,
          {
            title: 'Purchase Rules',
            values: [],
            possibleChoices: [],
            onChange: expect.any(Function),
          },
          undefined,
        );
      });

      test('should have hold rules', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Hold Rules');

        expect(entity).toBeInTheDocument();

        expect(RulesCollection).toHaveBeenNthCalledWith(
          2,
          {
            className: expect.any(String),
            title: 'Hold Rules',
            values: [],
            possibleChoices: [],
            onChange: expect.any(Function),
          },
          undefined,
        );
      });
    });
  });

  describe('and interaction', () => {
    beforeEach(() => {
      jest.mocked(evaluateValidation).mockImplementation((v) => ({
        validationResult: ValidatorTypes.Optional,
        value: v,
      }));

      props = {
        choices: { holdRules: [], purchaseRules: [] },
        title: 'UserInput Test',
      };
      const userInfo = {
        goal: { value: 1, validationResult: ValidatorTypes.Valid },
        savedAtStart: { value: 2, validationResult: ValidatorTypes.Valid },
        moSavings: { value: 3, validationResult: ValidatorTypes.Valid },
        purchaseRules: [
          {
            title: { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            property: { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            range: { value: 50, validationResult: ValidatorTypes.Valid },
          },
        ],
        holdRules: [
          {
            title: { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            property: { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            range: { value: 50, validationResult: ValidatorTypes.Valid },
          },
        ],
      };
      jest.mocked(useSelector).mockImplementation((selector: (s: unknown) => unknown) => selector({ form: { userInfo } } as unknown));
      render(<UserInformation {...props} />);
    });

    describe('and goal', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Your Monthly Goal');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'form/updateRangeUserInfo',
            payload: {
              key: 'goal',
              value: { validationResult: ValidatorTypes.Valid, value: 40 },
            },
          }),
        );
      });
    });

    describe('and savings', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Amount Saved at Start');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'form/updateRangeUserInfo',
            payload: {
              key: 'savedAtStart',
              value: { validationResult: ValidatorTypes.Valid, value: 40 },
            },
          }),
        );
      });
    });

    describe('and monthly savings', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Amount Saved Per Month');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'form/updateRangeUserInfo',
            payload: {
              key: 'moSavings',
              value: { validationResult: ValidatorTypes.Valid, value: 40 },
            },
          }),
        );
      });
    });

    describe('and purchase rules', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Purchase Rules');
        const transformed: ReturnType<typeof getRulesValuesToRulesValuesResults> = [{ test: 'purchase' }] as unknown as ReturnType<
          typeof getRulesValuesToRulesValuesResults
        >;
        jest.mocked(getRulesValuesToRulesValuesResults).mockReturnValueOnce(transformed);

        fireEvent.click(entity);

        expect(jest.mocked(getRulesValuesToRulesValuesResults)).toHaveBeenCalledWith(false, expect.any(Object), props.choices.purchaseRules);
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'form/updateRuleUserInfo',
            payload: { key: 'purchaseRules', value: transformed },
          }),
        );
      });
    });

    describe('and hold rules', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Hold Rules');
        const transformed: ReturnType<typeof getRulesValuesToRulesValuesResults> = [{ test: 'hold' }] as unknown as ReturnType<
          typeof getRulesValuesToRulesValuesResults
        >;
        jest.mocked(getRulesValuesToRulesValuesResults).mockReturnValueOnce(transformed);

        fireEvent.click(entity);

        expect(jest.mocked(getRulesValuesToRulesValuesResults)).toHaveBeenCalledWith(false, expect.any(Object), props.choices.holdRules);
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'form/updateRuleUserInfo',
            payload: { key: 'holdRules', value: transformed },
          }),
        );
      });
    });
  });
});
