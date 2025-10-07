import { IUserInfo } from './data/IUserInfo';
import { IPropertiesInformationPropsEvent } from './views/IPropertiesInformationProps';
import { ValidatorTypes } from './components/validators/ValidatorTypes';
import { propertyOptions } from './components/validators/PropertyDropDownValidator';
import { IRuleStackEntity } from './components/rules/IRuleStackEntity';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';
import { purchaseConfig } from './rules/purchaseRuleConfig';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConditionalNumber, ConditionEventResult } from './components/validators/IRangeFieldValidatorEvent';
import { IRuleValues } from './components/rules/IRuleValues';
import { IEventResult } from './components/validators/IEventResult';
import { ISelectOption } from './components/core/ISelectOption';
import { IPropertyInformationParams } from './components/validators/IPropertyInformationParams';

const choices: {
  purchaseRules: IRuleStackEntity[];
  holdRules: IRuleStackEntity[];
} = {
  holdRules: getRuleChoices(holdConfig.collection),
  purchaseRules: getRuleChoices(purchaseConfig.collection),
};

interface IWizardFormData {
  userInfo: IUserInfo;
  propertiesInfo: IPropertiesInformationPropsEvent;
}

const initialState: IWizardFormData = {
  userInfo: {
    goal: { value: 5000, validationResult: ValidatorTypes.Valid },
    savedAtStart: { value: 70000, validationResult: ValidatorTypes.Valid },
    moSavings: { value: 3000, validationResult: ValidatorTypes.Valid },
    purchaseRules: [
      {
        title: {
          value: { value: 0, label: choices.purchaseRules[0].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 3600,
          validationResult: ValidatorTypes.Valid,
        },
      },
      {
        title: {
          value: { value: 3, label: choices.purchaseRules[3].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 60000,
          validationResult: ValidatorTypes.Valid,
        },
      },
    ],
    holdRules: [
      {
        title: {
          value: { value: 2, label: choices.holdRules[2].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 1,
          validationResult: ValidatorTypes.Valid,
        },
      },
      {
        title: {
          value: { value: 3, label: choices.holdRules[3].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 25,
          validationResult: ValidatorTypes.Valid,
        },
      },
    ],
  },
  propertiesInfo: {
    house: {
      title: 'Home',
      propertyType: PropertyType.SingleFamily,
      lowestPurchasePrice: { value: 150000, validationResult: ValidatorTypes.Valid },
      highestPurchasePrice: { value: 200000, validationResult: ValidatorTypes.Valid },
      lowestCashFlow: { value: 200, validationResult: ValidatorTypes.Valid },
      highestCashFlow: { value: 500, validationResult: ValidatorTypes.Valid },
      lowestEquityCapturePercent: { value: 40, validationResult: ValidatorTypes.Valid },
      highestEquityCapturePercent: { value: 85, validationResult: ValidatorTypes.Valid },
      lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
      highestGenerationAmount: { value: 6, validationResult: ValidatorTypes.Valid },
      lowestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
      highestMinSellInYears: { value: 5, validationResult: ValidatorTypes.Valid },
      lowestAppreciationValue: { value: 10, validationResult: ValidatorTypes.Valid },
      highestAppreciationValue: { value: 30, validationResult: ValidatorTypes.Valid },
    },
    apartment: {
      title: 'Apartment',
      propertyType: PropertyType.PassiveApartment,
      lowestPurchasePrice: { value: 25000, validationResult: ValidatorTypes.Valid },
      highestPurchasePrice: { value: 500000, validationResult: ValidatorTypes.Valid },
      lowestCashFlow: { value: 200, validationResult: ValidatorTypes.Valid },
      highestCashFlow: { value: 500, validationResult: ValidatorTypes.Valid },
      lowestEquityCapturePercent: { value: 5, validationResult: ValidatorTypes.Valid },
      highestEquityCapturePercent: { value: 7, validationResult: ValidatorTypes.Valid },
      lowestGenerationAmount: { value: 0, validationResult: ValidatorTypes.Valid },
      highestGenerationAmount: { value: 7, validationResult: ValidatorTypes.Valid },
      lowestMinSellInYears: { value: 5, validationResult: ValidatorTypes.Valid },
      highestMinSellInYears: { value: 8, validationResult: ValidatorTypes.Valid },
      lowestAppreciationValue: { value: 50, validationResult: ValidatorTypes.Valid },
      highestAppreciationValue: { value: 100, validationResult: ValidatorTypes.Valid },
    },
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateRangeUserInfo(
      state,
      action: PayloadAction<{
        key: Exclude<keyof IUserInfo, 'purchaseRules' | 'holdRules'>;
        value: ConditionEventResult<true, ConditionalNumber<true>>;
      }>,
    ) {
      state.userInfo[action.payload.key] = action.payload.value;
    },
    updateRuleUserInfo(
      state,
      action: PayloadAction<{
        key: Exclude<keyof IUserInfo, 'goal' | 'savedAtStart' | 'moSavings'>;
        value: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
      }>,
    ) {
      if (!action.payload.value) {
        const key = action.payload.key;
        state.userInfo[key] = action.payload.value;
      }
    },
    updatePropertiesInfo(state, action: PayloadAction<{ key: keyof IPropertiesInformationPropsEvent; value: IPropertyInformationParams }>) {
      state.propertiesInfo[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateRangeUserInfo, updatePropertiesInfo, updateRuleUserInfo } = formSlice.actions;
export default formSlice.reducer;
