import { onChangeArray } from './onChangeArray';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { IRuleValues } from './IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult } from '../validators/IEventResult';

describe('onChangeArray unit tests', () => {
  describe('and empty array', () => {
    test('should return empty array', () => {
      const actual = onChangeArray([], -1, -1);

      expect(actual).toEqual([]);
    });

    describe('and populated', () => {
      describe('and invalid oldMove', () => {
        test('should return same array', () => {
          const values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] = [
            {
              title: { validationResult: ValidatorTypes.Valid, value: { value: 1, label: 'one' } },
              property: { validationResult: ValidatorTypes.Valid, value: { value: 1, label: 'property' } },
              range: { validationResult: ValidatorTypes.Valid, value: 2 },
            },
          ];

          const actual = onChangeArray(values, -1, -1);

          expect(actual).toEqual(values);
        });
      });
      describe('and valid oldMove', () => {
        describe('and invalid newMove', () => {
          test('should return same array', () => {
            const values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] = [
              {
                title: { validationResult: ValidatorTypes.Valid, value: { value: 1, label: 'one' } },
                property: {
                  validationResult: ValidatorTypes.Valid,
                  value: { value: 1, label: 'property' },
                },
                range: { validationResult: ValidatorTypes.Valid, value: 2 },
              },
            ];

            const actual = onChangeArray(values, 0, -1);

            expect(actual).toEqual(values);
          });
        });
        describe('and valid newMove', () => {
          test('should return updated array', () => {
            const values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] = [
              {
                title: { validationResult: ValidatorTypes.Valid, value: { value: 1, label: 'one' } },
                property: {
                  validationResult: ValidatorTypes.Valid,
                  value: { value: 1, label: 'property' },
                },
                range: { validationResult: ValidatorTypes.Valid, value: 2 },
              },
              {
                title: { validationResult: ValidatorTypes.Valid, value: { value: 1, label: 'one' } },
                property: {
                  validationResult: ValidatorTypes.Valid,
                  value: { value: 1, label: 'property' },
                },
                range: { validationResult: ValidatorTypes.Valid, value: 2 },
              },
            ];

            const expected = [values[1], values[0]];

            const actual = onChangeArray(values, 0, 1);

            expect(actual).toEqual(expected);
          });
        });
      });
    });
  });
});
