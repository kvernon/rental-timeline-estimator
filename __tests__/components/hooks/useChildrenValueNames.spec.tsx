import { renderHook } from '@testing-library/react';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import {
  translateFieldValidatorResult,
  translateRangeFieldValidatorValue,
  useChildrenValueNames,
} from '../../../src/components/hooks/useChildrenValueNames';

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
              { id: 'One', validationType: ValidatorStackTypes.Required },
              { id: 'Two', validationType: ValidatorStackTypes.Optional },
            ],
            translateFieldValidatorResult,
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
              { id: 'One', validationType: ValidatorStackTypes.Required },
              { id: 'Two', validationType: ValidatorStackTypes.Optional },
            ],
            translateRangeFieldValidatorValue,
          ),
        );

        expect(result.current).toEqual(expect.arrayContaining([['rangeFieldValidatorOne.value', 'rangeFieldValidatorTwo.value']]));
      });
    });

    describe('and default', () => {
      test('should get the children results', async () => {
        const { result } = renderHook(() =>
          useChildrenValueNames([
            { id: 'One', validationType: ValidatorStackTypes.Required },
            { id: 'Two', validationType: ValidatorStackTypes.Optional },
          ]),
        );

        expect(result.current).toEqual(expect.arrayContaining([['One', 'Two']]));
      });
    });
  });
});
