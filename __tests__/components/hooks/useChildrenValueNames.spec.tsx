import { renderHook } from '@testing-library/react';
import { useChildrenValueNames } from '../../../src/components/hooks/useChildrenValueNames';

jest.mock('react', () => {
  const requireActual = jest.requireActual('react');
  return {
    ...requireActual,
    useEffect: jest.spyOn(requireActual, 'useEffect'),
    useState: jest.spyOn(requireActual, 'useState'),
  };
});

describe('useChildrenValueNames unit tests', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('and no children array', () => {
    test('should get the children results', async () => {
      const { result } = renderHook(() => useChildrenValueNames([]));

      expect(result.current).toEqual(expect.arrayContaining([[]]));
    });
  });
  describe('and children array', () => {
    describe('and translateFieldValidatorResult', () => {
      test('should get the children results', async () => {
        const { result } = renderHook(() =>
          useChildrenValueNames(
            [
              { id: 'One', type: 'RangeFieldValidator' },
              { id: 'Two', type: 'RangeFieldValidator' },
            ],
            'validationResult',
          ),
        );

        expect(result.current).toEqual(
          expect.arrayContaining([['rangeFieldValidatorOne.validationResult', 'rangeFieldValidatorTwo.validationResult']]),
        );
      });
    });
    describe('and translateRangeFieldValidatorValue', () => {
      test('should get the children results', async () => {
        const { result } = renderHook(() =>
          useChildrenValueNames(
            [
              { id: 'One', type: 'RangeFieldValidator' },
              { id: 'Two', type: 'RangeFieldValidator' },
            ],
            'value',
          ),
        );

        expect(result.current).toEqual(expect.arrayContaining([['rangeFieldValidatorOne.value', 'rangeFieldValidatorTwo.value']]));
      });
    });

    describe('and default', () => {
      test('should get the children results', async () => {
        const { result } = renderHook(() =>
          useChildrenValueNames([
            { id: 'One', type: 'FieldValidator' },
            { id: 'Two', type: 'FieldValidator' },
          ]),
        );

        expect(result.current).toEqual(expect.arrayContaining([['One.validationResult', 'Two.validationResult']]));
      });
    });
  });
});
