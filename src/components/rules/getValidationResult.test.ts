import { getValidationResult } from './getValidationResult';
import { ValidatorTypes } from '../validators/ValidatorTypes';

describe('getValidationResult unit tests', () => {
  describe('and empty data', () => {
    describe('and not required', () => {
      test('should be Optional', () => {
        expect(getValidationResult([], false)).toEqual(ValidatorTypes.Optional);
      });
    });
    describe('and required', () => {
      test('should be Invalid', () => {
        expect(getValidationResult([], true)).toEqual(ValidatorTypes.Invalid);
      });
    });
  });

  describe('and data', () => {
    describe('and has Invalid', () => {
      describe('and not required', () => {
        test('should be Invalid', () => {
          expect(getValidationResult([ValidatorTypes.Invalid], false)).toEqual(ValidatorTypes.Invalid);
        });
      });

      describe('and required', () => {
        test('should be Invalid', () => {
          expect(getValidationResult([ValidatorTypes.Invalid], true)).toEqual(ValidatorTypes.Invalid);
        });
      });
    });

    describe('and has Optional', () => {
      describe('and not required', () => {
        test('should be Optional', () => {
          expect(getValidationResult([ValidatorTypes.Optional], false)).toEqual(ValidatorTypes.Optional);
        });
      });

      describe('and required', () => {
        test('should be Optional', () => {
          expect(getValidationResult([ValidatorTypes.Optional], true)).toEqual(ValidatorTypes.Invalid);
        });
      });
    });

    describe('and has Valid', () => {
      describe('and not required', () => {
        test('should be Optional', () => {
          expect(getValidationResult([ValidatorTypes.Valid], false)).toEqual(ValidatorTypes.Valid);
        });
      });

      describe('and required', () => {
        test('should be Optional', () => {
          expect(getValidationResult([ValidatorTypes.Valid], true)).toEqual(ValidatorTypes.Valid);
        });
      });
    });
  });
});
