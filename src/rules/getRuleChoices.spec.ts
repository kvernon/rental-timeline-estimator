import { getRuleChoices } from './getRuleChoices';

jest.mock('./getPrettyName', () => ({
  getPrettyName: jest.fn(),
}));

import { getPrettyName } from './getPrettyName';

describe('getRuleChoices unit tests', () => {
  describe('and success', () => {
    test('should be empty', () => {
      expect(getRuleChoices([])).toEqual([]);
    });
    test('should serialize', () => {
      const expectedLabelPurchase = 'Big Thing Purchase';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getPrettyName.mockReturnValueOnce(expectedLabelPurchase);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getPrettyName.mockReturnValueOnce(expectedLabelPurchase);

      expect(
        getRuleChoices([
          {
            propertyType: 0,
            min: 0,
            max: 1,
            prefix: 'prefix',
            ruleType: 'Foo',
            suffix: 'suffix',
            rule: 'HoldRuleTypes',
          },
          {
            propertyType: 1,
            min: 0,
            max: 1,
            prefix: 'prefix',
            ruleType: 'Foo',
            suffix: 'suffix',
            rule: 'HoldRuleTypes',
          },
        ]),
      ).toEqual([
        {
          min: 0,
          max: 1,
          prefix: 'prefix',
          property: 0,
          ruleTitle: 'Big Thing Purchase',
          suffix: 'suffix',
          rule: 'HoldRuleTypes',
        },
        {
          min: 0,
          max: 1,
          prefix: 'prefix',
          property: 1,
          ruleTitle: 'Big Thing Purchase',
          suffix: 'suffix',
          rule: 'HoldRuleTypes',
        },
      ]);
    });
  });
});
