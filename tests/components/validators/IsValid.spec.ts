import { IsValid, IsValidGood, IsValidBad, IsValidOption } from '../../../src/components/validators/IsValid';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';

describe('IsValid unit tests', () => {
  describe('and Optional supplied', () => {
    test('should be true', () => {
      expect(IsValid(ValidatorTypes.Optional)).toEqual({ title: 'Optional', color: IsValidOption });
    });
  });
  describe('and Valid supplied', () => {
    test('should be true', () => {
      expect(IsValid(ValidatorTypes.Valid)).toEqual({ title: 'Valid', color: IsValidGood });
    });
  });
  describe('and Invalid supplied', () => {
    test('should be false', () => {
      expect(IsValid(ValidatorTypes.Invalid)).toEqual({ title: 'Invalid', color: IsValidBad });
    });
  });
});
