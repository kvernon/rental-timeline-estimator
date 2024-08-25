import { HoldRuleTypes } from '@cubedelement.com/realty-investor-timeline';
import { getPrettyName } from '../rules/getPrettyName';
import { getHoldRuleType } from './getHoldRuleType';

describe('getHoldRuleType unit tests', () => {
  describe('and empty string', () => {
    test('should Be None', () => {
      expect(getHoldRuleType('')).toEqual(HoldRuleTypes.None);
    });
  });

  describe.each([HoldRuleTypes.MinSellIfHighEquityPercent, HoldRuleTypes.MinSellIfLowCashFlowPercent, HoldRuleTypes.MinSellInYears])(
    'and calling formatted',
    (holdRuleTypes: HoldRuleTypes) => {
      describe(`with ${getPrettyName(holdRuleTypes)}`, () => {
        test(`should Be HoldRuleTypes.${holdRuleTypes}`, () => {
          expect(getHoldRuleType(getPrettyName(holdRuleTypes))).toEqual(holdRuleTypes);
        });
      });
    },
  );
});
