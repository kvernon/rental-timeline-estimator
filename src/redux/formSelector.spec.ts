import { getFormData, getRulesConfig } from './formSelector';

describe('formSelector', () => {
  const baseState: any = {
    form: {
      rulesConfig: { purchaseRules: ['a'], holdRules: ['b'] },
    },
  };

  test('getFormData returns the form slice', () => {
    expect(getFormData(baseState)).toBe(baseState.form);
  });

  test('getRulesConfig derives rulesConfig from form', () => {
    expect(getRulesConfig(baseState)).toEqual({ purchaseRules: ['a'], holdRules: ['b'] });
  });
});
