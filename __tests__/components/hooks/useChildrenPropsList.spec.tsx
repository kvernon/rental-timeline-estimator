import { renderHook } from '@testing-library/react';
import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import React from 'react';
import { useChildrenPropsList } from '../../../src/components/hooks/useChildrenPropsList';

jest.mock('react', () => {
  const requireActual = jest.requireActual('react');
  return {
    ...requireActual,
    useEffect: jest.spyOn(requireActual, 'useEffect'),
    useState: jest.spyOn(requireActual, 'useState'),
  };
});

describe('useChildrenPropsList unit tests', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('and no children array', () => {
    test('should get the children results', async () => {
      const { result } = renderHook(() => useChildrenPropsList([]));

      expect(result.current).toEqual(
        expect.objectContaining({
          theChildrenProps: [],
        }),
      );
    });
  });
  describe('and children array', () => {
    test('should get the children results', async () => {
      const { result } = renderHook(() =>
        useChildrenPropsList([
          <RangeFieldValidator id="One" validationType={ValidatorStackTypes.Required} />,
          <RangeFieldValidator id="Two" validationType={ValidatorStackTypes.Optional} />,
        ]),
      );

      expect(result.current).toEqual(
        expect.objectContaining({
          theChildrenProps: [
            { id: 'One', validationType: ValidatorStackTypes.Required },
            { id: 'Two', validationType: ValidatorStackTypes.Optional },
          ],
        }),
      );
    });
  });
});
