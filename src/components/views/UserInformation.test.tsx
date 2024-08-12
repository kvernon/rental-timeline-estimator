import { render, screen } from '@testing-library/react';
import { UserInformation } from './UserInformation';
import React from 'react';
import '@testing-library/jest-dom';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { IUserInformationProps } from './IUserInformationProps';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { GoalPanel } from '../panels/GoalPanel';
import { RulesCollection } from '../rules/RulesCollection';

jest.mock('../panels/GoalPanel');
jest.mock('../panels/RangeValidationPanel');
jest.mock('../rules/RulesCollection');
jest.mock('../validators/RangeFieldValidator');

describe('UserInformation unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('and and defaults', () => {
    let props: IUserInformationProps;

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
        const entity = screen.getByLabelText<HTMLDivElement>('Goal Panel');

        expect(GoalPanel).toHaveBeenCalledWith(
          {
            hasSpinner: false,
            showTitle: false,
            id: 'goal-panel',
            max: 100000,
            min: 1000,
            prefix: '$',
            required: true,
            title: 'Your Monthly Goal',
            useUnderlineOnly: true,
            value: { validationResult: ValidatorTypes.Valid },
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
          },
          {},
        );
      });
    });
  });
});
