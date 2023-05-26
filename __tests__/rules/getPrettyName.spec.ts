import { getPrettyName } from '../../src/rules/getPrettyName';

describe('getPrettyName unit tests', () => {
  describe('and empty', () => {
    test('should be empty', () => {
      expect(getPrettyName('')).toEqual('');
    });
  });

  describe('and single word', () => {
    test('should translate with 1 upper', () => {
      expect(getPrettyName('something')).toEqual('Something');
    });
  });

  describe('and multiple words', () => {
    test('should translate', () => {
      expect(getPrettyName('somethingIsSpecial')).toEqual('Something Is Special');
    });
  });
});
