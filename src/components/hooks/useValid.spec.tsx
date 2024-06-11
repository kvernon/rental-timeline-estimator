import { renderHook } from '@testing-library/react';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { useValid } from './useValid';
import { ValidatorTypes } from '../validators/ValidatorTypes';

jest.mock('react', () => {
  const requireActual = jest.requireActual('react');
  return {
    ...requireActual,
    useEffect: jest.spyOn(requireActual, 'useEffect'),
    useState: jest.spyOn(requireActual, 'useState'),
  };
});

describe('useValid unit tests', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('and no type supplied', () => {
    test('should get the children results', async () => {
      const { result } = renderHook(() => useValid());

      expect(result.current).toEqual(expect.arrayContaining([ValidatorTypes.Optional]));
    });
  });

  describe('and type Optional supplied', () => {
    test('should get the Optional results', async () => {
      const { result } = renderHook(() => useValid(ValidatorStackTypes.Optional));

      expect(result.current).toEqual(expect.arrayContaining([ValidatorTypes.Optional]));
    });
  });

  describe('and type Required supplied', () => {
    test('should get the Invalid result', async () => {
      const { result } = renderHook(() => useValid(ValidatorStackTypes.Required));

      expect(result.current).toEqual(expect.arrayContaining([ValidatorTypes.Invalid]));
    });
  });
});
