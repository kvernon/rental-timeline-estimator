import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { RawResults } from './RawResults';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { HoldRuleTypes, PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';
import { generate } from '../data/generate';

jest.mock('../data/generate');

describe('RawResults unit tests', () => {
  beforeEach(() => {
    jest.mocked(generate).mockReturnValue(null);

    const userInfo: {
      purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
      holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
      savedAtStart: IEventResult<number | undefined>;
      moSavings: IEventResult<number | undefined>;
      goal: IEventResult<number | undefined>;
    } = {
      purchaseRules: [
        {
          title: {
            value: { value: 1, label: PurchaseRuleTypes.MinAskingPrice },
            validationResult: ValidatorTypes.Valid,
          },
          property: { value: { value: 1, label: 'house' }, validationResult: ValidatorTypes.Valid },
          range: { value: 8, validationResult: ValidatorTypes.Valid },
        },
      ],
      holdRules: [
        {
          title: {
            value: { value: 1, label: HoldRuleTypes.MinSellIfHighEquityPercent },
            validationResult: ValidatorTypes.Valid,
          },
          property: { value: { value: 0, label: 'apartment' }, validationResult: ValidatorTypes.Valid },
          range: { value: 18, validationResult: ValidatorTypes.Valid },
        },
      ],
      savedAtStart: { value: 1, validationResult: ValidatorTypes.Valid },
      moSavings: { value: 2, validationResult: ValidatorTypes.Valid },
      goal: { value: 3, validationResult: ValidatorTypes.Valid },
    };

    render(<RawResults userInfo={userInfo} />);
  });

  describe('RawResults unit tests', () => {
    test('should render', () => {
      const entity = screen.getByRole<HTMLDivElement>('raw-results');

      const expectedStyle = `
        width: 100%;
        display: flex;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});
