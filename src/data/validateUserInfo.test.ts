import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { getValidationResult } from '../components/rules/getValidationResult';
import { validateUserInfo } from './validateUserInfo';

jest.mock('../components/rules/getValidationResult');

describe('validateUserInfo unit tests', () => {
  describe('and required', () => {
    describe('and all data invalid', () => {
      test('should be should be Invalid', () => {
        const userInfo = {
          goal: { validationResult: ValidatorTypes.Invalid, value: undefined },
          moSavings: { validationResult: ValidatorTypes.Optional, value: undefined },
          savedAtStart: { validationResult: ValidatorTypes.Valid, value: undefined },
          holdRules: [
            {
              title: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
              property: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Optional },
              range: { value: undefined, validationResult: ValidatorTypes.Invalid },
            },
          ],
          purchaseRules: [
            {
              title: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Optional },
              property: { value: { value: 0, label: '' }, validationResult: ValidatorTypes.Valid },
              range: { value: undefined, validationResult: ValidatorTypes.Invalid },
            },
          ],
        };

        validateUserInfo(false, userInfo);

        expect(jest.mocked(getValidationResult)).toHaveBeenCalledWith(
          [
            userInfo.purchaseRules[0].property.validationResult,
            userInfo.purchaseRules[0].range.validationResult,
            userInfo.purchaseRules[0].title.validationResult,
            userInfo.holdRules[0].property.validationResult,
            userInfo.holdRules[0].range.validationResult,
            userInfo.holdRules[0].title.validationResult,
            userInfo.moSavings.validationResult,
            userInfo.goal.validationResult,
            userInfo.savedAtStart.validationResult,
          ],
          false,
        );
      });
    });
  });
});
