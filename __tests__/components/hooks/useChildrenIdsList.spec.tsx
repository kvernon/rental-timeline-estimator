import { renderHook } from '@testing-library/react';
import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import React from 'react';
import { useChildrenIdsList } from '../../../src/components/hooks/useChildrenIdsList';

jest.mock('react', () => {
  const requireActual = jest.requireActual('react');
  return {
    ...requireActual,
    useEffect: jest.spyOn(requireActual, 'useEffect'),
    useState: jest.spyOn(requireActual, 'useState'),
  };
});

describe('useChildrenIdsList unit tests', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('and no children array', () => {
    test('should get the children results', async () => {
      const { result } = renderHook(() => useChildrenIdsList([]));

      expect(result.current).toEqual(expect.arrayContaining([[]]));
    });
  });
  describe('and children array', () => {
    test('should get the children results', async () => {
      const { result } = renderHook(() =>
        useChildrenIdsList([
          <RangeFieldValidator id="One" validationType={ValidatorStackTypes.Required} />,
          <RangeFieldValidator id="Two" validationType={ValidatorStackTypes.Optional} />,
        ]),
      );

      expect(result.current).toEqual(
        expect.arrayContaining([
          [
            { id: 'One', type: 'RangeFieldValidator' },
            { id: 'Two', type: 'RangeFieldValidator' },
          ],
        ]),
      );
    });
  });
});
