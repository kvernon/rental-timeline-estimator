import { renderHook } from '@testing-library/react';
import { useWatcher } from './useWatcher';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FieldValues, watchMock, WatchObserver } from 'react-hook-form';
import { ValidatorTypes } from '../validators/ValidatorTypes';

jest.mock('react', () => {
  const requireActual = jest.requireActual('react');
  return {
    ...requireActual,
    useEffect: jest.spyOn(requireActual, 'useEffect'),
    useState: jest.spyOn(requireActual, 'useState'),
  };
});

jest.mock('react-hook-form', () => {
  const watchMock: jest.Mock = jest.fn();
  return {
    useFormContext: jest.fn().mockReturnValue({
      watch: watchMock,
    }),
    watchMock,
  };
});

describe('useWatcher unit tests', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('and no children array', () => {
    test('should get the children results', async () => {
      watchMock.mockImplementation(() => {
        return { unsubscribe: jest.fn() };
      });

      const { result } = renderHook(() => useWatcher<ValidatorTypes>([]));

      expect(result.current).toEqual(expect.arrayContaining([[], expect.any(Function)]));
    });
  });
  describe('and children array', () => {
    test('should get the children results', async () => {
      const argument = {
        'rangeFieldValidatorOne.validationResult': ValidatorTypes.Invalid,
      };

      watchMock.mockImplementationOnce((callback: WatchObserver<FieldValues>) => {
        callback(argument, {
          name: 'rangeFieldValidatorOne.validationResult',
          type: 'blur',
        });

        return { unsubscribe: jest.fn() };
      });

      const { result } = renderHook(() => useWatcher<ValidatorTypes>(['rangeFieldValidatorOne.validationResult']));

      expect(result.current).toEqual(expect.arrayContaining([[ValidatorTypes.Invalid], expect.any(Function)]));
    });
  });
});
