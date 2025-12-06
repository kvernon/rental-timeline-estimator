/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
