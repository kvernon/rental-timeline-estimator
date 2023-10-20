import { RulesCollection } from '../../src/components/rules/RulesCollection';
import { cleanup, configure, fireEvent, render, screen } from '@testing-library/react';
import { IRuleCollectionProps } from '../../src/components/rules/IRuleCollectionProps';
import { ValidatorStackTypes } from '../../src/components/validators/ValidatorStackTypes';
import React from 'react';
import '@testing-library/jest-dom';
import { CardListLayout, ICardListLayoutProps } from '../../src/components/core/CardListLayout';
import { IRuleStackProps, RuleStack } from '../../src/components/rules/RuleStack';
import { useFieldArray, UseFieldArrayReturn, useFormContext, UseFormReturn } from 'react-hook-form';
import { ValidatorTypes } from '../../src/components/validators/ValidatorTypes';
import { IAry, IFieldType } from '../../src/components/rules/FormInterfaces';
import { CardContent } from '../../src/components/core/CardContent';
import { AddListButton } from '../../src/components/core/AddListButton';
import { userEvent } from '@testing-library/user-event';

jest.mock('react-hook-form');
jest.mock('react-movable', () => {
  const all = jest.requireActual('react-movable');
  return {
    ...all,
    List: jest.mocked(all.List),
  };
});

jest.mock('../../src/components/rules/RuleStack', () => {
  return {
    RuleStack: jest.fn((p: IRuleStackProps) => {
      return (
        <div {...p} style={{ height: '50px', width: '50px' }}>
          <span data-movable-handle="true">handle</span>
          <div
            onClick={(e) => {
              if (p.removeClick) {
                p?.removeClick(e);
              }
            }}
          >
            delete button
          </div>
        </div>
      );
    }),
  };
});

jest.mock('../../src/components/core/CardContent', () => {
  const all = jest.requireActual('../../src/components/core/CardContent');
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

jest.mock('../../src/components/core/CardListLayout', () => {
  return {
    CardListLayout: jest.fn((p: ICardListLayoutProps) => <div id={p.id}>{p.children}</div>),
  };
});

jest.mock('../../src/components/core/AddListButton');

describe('RulesCollection unit tests', () => {
  const useFormContextMock = jest.mocked(useFormContext<IAry<string>>);
  let controlMock: jest.Mocked<UseFormReturn>;

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
    controlMock = {
      control: {
        register: jest.fn(),
        handleSubmit: jest.fn(),
        unregister: jest.fn(),
        getFieldState: jest.fn(),
        setError: jest.fn(),
      },
    } as unknown as jest.Mocked<UseFormReturn>;

    useFormContextMock.mockReturnValue(controlMock);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let props: IRuleCollectionProps;
    const useFieldArrayMock = jest.mocked(useFieldArray);

    beforeEach(() => {
      props = {
        id: 'RulesCollection',
        title: 'Rules Collection Test',
        possibleChoices: [],
        validationType: ValidatorStackTypes.Required,
      };

      useFieldArrayMock.mockReturnValue({
        fields: [],
        insert: jest.fn(),
        move: jest.fn(),
        prepend: jest.fn(),
        replace: jest.fn(),
        update: jest.fn(),
        swap: jest.fn(),
        append: jest.fn(),
        remove: jest.fn(),
      });
      render(<RulesCollection {...props} />);
    });

    test('useFieldArrayMock should be called', () => {
      const params = {
        name: props.title,
        control: controlMock.control,
      };
      expect(useFieldArrayMock).toHaveBeenCalledWith(params);
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
    let useFieldArrayReturnMock: jest.Mocked<UseFieldArrayReturn<IAry<string>, string, string>>;
    const useFieldArrayMocked = jest.mocked(useFieldArray);
    let value: IFieldType;
    let value2: IFieldType;
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
        rangeFieldValidator: {
          validationResult: ValidatorTypes.Valid,
          value: 4,
        },
      };

      const valuesCollection: IAry<string> = {
        [interactProps.title]: [value, value2],
      };

      useFieldArrayReturnMock = {
        fields: [],
        insert: jest.fn(),
        move: jest.fn(),
        prepend: jest.fn(),
        replace: jest.fn(),
        update: jest.fn(),
        swap: jest.fn(),
        append: jest.fn(),
        remove: jest.fn(),
      };

      // current struggling with alignment on the type / interface matching associated w/ react-hook-form
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useFieldArrayReturnMock.fields = valuesCollection[interactProps.title];
      useFieldArrayMocked.mockReturnValueOnce(useFieldArrayReturnMock);

      id1 = `${interactProps.title}.0`;
      id2 = `${interactProps.title}.1`;
    });

    describe('with fields populated', () => {
      describe('should render RuleStacks', () => {
        beforeEach(() => {
          render(<RulesCollection {...interactProps} />);
        });

        test('should generate with RuleStacks', () => {
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

            expect(useFieldArrayReturnMock.remove).toHaveBeenCalled();
          });
        });
      });

      describe('and adding', () => {
        beforeEach(() => {
          interactProps.possibleChoices = [
            {
              max: 2,
              ruleTitle: 'title',
              prefix: 'prefix',
              suffix: 'suffix',
              min: 1,
            },
            {
              max: 3,
              ruleTitle: 'title-2',
              prefix: 'prefix',
              suffix: 'suffix',
              min: 2,
            },
          ];

          useFieldArrayMocked.mockReturnValue(useFieldArrayReturnMock);
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
          expect(useFieldArrayReturnMock.append).toHaveBeenCalledWith({
            rangeFieldValidator: {
              validationResult: ValidatorTypes.Valid,
              value: 0,
            },
            titleDropDown: {
              validationResult: ValidatorTypes.Valid,
              value: { label: interactProps.possibleChoices[0].ruleTitle, value: 0 },
            },
          });
        });
      });
    });
  });
});
