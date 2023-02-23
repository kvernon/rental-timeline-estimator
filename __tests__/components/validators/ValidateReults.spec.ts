import { ValidateResults } from '../../../src/components/validators/ValidateResults';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';

describe('ValidateResults unit tests', () => {
  describe('and Optional', () => {
    describe('and no items supplied', () => {
      test('should be Optional', () => {
        expect(ValidateResults(ValidatorStackTypes.Optional)).toEqual(ValidatorTypes.Optional);
      });
    });
    describe('with result, and no items supplied', () => {
      test('should be Optional', () => {
        expect(ValidateResults(ValidatorStackTypes.Optional, [])).toEqual(ValidatorTypes.Optional);
      });
    });

    describe('and contains Invalid', () => {
      test('should be Invalid', () => {
        expect(ValidateResults(ValidatorStackTypes.Optional, [ValidatorTypes.Invalid])).toEqual(ValidatorTypes.Invalid);
      });
    });

    describe('and contains Valid', () => {
      test('should be Valid', () => {
        expect(ValidateResults(ValidatorStackTypes.Optional, [ValidatorTypes.Valid])).toEqual(ValidatorTypes.Valid);
      });
    });

    describe('and contains Optional', () => {
      test('should be Optional', () => {
        expect(ValidateResults(ValidatorStackTypes.Optional, [ValidatorTypes.Optional])).toEqual(ValidatorTypes.Optional);
      });
    });

    describe('and contains mixed', () => {
      test('should be Invalid', () => {
        expect(ValidateResults(ValidatorStackTypes.Optional, [ValidatorTypes.Valid, ValidatorTypes.Invalid])).toEqual(ValidatorTypes.Invalid);
      });
    });
  });

  describe('and Required', () => {
    describe('and no items supplied', () => {
      test('should be Optional', () => {
        expect(ValidateResults(ValidatorStackTypes.Required)).toEqual(ValidatorTypes.Invalid);
      });
    });
    describe('with result, and no items supplied', () => {
      test('should be Invalid', () => {
        expect(ValidateResults(ValidatorStackTypes.Required, [])).toEqual(ValidatorTypes.Invalid);
      });
    });

    describe('and contains Invalid', () => {
      test('should be Invalid', () => {
        expect(ValidateResults(ValidatorStackTypes.Required, [ValidatorTypes.Invalid])).toEqual(ValidatorTypes.Invalid);
      });
    });

    describe('and contains Valid', () => {
      test('should be Valid', () => {
        expect(ValidateResults(ValidatorStackTypes.Required, [ValidatorTypes.Valid])).toEqual(ValidatorTypes.Valid);
      });
    });

    describe('and contains Optional', () => {
      test('should be Optional', () => {
        expect(ValidateResults(ValidatorStackTypes.Required, [ValidatorTypes.Optional])).toEqual(ValidatorTypes.Invalid);
      });
    });

    describe('and contains mixed', () => {
      test('should be Invalid', () => {
        expect(ValidateResults(ValidatorStackTypes.Required, [ValidatorTypes.Valid, ValidatorTypes.Invalid])).toEqual(ValidatorTypes.Invalid);
      });
    });
  });
});
