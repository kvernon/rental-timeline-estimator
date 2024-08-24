import { Typography } from './Typography';
import { FontGroups } from './fontGroups';
import { FontInformation } from './fontInformation';

describe('Typography unit tests', () => {
  let instance: Typography;

  beforeEach(() => {
    instance = new Typography();
  });

  describe('and parent', () => {
    test('should get info', () => {
      expect(instance.parent).toEqual({
        color: '#FFFFFF',
        font: 'Arial',
        letterSpacing: undefined,
        lineHeight: '1.4375em',
        size: '80pt',
        textShadow: undefined,
        weight: 'normal',
      });
    });
  });
  describe('and get for existing', () => {
    test('should receive', () => {
      const expected = new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '14pt',
        color: '#ffffff',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '1em',
      });
      instance.set(FontGroups.panelTitle, expected);

      expect(instance.get(FontGroups.panelTitle)).toEqual(expected);
    });
  });

  describe('and get not existing', () => {
    test('should receive parent', () => {
      expect(instance.get(FontGroups.input)).toEqual({
        color: '#FFFFFF',
        font: 'Arial',
        letterSpacing: undefined,
        lineHeight: '1.4375em',
        size: '80pt',
        textShadow: undefined,
        weight: 'normal',
      });
    });
  });
});
