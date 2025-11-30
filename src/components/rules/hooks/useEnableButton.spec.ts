import { useEnableButton } from './useEnableButton';
import { getValidationResult } from './getValidationResult';
import { ValidatorTypes } from '../../validators/ValidatorTypes';
import { IRuleValues } from '../IRuleValues';
import { IEventResult } from '../../validators/IEventResult';
import { ISelectOption } from '../../core/ISelectOption';

jest.mock('./getValidationResult');

describe('useEnableButton unit tests', () => {
  const mockGetValidationResult = jest.mocked(getValidationResult);

  const createRuleValue = (
    isValid: ValidatorTypes = ValidatorTypes.Valid,
  ): IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>> => ({
    title: { value: { label: 'Option', value: 1 }, validationResult: isValid },
    property: { value: { label: 'Prop', value: 1 }, validationResult: isValid },
    range: { value: 10, validationResult: isValid },
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('enableButton logic', () => {
    it('should be true when values list is empty', () => {
      const result = useEnableButton([]);

      expect(result).toBe(true);
      expect(mockGetValidationResult).not.toHaveBeenCalled();
    });

    it('should be true when validation returns Valid', () => {
      mockGetValidationResult.mockReturnValue(ValidatorTypes.Valid);

      const values = [createRuleValue()];
      const result = useEnableButton(values);

      expect(result).toBe(true);
    });

    it('should be false when validation returns Invalid', () => {
      mockGetValidationResult.mockReturnValue(ValidatorTypes.Invalid);

      const values = [createRuleValue()];
      const result = useEnableButton(values);

      expect(result).toBe(false);
    });

    it('should pass flattened validation results to getValidationResult', () => {
      mockGetValidationResult.mockReturnValue(ValidatorTypes.Valid);

      const val1 = createRuleValue(ValidatorTypes.Valid);
      const val2 = createRuleValue(ValidatorTypes.Valid);
      const values = [val1, val2];

      useEnableButton(values);

      // Each rule value has 3 properties (title, property, range), so 2 items * 3 props = 6 validation results
      const expectedValidationResults = [
        val1.title.validationResult,
        val1.property.validationResult,
        val1.range.validationResult,
        val2.title.validationResult,
        val2.property.validationResult,
        val2.range.validationResult,
      ];

      expect(mockGetValidationResult).toHaveBeenCalledWith(expect.arrayContaining(expectedValidationResults), true);
    });
  });
});
