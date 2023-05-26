import React from 'react';
import { renderHook } from '@testing-library/react';
import { RangeFieldValidator } from '../../../src/components/validators/RangeFieldValidator';
import { ValidatorStackTypes } from '../../../src/components/validators/ValidatorStackTypes';
import { ValidatorTypes } from '../../../src/components/validators/ValidatorTypes';
import { useValidationChildren } from '../../../src/components/hooks/useValidationChildren';

import { useChildrenValueNames } from '../../../src/components/hooks/useChildrenValueNames';
import { useWatcher } from '../../../src/components/hooks/useWatcher';
import { useChildrenPropsList } from '../../../src/components/hooks/useChildrenPropsList';
import { useValid } from '../../../src/components/hooks/useValid';

jest.mock('../../../src/components/hooks/useChildrenValueNames');
jest.mock('../../../src/components/hooks/useWatcher');
jest.mock('../../../src/components/hooks/useChildrenPropsList');
jest.mock('../../../src/components/hooks/useValid');

jest.mock('react', () => {
  const requireActual = jest.requireActual('react');
  return {
    ...requireActual,
    useEffect: jest.spyOn(requireActual, 'useEffect'),
    useState: jest.spyOn(requireActual, 'useState'),
  };
});

describe('watchValidationChildren has children unit tests', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('and no children array', () => {
    test('should get the children results', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useValid.mockReturnValue({ isValid: ValidatorTypes.Valid });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useChildrenValueNames.mockReturnValue([[]]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useWatcher.mockReturnValue([[]]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useChildrenPropsList.mockReturnValue({
        theChildrenProps: [
          { id: 'One', validationType: ValidatorStackTypes.Required },
          { id: 'Two', validationType: ValidatorStackTypes.Optional },
        ],
      });

      const { result } = renderHook(() => useValidationChildren(ValidatorStackTypes.Optional, []));

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useValid.mockReturnValue({ isValid: expectedDefault });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useChildrenValueNames.mockReturnValue([['rangeFieldValidatorOne.validationResult', 'rangeFieldValidatorTwo.validationResult']]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useWatcher.mockReturnValue([[expectedOneValid]]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useChildrenPropsList.mockReturnValue({
        theChildrenProps: [
          { id: 'One', validationType: ValidatorStackTypes.Required },
          { id: 'Two', validationType: ValidatorStackTypes.Optional },
        ],
      });

      const { result } = renderHook(() =>
        useValidationChildren(ValidatorStackTypes.Optional, [
          <RangeFieldValidator id="One" validationType={ValidatorStackTypes.Optional} />,
          <RangeFieldValidator id="Two" validationType={ValidatorStackTypes.Optional} />,
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
