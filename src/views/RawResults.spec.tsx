import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { RawResults } from './RawResults';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { HoldRuleTypes, ITimeline, IUser, PropertyType, PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';
import { generate } from '../data/generate';
import { IUserInfo } from '../data/IUserInfo';

jest.mock('../data/generate');
jest.mock('./UserSummary');

describe('RawResults unit tests', () => {
  beforeEach(() => {
    const userMock = {
      metMonthlyGoal: jest.fn(),
    } as unknown as jest.Mocked<IUser>;

    jest.mocked(generate).mockReturnValue({
      getEstimatedMonthlyCashFlow: jest.fn(),
      endDate: new Date(),
      startDate: new Date(),
      rentals: [],
      getBalance: jest.fn(),
      clone: jest.fn(),
      user: userMock,
    } as jest.Mocked<ITimeline>);

    const userInfo: IUserInfo = {
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

    render(
      <RawResults
        userInfo={userInfo}
        propertiesInfo={{
          house: {
            propertyType: PropertyType.SingleFamily,
            highestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
            highestCashFlow: { value: 1, validationResult: ValidatorTypes.Valid },
            highestEquityCapturePercent: { value: 1, validationResult: ValidatorTypes.Valid },
            highestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestCashFlow: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestEquityCapturePercent: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
            highestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestAppreciationValue: { value: 1, validationResult: ValidatorTypes.Valid },
            highestAppreciationValue: { value: 1, validationResult: ValidatorTypes.Valid },
            title: 'title',
          },
          apartment: {
            propertyType: PropertyType.SingleFamily,
            highestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
            highestCashFlow: { value: 1, validationResult: ValidatorTypes.Valid },
            highestEquityCapturePercent: { value: 1, validationResult: ValidatorTypes.Valid },
            highestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestCashFlow: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestEquityCapturePercent: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
            highestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
            lowestAppreciationValue: { value: 1, validationResult: ValidatorTypes.Valid },
            highestAppreciationValue: { value: 1, validationResult: ValidatorTypes.Valid },
            title: 'title',
          },
        }}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
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
