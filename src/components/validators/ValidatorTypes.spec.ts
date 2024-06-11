import { ValidatorTypes } from './ValidatorTypes';

describe('ValidatorTypes unit tests', () => {
  describe('and Invalid', () => {
    test('should be equal 0', () => {
      expect(ValidatorTypes.Invalid).toEqual(0);
    });
    describe('and Valid', () => {
      test('should be equal 1', () => {
        expect(ValidatorTypes.Valid).toEqual(1);
      });
    });
    describe('and Optional', () => {
      test('should be equal 2', () => {
        expect(ValidatorTypes.Optional).toEqual(2);
      });
    });
  });
});
