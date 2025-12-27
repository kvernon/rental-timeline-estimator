import { getFormData, getRulesConfig } from './formSelector';
import { RootState } from './store';
import { IUserInfo } from '../data/IUserInfo';
import { IPropertiesInformationPropsEvent } from '../views/IPropertiesInformationProps';
import { ISettings } from '../data/ISettings';
import { IResult } from './timelineSlice';

describe('formSelector', () => {
  const baseState: RootState = {
    form: {
      rulesConfig: {
        purchaseRules: [{ ruleTitle: 'a', property: 1, rule: 'HoldRuleTypes' }],
        holdRules: [{ ruleTitle: 'b', property: 0, rule: 'HoldRuleTypes' }],
      },
      userInfo: {} as unknown as IUserInfo,
      propertiesInfo: {} as unknown as jest.Mocked<IPropertiesInformationPropsEvent>,
      settings: {} as unknown as jest.Mocked<ISettings>,
    },
    result: {} as jest.Mocked<IResult>,
  };

  test('getFormData returns the form slice', () => {
    expect(getFormData(baseState)).toBe(baseState.form);
  });

  test('getRulesConfig derives rulesConfig from form', () => {
    expect(getRulesConfig(baseState)).toEqual({
      purchaseRules: [{ ruleTitle: 'a', property: 1, rule: 'HoldRuleTypes' }],
      holdRules: [{ ruleTitle: 'b', property: 0, rule: 'HoldRuleTypes' }],
    });
  });
});
