import React from 'react';
import { renderHook } from '@testing-library/react';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { useStackValidationChildren } from './useStackValidationChildren';

import { useChildrenValueNames } from './useChildrenValueNames';
import { useWatcher } from './useWatcher';
import { useChildrenIdsList } from './useChildrenIdsList';
import { useValid } from './useValid';

jest.mock('./useChildrenValueNames');
jest.mock('./useWatcher');
jest.mock('./useChildrenIdsList');
jest.mock('./useValid');

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
          <RangeFieldValidator key="one" id="One" validationType={ValidatorStackTypes.Optional} />,
          <RangeFieldValidator key="two" id="Two" validationType={ValidatorStackTypes.Optional} />,
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
