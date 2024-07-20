import { configure, render, screen } from '@testing-library/react';
import { GoalPanel } from './GoalPanel';
import React from 'react';
import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { ValidatorStackName } from '../naming/ValidatorStackName';

jest.mock('../validators/RangeFieldValidator', () => {
  return {
    RangeFieldValidator: jest.fn((p: IRangeFieldValidatorProps) => <input type="number" id={p.id} value={p.defaultValue} name={p.title}></input>),
  };
});

describe('GoalPanel unit test', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });

  test('should render', () => {
    const p: IRangeFieldValidatorProps = {
      id: 'goal',
      validationType: ValidatorStackTypes.Required,
    };

    render(<GoalPanel {...p} />);

    const entity = screen.getByTestId<HTMLDivElement>(ValidatorStackName(p.id));

    expect(entity).toMatchSnapshot();
  });
});
