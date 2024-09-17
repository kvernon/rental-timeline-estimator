import { fireEvent, render, screen } from '@testing-library/react';
import { UserInformation } from './UserInformation';
import React from 'react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { IUserInformationProps } from './IUserInformationProps';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { GoalPanel } from '../components/panels/GoalPanel';
import { RulesCollection } from '../components/rules/RulesCollection';
import { FontGroups } from '../theming/fontGroups';
import { evaluateValidation } from '../components/validators/evaluateValidation';
import { isInRange } from '../components/validators/isInRange';
import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';

jest.mock('../components/panels/GoalPanel');
jest.mock('../components/panels/RangeValidationPanel');
jest.mock('../components/rules/RulesCollection');
jest.mock('../components/validators/RangeFieldValidator');
jest.mock('../components/validators/evaluateValidation');
jest.mock('../components/validators/isInRange');
jest.mock('./getRulesValuesToRulesValuesResults');

describe('UserInformation unit tests', () => {
  let props: IUserInformationProps;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('and defaults', () => {
    describe('and success', () => {
      beforeEach(() => {
        props = {
          choices: { holdRules: [], purchaseRules: [] },
          title: 'UserInput Test',
          values: {
            goal: { value: 10, validationResult: ValidatorTypes.Valid },
            savedAtStart: { value: 20, validationResult: ValidatorTypes.Valid },
            moSavings: { value: 30, validationResult: ValidatorTypes.Valid },
            purchaseRules: [],
            holdRules: [],
          },
        };
        render(<UserInformation {...props} />);
      });

      test('should render form', () => {
        const actual = screen.queryByLabelText<HTMLFormElement>(props.title);

        expect(actual).toBeInTheDocument();
      });

      test('should goal panel', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Goal Panel');

        expect(GoalPanel).toHaveBeenCalledWith(
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
            value: { validationResult: ValidatorTypes.Valid, value: 10 },
            onChange: expect.any(Function),
          },
          {},
        );

        expect(entity).toBeInTheDocument();
      });

      test('should validation panel titled savings', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Savings');

        expect(entity).toBeInTheDocument();
      });

      test('should validation panel for savings at start', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Amount Saved at Start');

        expect(RangeFieldValidator).toHaveBeenNthCalledWith(
          1,
          {
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
          {},
        );

        expect(entity).toBeInTheDocument();
      });

      test('should validation panel for savings per month', () => {
        const entity = screen.getByLabelText<HTMLDivElement>('Amount Saved Per Month');

        expect(entity).toBeInTheDocument();

        expect(RangeFieldValidator).toHaveBeenNthCalledWith(
          2,
          {
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
          {},
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
          {},
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
          {},
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
        onChange: jest.fn(),
        choices: { holdRules: [], purchaseRules: [] },
        title: 'UserInput Test',
        values: {
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
        },
      };
      render(<UserInformation {...props} />);
    });

    describe('and goal', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Goal Panel');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(props.onChange).toHaveBeenCalledWith({
          goal: { value: 40, validationResult: ValidatorTypes.Valid },
          holdRules: [
            {
              property: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
              range: { validationResult: ValidatorTypes.Valid, value: 50 },
              title: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
            },
          ],
          moSavings: { validationResult: ValidatorTypes.Valid, value: 3 },
          purchaseRules: [
            {
              property: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
              range: { validationResult: ValidatorTypes.Valid, value: 50 },
              title: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
            },
          ],
          savedAtStart: { validationResult: ValidatorTypes.Valid, value: 2 },
        });
      });
    });

    describe('and savings', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Amount Saved at Start');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(props.onChange).toHaveBeenCalledWith({
          goal: { validationResult: ValidatorTypes.Valid, value: 1 },
          holdRules: [
            {
              property: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
              range: { validationResult: ValidatorTypes.Valid, value: 50 },
              title: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
            },
          ],
          moSavings: { validationResult: ValidatorTypes.Valid, value: 3 },
          purchaseRules: [
            {
              property: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
              range: { validationResult: ValidatorTypes.Valid, value: 50 },
              title: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
            },
          ],
          savedAtStart: { validationResult: ValidatorTypes.Valid, value: 40 },
        });
      });
    });

    describe('and monthly savings', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Amount Saved Per Month');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(props.onChange).toHaveBeenCalledWith({
          goal: { validationResult: ValidatorTypes.Valid, value: 1 },
          holdRules: [
            {
              property: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
              range: { validationResult: ValidatorTypes.Valid, value: 50 },
              title: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
            },
          ],
          moSavings: { validationResult: ValidatorTypes.Valid, value: 40 },
          purchaseRules: [
            {
              property: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
              range: { validationResult: ValidatorTypes.Valid, value: 50 },
              title: { validationResult: ValidatorTypes.Valid, value: { label: 'one', value: 0 } },
            },
          ],
          savedAtStart: { validationResult: ValidatorTypes.Valid, value: 2 },
        });
      });
    });

    describe('and purchase rules', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Purchase Rules');

        fireEvent.click(entity);

        expect(props.onChange).toHaveBeenCalled();

        expect(jest.mocked(getRulesValuesToRulesValuesResults)).toHaveBeenCalledWith(false, expect.any(Object), props.choices.purchaseRules);
      });
    });

    describe('and hold rules', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Hold Rules');

        fireEvent.click(entity);

        expect(props.onChange).toHaveBeenCalled();

        expect(jest.mocked(getRulesValuesToRulesValuesResults)).toHaveBeenCalledWith(false, expect.any(Object), props.choices.holdRules);
      });
    });
  });
});
