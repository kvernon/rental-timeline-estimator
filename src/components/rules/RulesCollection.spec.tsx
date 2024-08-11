import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IRulesCollectionProps, RulesCollection } from './RulesCollection';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { AddListButton } from '../core/AddListButton';
import { getRemainingValues } from './getRemainingValues';
import userEvent from '@testing-library/user-event';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';

jest.mock('../core/CardListLayout');
jest.mock('../core/AddListButton');
jest.mock('./getRemainingValues');

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

    test('should render correctly', () => {
      const ruleItemEntity = screen.getByLabelText(props.values[0].title?.value?.label as string);
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

      render(<RulesCollection {...props} />);
    });

    describe('should render RuleStacks', () => {
      describe('and displaying the add button', () => {
        test('it should show', () => {
          const addButton = screen.queryByLabelText<HTMLButtonElement>(`Add button for ${props.title}`);
          screen.debug();
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
        test('it should fire update', async () => {
          const addButton = screen.getByLabelText<HTMLButtonElement>(`Add button for ${props.title}`);

          expect(addButton).toBeInTheDocument();

          await userEvent.click(addButton);

          const expected = [...props.values];

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

          expected.push(added);

          expect(props.onChange).toHaveBeenCalledWith(expected);
        });
      });
    });
  });
});
