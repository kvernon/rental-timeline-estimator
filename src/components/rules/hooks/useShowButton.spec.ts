import { useShowButton } from './useShowButton';
import { getRemainingValues } from './getRemainingValues';
import { ValidatorTypes } from '../../validators/ValidatorTypes';
import { IRuleStackEntity } from '../IRuleStackEntity';
import { IRuleValues } from '../IRuleValues';
import { IEventResult } from '../../validators/IEventResult';
import { ISelectOption } from '../../core/ISelectOption';

jest.mock('./getRemainingValues');

describe('useShowButton unit tests', () => {
  const mockGetRemainingValues = jest.mocked(getRemainingValues);

  const dummyChoices: IRuleStackEntity[] = [
    { ruleTitle: 'Rule 1', property: 1 },
    { ruleTitle: 'Rule 2', property: 2 },
  ];

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

  describe('showButton logic', () => {
    it('should be true when there are remaining non-disabled values', () => {
      mockGetRemainingValues.mockReturnValue([
        { ruleTitle: 'Rule 1', property: 1, isDisabled: false },
        { ruleTitle: 'Rule 2', property: 2, isDisabled: true },
      ]);

      const result = useShowButton(dummyChoices, []);

      expect(result).toBe(true);
    });

    it('should be false when all remaining values are disabled', () => {
      mockGetRemainingValues.mockReturnValue([
        { ruleTitle: 'Rule 1', property: 1, isDisabled: true },
        { ruleTitle: 'Rule 2', property: 2, isDisabled: true },
      ]);

      const result = useShowButton(dummyChoices, []);

      expect(result).toBe(false);
    });

    it('should be false when no values remain', () => {
      mockGetRemainingValues.mockReturnValue([]);

      const result = useShowButton(dummyChoices, []);

      expect(result).toBe(false);
    });

    it('should call getRemainingValues with correctly mapped arguments', () => {
      mockGetRemainingValues.mockReturnValue([]);
      const values = [createRuleValue()];

      useShowButton(dummyChoices, values);

      expect(mockGetRemainingValues).toHaveBeenCalledWith(
        dummyChoices,
        expect.arrayContaining([
          expect.objectContaining({
            title: values[0].title,
            property: values[0].property,
          }),
        ]),
      );
    });
  });
});
