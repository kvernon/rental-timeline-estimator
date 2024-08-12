import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RulesCollection } from './RulesCollection';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { AddListButton } from '../core/AddListButton';
import { getRemainingValues } from './getRemainingValues';
import userEvent from '@testing-library/user-event';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { IRulesCollectionProps } from './IRulesCollectionProps';

jest.mock('../core/CardListLayout');
jest.mock('../core/AddListButton');
jest.mock('./getRemainingValues');
jest.mock('./RuleStack');

describe('RulesCollection unit tests', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let props: IRulesCollectionProps;

    beforeEach(() => {
      props = {
        title: 'Rules Collection',
        values: [],
        possibleChoices: [],
      };

      jest.mocked(getRemainingValues).mockReturnValue([]);

      render(<RulesCollection {...props} />);
    });

    test('should render correctly', () => {
      expect(screen.getByRole('log')).toBeInTheDocument();
      expect(screen.getByLabelText(props.title)).toBeInTheDocument();
    });
  });

  describe('and values populated', () => {
    let props: IRulesCollectionProps;

    beforeEach(() => {
      props = {
        title: 'Rules Collection',
        values: [
          {
            title: { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            property: { value: { value: 0, label: 'apartment' }, validationResult: ValidatorTypes.Valid },
            range: { value: 0, validationResult: ValidatorTypes.Valid },
          },
        ],
        possibleChoices: [],
      };

      jest.mocked(getRemainingValues).mockReturnValue([{ index: 1, entity: props.possibleChoices[1] }]);

      render(<RulesCollection {...props} />);
    });

    test('should render list', () => {
      const ruleItemEntity = screen.getByLabelText('render-list');
      expect(ruleItemEntity).toBeInTheDocument();
    });

    test('should render first item', () => {
      const ruleItemEntity = screen.getByLabelText(`Rule Number 0`);
      expect(ruleItemEntity).toBeInTheDocument();
    });
  });

  describe('and interaction', () => {
    let props: IRulesCollectionProps;

    beforeEach(() => {
      props = {
        title: 'Rules Collection',
        values: [
          {
            title: { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            property: { value: { value: 0, label: 'apartment' }, validationResult: ValidatorTypes.Valid },
            range: { value: 0, validationResult: ValidatorTypes.Valid },
          },
        ],
        possibleChoices: [
          {
            ruleTitle: 'one',
            suffix: 'suf',
            prefix: 'pre',
            max: 20,
            min: 10,
            property: 0,
          },
          {
            ruleTitle: 'two',
            suffix: 'suff',
            prefix: 'pree',
            max: 40,
            min: 20,
            property: 1,
          },
        ],
        onChange: jest.fn(),
      };

      jest.mocked(getRemainingValues).mockReturnValue([{ index: 1, entity: props.possibleChoices[1] }]);
    });

    describe('should render RuleStacks', () => {
      describe('and displaying the add button', () => {
        test('it should show', () => {
          render(<RulesCollection {...props} />);

          const addButton = screen.queryByLabelText<HTMLButtonElement>(`Add button for ${props.title}`);

          const AddListButtonCtor = jest.mocked(AddListButton);
          expect(AddListButtonCtor).toHaveBeenCalledWith(
            {
              role: `Add button for ${props.title}`,
              label: 'Add',
              onClick: expect.any(Function),
              theme: themeMock,
            },
            {},
          );

          expect(addButton).toBeInTheDocument();
        });
      });

      describe('and clicking the button', () => {
        describe('and not required', () => {
          test('it should fire update', async () => {
            render(<RulesCollection {...props} />);

            const addButton = screen.getByLabelText<HTMLButtonElement>(`Add button for ${props.title}`);

            expect(addButton).toBeInTheDocument();

            await userEvent.click(addButton);

            const added: {
              title: IEventResult<ISelectOption>;
              property: IEventResult<ISelectOption>;
              range: IEventResult<number>;
            } = {
              title: {
                value: { value: 1, label: props.possibleChoices[1].ruleTitle },
                validationResult: ValidatorTypes.Valid,
              },
              property: {
                value: { value: props.possibleChoices[1].property, label: 'house' },
                validationResult: ValidatorTypes.Valid,
              },
              range: {
                validationResult: ValidatorTypes.Valid,
              },
            };

            const expected = [...props.values];
            expected.push(added);

            expect(props.onChange).toHaveBeenCalledWith(expected);
          });
        });

        describe('and required', () => {
          test('it should fire update', async () => {
            props.required = true;

            render(<RulesCollection {...props} />);

            const addButton = screen.getByLabelText<HTMLButtonElement>(`Add button for ${props.title}`);

            expect(addButton).toBeInTheDocument();

            await userEvent.click(addButton);

            const added: {
              title: IEventResult<ISelectOption>;
              property: IEventResult<ISelectOption>;
              range: IEventResult<number>;
            } = {
              title: {
                value: { value: 1, label: props.possibleChoices[1].ruleTitle },
                validationResult: ValidatorTypes.Valid,
              },
              property: {
                value: { value: props.possibleChoices[1].property, label: 'house' },
                validationResult: ValidatorTypes.Valid,
              },
              range: {
                validationResult: ValidatorTypes.Invalid,
              },
            };

            const expected = [...props.values];
            expected.push(added);

            expect(props.onChange).toHaveBeenCalledWith(expected);
          });
        });
      });
    });

    describe('and updating input', () => {
      test('should call update', () => {
        render(<RulesCollection {...props} />);
        const input = screen.getByLabelText<HTMLButtonElement>(`Rule Range`);

        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '40' } });

        expect(props.onChange).toHaveBeenCalledWith([
          {
            ...props.values[0],
            range: { value: 40 },
          },
        ]);
      });
    });
  });
});
