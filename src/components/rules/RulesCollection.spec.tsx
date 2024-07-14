import { RulesCollection } from './RulesCollection';
import { cleanup, configure, fireEvent, render, screen } from '@testing-library/react';
import { IRuleCollectionProps } from './IRuleCollectionProps';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import React from 'react';
import '@testing-library/jest-dom';
import { CardListLayout, ICardListLayoutProps } from '../core/CardListLayout';
import { RuleStack } from './RuleStack';
import { CardContent } from '../core/CardContent';
import { AddListButton } from '../core/AddListButton';
import { userEvent } from '@testing-library/user-event';
import { IFieldTypeProperties } from './IFieldTypeProperties';
import { ValidatorTypes } from '../validators/ValidatorTypes';

jest.mock('react-movable', () => {
  const all = jest.requireActual('react-movable');
  return {
    ...all,
    List: jest.mocked(all.List),
  };
});

jest.mock('./RuleStack');

jest.mock('../core/CardContent', () => {
  const all = jest.requireActual('../../../src/components/core/CardContent');
  return {
    CardContent: jest.fn((p: ICardListLayoutProps) => {
      return (
        <all.CardContent id={p.id} role={'list-box'}>
          {p.children}
        </all.CardContent>
      );
    }),
  };
});

jest.mock('../core/CardListLayout', () => {
  return {
    CardListLayout: jest.fn((p: ICardListLayoutProps) => <div id={p.id}>{p.children}</div>),
  };
});

jest.mock('../core/AddListButton');

describe('RulesCollection unit tests', () => {
  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let props: IRuleCollectionProps;

    beforeEach(() => {
      props = {
        id: 'RulesCollection',
        title: 'Rules Collection Test',
        possibleChoices: [],
        validationType: ValidatorStackTypes.Required,
      };

      render(<RulesCollection {...props} />);
    });

    test('should generate with CardListLayout', () => {
      const entity = screen.queryByTestId<HTMLElement>(props.id);

      expect(entity).toBeInTheDocument();
      expect(CardListLayout).toHaveBeenCalledWith(
        expect.objectContaining({
          id: props.id,
          title: props.title,
        }),
        {},
      );
    });

    test('should generate with List', () => {
      const entity = screen.queryByRole<HTMLElement>('list-box');

      expect(entity).toBeInTheDocument();
    });

    test('should not generate with AddRemoveButton', () => {
      expect(screen.queryByRole<HTMLElement>(`add remove button for ${props.title}`)).not.toBeInTheDocument();
    });

    test('should not generate CardContent', () => {
      expect(CardContent).toHaveBeenCalledWith(
        expect.objectContaining({
          children: [],
          className: expect.any(String),
        }),
        {},
      );

      expect(screen.queryByRole<HTMLElement>('list box')).not.toBeInTheDocument();
    });

    test('should not generate with RuleStack', () => {
      const id = `${props.title}.0`;

      expect(RuleStack).not.toHaveBeenCalled();

      const entity = screen.queryByTestId<HTMLElement>(id);

      expect(entity).not.toBeInTheDocument();
    });
  });

  describe('and interaction', () => {
    let interactProps: IRuleCollectionProps;

    let value: IFieldTypeProperties;
    let value2: IFieldTypeProperties;

    let id1: string;
    let id2: string;

    beforeEach(() => {
      interactProps = {
        id: 'RulesCollection',
        title: 'Rules Collection Test',
        possibleChoices: [],
        validationType: ValidatorStackTypes.Required,
      };

      value = {
        titleDropDown: {
          validationResult: ValidatorTypes.Valid,
          value: {
            value: 1,
            label: 'label one',
          },
        },
        propertyDropDown: {
          validationResult: ValidatorTypes.Valid,
          value: {
            value: 0,
            label: 'house',
          },
        },
        rangeFieldValidator: {
          validationResult: ValidatorTypes.Valid,
          value: 3,
        },
      };

      value2 = {
        titleDropDown: {
          validationResult: ValidatorTypes.Valid,
          value: {
            value: 2,
            label: 'label two',
          },
        },
        propertyDropDown: {
          validationResult: ValidatorTypes.Valid,
          value: {
            value: 0,
            label: 'house',
          },
        },
        rangeFieldValidator: {
          validationResult: ValidatorTypes.Valid,
          value: 4,
        },
      };

      id1 = `${interactProps.title}.0`;
      id2 = `${interactProps.title}.1`;

      interactProps.activeChoices = [value, value2];
    });

    describe('with fields populated', () => {
      describe('should render RuleStacks', () => {
        beforeEach(() => {
          render(<RulesCollection {...interactProps} />);
        });

        test('should generate with RuleStacks', () => {
          expect(RuleStack).toHaveBeenCalled();
          expect(RuleStack).toHaveBeenCalledWith(
            expect.objectContaining({
              id: id1,
              ruleStackValues: [],
              onKeyDown: expect.any(Function),
            }),
            {},
          );

          const entity1 = screen.queryByTestId<HTMLElement>(id1);
          const entity2 = screen.queryByTestId<HTMLElement>(id2);
          expect(entity1).toBeInTheDocument();
          expect(entity2).toBeInTheDocument();
        });

        test('should not generate CardContent', () => {
          expect(CardContent).toHaveBeenCalled();
          expect(screen.queryByRole<HTMLElement>('list-box')).toBeInTheDocument();
        });

        describe('and remove', () => {
          test('should be', () => {
            const deleteButton = screen.getAllByText<HTMLDivElement>('delete button')[1];

            fireEvent.click(deleteButton);
          });
        });
      });

      describe('and adding', () => {
        beforeEach(() => {
          interactProps.possibleChoices = [
            {
              max: 2,
              ruleTitle: 'title',
              property: 1,
              prefix: 'prefix',
              suffix: 'suffix',
              min: 1,
            },
            {
              max: 3,
              ruleTitle: 'title-2',
              property: 1,
              prefix: 'prefix',
              suffix: 'suffix',
              min: 2,
            },
          ];

          render(<RulesCollection {...interactProps} />);
        });

        describe('and less than max', () => {
          test('should show button', () => {
            const addButton = screen.queryByRole<HTMLButtonElement>('log');
            const AddListButtonCtor = jest.mocked(AddListButton);

            expect(AddListButtonCtor).toHaveBeenCalledWith(
              {
                label: 'Add',
                onClick: expect.any(Function),
                role: 'add button for Rules Collection Test',
                theme: {},
              },
              {},
            );

            expect(addButton).toBeInTheDocument();
          });
        });

        test('should call when clicked', async () => {
          const addButton = await screen.findByRole<HTMLButtonElement>('button');

          const addButtonCtor = jest.mocked(AddListButton);

          expect(addButtonCtor).toHaveBeenCalledWith(
            {
              label: 'Add',
              onClick: expect.any(Function),
              role: 'add button for Rules Collection Test',
              theme: {},
            },
            {},
          );

          await userEvent.click(addButton);

          expect(addButton).toBeInTheDocument();

          expect(RuleStack).toHaveBeenCalledTimes(10);
        });
      });
    });

    describe('and maxing', () => {
      beforeEach(() => {
        interactProps.possibleChoices = [
          {
            max: 2,
            ruleTitle: 'title',
            property: 1,
            prefix: 'prefix',
            suffix: 'suffix',
            min: 1,
          },
          {
            max: 3,
            ruleTitle: 'title-2',
            property: 1,
            prefix: 'prefix',
            suffix: 'suffix',
            min: 2,
          },
        ];

        interactProps.activeChoices = [
          {
            titleDropDown: { value: { value: 0, label: 'title' } },
            propertyDropDown: {},
            rangeFieldValidator: {},
          },
          {
            titleDropDown: { value: { value: 1, label: 'title-2' } },
            propertyDropDown: {},
            rangeFieldValidator: {},
          },
        ];

        render(<RulesCollection {...interactProps} />);
      });

      test.only('should hide add button', () => {
        const addButton = screen.queryByRole<HTMLButtonElement>('log');
        expect(addButton).not.toBeInTheDocument();
      });
    });
  });
});
