import { getFields } from '../../src/rules/getFields';
import { HoldRuleTypes, PurchaseRuleTypes } from '@cubedelement.com/realty-investor-timeline';

jest.mock('../../src/rules/getPrettyName', () => ({
  getPrettyName: jest.fn(),
}));

import { getPrettyName } from '../../src/rules/getPrettyName';
import { ValidatorTypes } from '../../src/components/validators/ValidatorTypes';

describe('getFields unit tests', () => {
  describe('and success', () => {
    describe('and empty', () => {
      test('should return empty', () => {
        expect(getFields([])).toEqual([]);
      });
    });

    describe('and populated with None', () => {
      test('should return empty', () => {
        expect(
          getFields([
            {
              min: 0,
              max: 1,
              prefix: '#',
              suffix: '!',
              ruleType: PurchaseRuleTypes.None,
            },
          ]),
        ).toEqual([]);
      });
    });

    describe('and not populated with None', () => {
      describe('and with 1', () => {
        test('should return populated with 1', () => {
          const expectedLabel = 'Big Thing';
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          getPrettyName.mockReturnValueOnce(expectedLabel);

          const entity = {
            min: 0,
            max: 1,
            prefix: '#',
            suffix: '!',
            ruleType: PurchaseRuleTypes.MinAfterRepairPrice,
          };

          expect(getFields([entity])).toEqual([
            {
              rangeFieldValidator: {
                validationResult: ValidatorTypes.Optional,
                value: entity.min,
              },
              titleDropDown: {
                validationResult: ValidatorTypes.Optional,
                value: {
                  label: expectedLabel,
                  value: 1,
                },
              },
            },
          ]);
        });
      });
      describe('and with multiple', () => {
        test('should return populated with same', () => {
          const expectedLabelPurchase = 'Big Thing Purchase';
          const expectedLabelHold = 'Big Thing Hold';
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          getPrettyName.mockReturnValueOnce(expectedLabelPurchase);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          getPrettyName.mockReturnValueOnce(expectedLabelHold);

          const entityPurchase = {
            min: 0,
            max: 1,
            prefix: '#',
            suffix: '!',
            ruleType: PurchaseRuleTypes.MinAfterRepairPrice,
          };
          const entityHold = {
            min: 10,
            max: 11,
            prefix: '#',
            suffix: '!',
            ruleType: HoldRuleTypes.MinSellIfHighEquityPercent,
          };

          expect(getFields([entityPurchase, entityHold])).toEqual([
            {
              rangeFieldValidator: {
                validationResult: ValidatorTypes.Optional,
                value: entityPurchase.min,
              },
              titleDropDown: {
                validationResult: ValidatorTypes.Optional,
                value: {
                  label: expectedLabelPurchase,
                  value: 1,
                },
              },
            },
            {
              rangeFieldValidator: {
                validationResult: ValidatorTypes.Optional,
                value: entityHold.min,
              },
              titleDropDown: {
                validationResult: ValidatorTypes.Optional,
                value: {
                  label: expectedLabelHold,
                  value: 2,
                },
              },
            },
          ]);
        });
      });
    });
  });
});
