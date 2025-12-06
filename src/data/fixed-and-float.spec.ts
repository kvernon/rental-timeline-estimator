import { fixedAndFloat } from './fixed-and-float';

describe('fixedAndFloat', () => {
  describe('when 1', () => {
    test('should be 1', () => {
      expect(fixedAndFloat(1)).toBe(1);
    });
  });

  describe('when 1.005', () => {
    test('should be 1', () => {
      expect(fixedAndFloat(1.005)).toEqual(1);
    });
  });

  describe('when 1.055', () => {
    test('should be 1.05', () => {
      expect(fixedAndFloat(1.055)).toEqual(1.05);
    });
  });

  describe('when 1.099', () => {
    test('should be 1.1', () => {
      expect(fixedAndFloat(1.099)).toEqual(1.1);
    });
  });

  test('uses provided precision', () => {
    expect(fixedAndFloat(Math.PI, 3)).toBeCloseTo(3.142, 3);
    expect(fixedAndFloat(2.71828, 4)).toBeCloseTo(2.7183, 4);
  });
});
