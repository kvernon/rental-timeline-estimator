import { PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';
import { getPrettyName } from '../rules/getPrettyName';
import { getPurchaseRuleType } from './getPurchaseRuleType';

describe('getPurchaseRuleType unit tests', () => {
  describe('and empty string', () => {
    test('should Be None', () => {
      expect(getPurchaseRuleType('')).toEqual(PurchaseRuleTypes.None);
    });
  });

  describe.each([
    PurchaseRuleTypes.MinAfterRepairPrice,
    PurchaseRuleTypes.MinAskingPrice,
    PurchaseRuleTypes.MaxEstimatedOutOfPocket,
    PurchaseRuleTypes.MinEstimatedAnnualCashFlow,
    PurchaseRuleTypes.MinEstimatedCashOnCashPercent,
    PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
  ])('and calling formatted', (purchaseType: PurchaseRuleTypes) => {
    describe(`with ${getPrettyName(purchaseType)}`, () => {
      test(`should Be PurchaseRuleTypes.${purchaseType}`, () => {
        expect(getPurchaseRuleType(getPrettyName(purchaseType))).toEqual(purchaseType);
      });
    });
  });
});
