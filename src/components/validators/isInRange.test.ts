import { isInRange } from './isInRange';
import { ValidatorTypes } from './ValidatorTypes';

describe('isInRange unit tests', () => {
  describe('with default options', () => {
    describe('and value less than min', () => {
      test('should be Invalid', () => {
        expect(isInRange(-1, {})).toEqual(ValidatorTypes.Invalid);
      });
    });
    describe('and value within range', () => {
      test('should be Valid', () => {
        expect(isInRange(50, {})).toEqual(ValidatorTypes.Valid);
      });
    });
    describe('and value grater than max', () => {
      test('should be Invalid', () => {
        expect(isInRange(101, {})).toEqual(ValidatorTypes.Invalid);
      });
    });
  });
  describe('with options supplied', () => {
    let options: { min: number; max: number };
    beforeEach(() => {
      options = { min: 1, max: 5 };
    });
    describe('and value less than min', () => {
      test('should be Invalid', () => {
        expect(isInRange(options.min - 1, options)).toEqual(ValidatorTypes.Invalid);
      });
    });
    describe('and value within range', () => {
      test('should be Valid', () => {
        expect(isInRange(options.min + 1, options)).toEqual(ValidatorTypes.Valid);
      });
    });
    describe('and value grater than max', () => {
      test('should be Invalid', () => {
        expect(isInRange(options.max + 1, options)).toEqual(ValidatorTypes.Invalid);
      });
    });
  });
});
