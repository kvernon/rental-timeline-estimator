import reducer, { IWizardFormData, updateRangeUserInfo, updateRuleUserInfo, updatePropertiesInfo, updateSettings } from './formSlice';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { UnknownAction } from '@reduxjs/toolkit';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { IRuleValues } from '../components/rules/IRuleValues';

describe('formSlice reducer', () => {
  test('should return initial state on first run', () => {
    const state: IWizardFormData = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    expect(state).toBeDefined();
    // sanity check a couple of defaults
    expect(state.userInfo.goal.validationResult).toBe(ValidatorTypes.Valid);
    expect(state.propertiesInfo.house.propertyType).toBe(PropertyType.SingleFamily);
  });

  test('updateRangeUserInfo updates a numeric field', () => {
    const base = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    const next = reducer(base, updateRangeUserInfo({ key: 'goal', value: { value: 1234, validationResult: ValidatorTypes.Valid } }));
    expect(next.userInfo.goal.value).toBe(1234);
  });

  test('updateRuleUserInfo replaces rules when provided', () => {
    const base = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    const rules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] = [
      {
        title: { value: { value: 0, label: 'X' }, validationResult: ValidatorTypes.Valid },
        property: { value: { value: PropertyType.SingleFamily, label: 'Single Family' }, validationResult: ValidatorTypes.Valid },
        range: { value: 10, validationResult: ValidatorTypes.Valid },
      },
    ];
    const next = reducer(base, updateRuleUserInfo({ key: 'purchaseRules', value: rules }));
    expect(next.userInfo.purchaseRules).toHaveLength(1);
    expect(next.userInfo.purchaseRules[0].range.value).toBe(10);
  });

  test('updatePropertiesInfo updates property info section', () => {
    const base = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    const next = reducer(
      base,
      updatePropertiesInfo({
        key: 'house',
        value: {
          title: 'Home',
          propertyType: PropertyType.SingleFamily,
          lowestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
          highestPurchasePrice: { value: 2, validationResult: ValidatorTypes.Valid },
          lowestCashFlow: { value: 3, validationResult: ValidatorTypes.Valid },
          highestCashFlow: { value: 4, validationResult: ValidatorTypes.Valid },
          lowestEquityCapturePercent: { value: 5, validationResult: ValidatorTypes.Valid },
          highestEquityCapturePercent: { value: 6, validationResult: ValidatorTypes.Valid },
          lowestGenerationAmount: { value: 7, validationResult: ValidatorTypes.Valid },
          highestGenerationAmount: { value: 8, validationResult: ValidatorTypes.Valid },
          lowestMinSellInYears: { value: 9, validationResult: ValidatorTypes.Valid },
          highestMinSellInYears: { value: 10, validationResult: ValidatorTypes.Valid },
          lowestAppreciationValue: { value: 11, validationResult: ValidatorTypes.Valid },
          highestAppreciationValue: { value: 12, validationResult: ValidatorTypes.Valid },
          maxMonthsToCache: { value: 30, validationResult: ValidatorTypes.Valid },
        },
      }),
    );
    expect(next.propertiesInfo.house.lowestPurchasePrice.value).toBe(1);
    expect(next.propertiesInfo.house.highestAppreciationValue.value).toBe(12);
  });

  test('updateSettings updates settings entry', () => {
    const base = reducer(undefined, { type: '@@INIT' } as UnknownAction);
    const next = reducer(base, updateSettings({ key: 'maxYears', value: { value: 33, validationResult: ValidatorTypes.Valid } }));
    expect(next.settings.maxYears.value).toBe(33);
  });
});
