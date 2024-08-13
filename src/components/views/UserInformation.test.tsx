import { fireEvent, render, screen } from '@testing-library/react';
import { UserInformation } from './UserInformation';
import React from 'react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { IUserInformationProps } from './IUserInformationProps';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { GoalPanel } from '../panels/GoalPanel';
import { RulesCollection } from '../rules/RulesCollection';
import { FontGroups } from '../../theming/fontGroups';

jest.mock('../panels/GoalPanel');
jest.mock('../panels/RangeValidationPanel');
jest.mock('../rules/RulesCollection');
jest.mock('../validators/RangeFieldValidator');

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
            goal: { validationResult: ValidatorTypes.Valid },
            savedAtStart: { validationResult: ValidatorTypes.Valid },
            moSavings: { validationResult: ValidatorTypes.Valid },
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
            value: { validationResult: ValidatorTypes.Valid },
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
            required: false,
            title: 'Amount Saved at Start',
            showTitle: true,
            useUnderlineOnly: false,
            value: { validationResult: ValidatorTypes.Valid },
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
            required: false,
            title: 'Amount Saved Per Month',
            showTitle: true,
            useUnderlineOnly: false,
            value: { validationResult: ValidatorTypes.Valid },
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
      props = {
        onChange: jest.fn(),
        choices: { holdRules: [], purchaseRules: [] },
        title: 'UserInput Test',
        values: {
          goal: { validationResult: ValidatorTypes.Valid },
          savedAtStart: { validationResult: ValidatorTypes.Valid },
          moSavings: { validationResult: ValidatorTypes.Valid },
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

        expect(props.onChange).toHaveBeenCalled();
      });
    });

    describe('and savings', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Amount Saved at Start');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(props.onChange).toHaveBeenCalled();
      });
    });

    describe('and monthly savings', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Amount Saved Per Month');

        fireEvent.change(entity, { target: { value: '40' } });

        expect(props.onChange).toHaveBeenCalled();
      });
    });

    describe('and purchase rules', () => {
      test('should fire update', () => {
        const entity = screen.getByLabelText<HTMLInputElement>('Purchase Rules');

        fireEvent.click(entity);

        expect(props.onChange).toHaveBeenCalled();
      });
    });
  });
});
