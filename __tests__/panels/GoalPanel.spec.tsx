import { configure, render, screen } from '@testing-library/react';
import { GoalPanel } from '../../src/components/panels/GoalPanel';
import React from 'react';
import { IRangeFieldValidatorProps } from '../../src/components/validators/IRangeFieldValidatorProps';
import { ValidatorStackTypes } from '../../src/components/validators/ValidatorStackTypes';
import { useStackValidationChildren } from '../../src/components/hooks/useStackValidationChildren';
import { ValidatorTypes } from '../../src/components/validators/ValidatorTypes';
import { ValidatorStackName } from '../../src/components/naming/ValidatorStackName';

jest.mock('../../src/components/validators/RangeFieldValidator', () => {
  return {
    RangeFieldValidator: jest.fn((p: IRangeFieldValidatorProps) => <input type="number" id={p.id} value={p.defaultValue} name={p.title}></input>),
  };
});
jest.mock('react-hook-form', () => {
  //const watchMock: jest.Mock = jest.fn();
  return {
    useForm: jest.fn().mockReturnValue({}),
    useFormContext: jest.fn().mockReturnValue({
      register: jest.fn(),
      getValues: jest.fn(),
      setValue: jest.fn(),
      trigger: jest.fn(),
    }),
  };
});

jest.mock('../../src/components/hooks/useStackValidationChildren');

describe('GoalPanel unit test', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });

  test('should render', () => {
    const useValidationChildrenMocked = jest.mocked(useStackValidationChildren);
    useValidationChildrenMocked.mockReturnValueOnce({
      isValid: ValidatorTypes.Optional,
      isValidCollection: [],
    });

    const p: IRangeFieldValidatorProps = {
      id: 'goal',
      validationType: ValidatorStackTypes.Required,
    };

    render(<GoalPanel {...p} />);

    const entity = screen.getByTestId<HTMLDivElement>(ValidatorStackName(p.id));

    expect(entity).toMatchSnapshot();
  });
});
