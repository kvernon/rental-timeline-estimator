import { validateUserInfo } from './validateUserInfo';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import type { IUserInfo } from './IUserInfo';

// Mock getValidationResult to control outcomes and inspect inputs
jest.mock('../components/rules/hooks/getValidationResult', () => ({
  getValidationResult: jest.fn((values: number[], required: boolean) => {
    // simple heuristic for test: if any Invalid present and required, return Invalid else Valid
    return required && values.includes(ValidatorTypes.Invalid) ? ValidatorTypes.Invalid : ValidatorTypes.Valid;
  }),
}));

describe('validateUserInfo', () => {
  const baseUserInfo = (): IUserInfo => ({
    goal: { value: 100, validationResult: ValidatorTypes.Valid },
    savedAtStart: { value: 1000, validationResult: ValidatorTypes.Valid },
    moSavings: { value: 100, validationResult: ValidatorTypes.Valid },
    purchaseRules: [
      {
        title: { value: { value: 0, label: 'Buy Every Years' }, validationResult: ValidatorTypes.Valid },
        property: { value: { value: 1, label: 'Single Family' }, validationResult: ValidatorTypes.Valid },
        range: { value: 1, validationResult: ValidatorTypes.Valid },
      },
    ],
    holdRules: [
      {
        title: { value: { value: 0, label: 'Sell In Years' }, validationResult: ValidatorTypes.Valid },
        property: { value: { value: 1, label: 'Single Family' }, validationResult: ValidatorTypes.Valid },
        range: { value: 1, validationResult: ValidatorTypes.Valid },
      },
    ],
  });

  test('returns Valid when all validations are valid', () => {
    const result = validateUserInfo(true, baseUserInfo());
    expect(result).toBe(ValidatorTypes.Valid);
  });

  test('returns Invalid when any validation is invalid and required', () => {
    const u = baseUserInfo();
    u.goal.validationResult = ValidatorTypes.Invalid;
    const result = validateUserInfo(true, u);
    expect(result).toBe(ValidatorTypes.Invalid);
  });

  test('returns Valid when invalid present but required is false', () => {
    const u = baseUserInfo();
    u.moSavings.validationResult = ValidatorTypes.Invalid;
    const result = validateUserInfo(false, u);
    expect(result).toBe(ValidatorTypes.Valid);
  });
});
