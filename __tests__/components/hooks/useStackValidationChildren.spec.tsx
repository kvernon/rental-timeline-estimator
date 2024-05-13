import React from 'react';
import { renderHook } from '@testing-library/react';
import { RangeFieldValidatorState } from '../../../src/components/validators/RangeFieldValidatorState';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
import { useStackValidationChildren } from '../../../src/components/hooks/useStackValidationChildren';

import { useChildrenValueNames } from '../../../src/components/hooks/useChildrenValueNames';
import { useWatcher } from '../../../src/components/hooks/useWatcher';
import { useChildrenIdsList } from '../../../src/components/hooks/useChildrenIdsList';
import { useValid } from '../../../src/components/hooks/useValid';

jest.mock('../../../src/components/hooks/useChildrenValueNames');
jest.mock('../../../src/components/hooks/useWatcher');
jest.mock('../../../src/components/hooks/useChildrenIdsList');
jest.mock('../../../src/components/hooks/useValid');

jest.mock('react', () => {
  const requireActual = jest.requireActual('react');
  return {
    ...requireActual,
    useEffect: jest.spyOn(requireActual, 'useEffect'),
    useState: jest.spyOn(requireActual, 'useState'),
  };
});

describe('useStackValidationChildren has children unit tests', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const useValidMock = jest.mocked(useValid);
  const useChildrenValueNamesMock = jest.mocked(useChildrenValueNames);
  const useWatcherMock = jest.mocked(useWatcher);
  const useChildrenIdsListMock = jest.mocked(useChildrenIdsList);

  describe('and no children array', () => {
    test('should get the children results', async () => {
      useValidMock.mockReturnValue([ValidatorTypes.Valid]);
      useChildrenValueNamesMock.mockReturnValue([[]]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useWatcherMock.mockReturnValue([[]]);
      useChildrenIdsListMock.mockReturnValue([
        [
          { id: 'One', type: 'RenderRangeFieldValidator' },
          { id: 'Two', type: 'RenderRangeFieldValidator' },
        ],
      ]);

      const { result } = renderHook(() => useStackValidationChildren(ValidatorStackTypes.Optional, []));

      expect(result.current).toEqual(
        expect.objectContaining({
          isValidCollection: [],
          isValid: ValidatorTypes.Optional,
        }),
      );
    });
  });

  describe('and populated children array', () => {
    test('should get the children results', async () => {
      const expectedDefault = ValidatorTypes.Invalid;
      const expectedOneValid = ValidatorTypes.Valid;

      useValidMock.mockReturnValue([expectedDefault]);
      useChildrenValueNamesMock.mockReturnValue([['rangeFieldValidatorOne.validationResult', 'rangeFieldValidatorTwo.validationResult']]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useWatcherMock.mockReturnValue([[expectedOneValid]]);
      useChildrenIdsListMock.mockReturnValue([
        [
          { id: 'One', type: 'RenderRangeFieldValidator' },
          { id: 'Two', type: 'RenderRangeFieldValidator' },
        ],
      ]);

      const { result } = renderHook(() =>
        useStackValidationChildren(ValidatorStackTypes.Optional, [
          <RangeFieldValidatorState id="One" validationType={ValidatorStackTypes.Optional} />,
          <RangeFieldValidatorState id="Two" validationType={ValidatorStackTypes.Optional} />,
        ]),
      );

      expect(result.current).toEqual(
        expect.objectContaining({
          isValid: expectedDefault,
          isValidCollection: [
            {
              name: 'rangeFieldValidatorOne.validationResult',
              result: expectedOneValid,
            },
            {
              name: 'rangeFieldValidatorTwo.validationResult',
              result: expectedDefault,
            },
          ],
        }),
      );
    });
  });
});
