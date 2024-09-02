import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { IPropertiesInformationParams, PropertyInformation } from './PropertyInformation';
import { ValidatorTypes } from './ValidatorTypes';

jest.mock('./RangeFieldValidator');
jest.mock('../panels/RangeValidationPanel');

describe('PropertiesInformation unit tests', () => {
  let props: IPropertiesInformationParams;

  beforeEach(() => {
    props = {
      highestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
      lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
      highestCashFlow: { value: 1, validationResult: ValidatorTypes.Valid },
      highestEquityCapturePercent: { value: 1, validationResult: ValidatorTypes.Valid },
      highestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
      lowestCashFlow: { value: 1, validationResult: ValidatorTypes.Valid },
      lowestEquityCapturePercent: { value: 1, validationResult: ValidatorTypes.Valid },
      lowestPurchasePrice: { value: 1, validationResult: ValidatorTypes.Valid },
      title: 'title',
    };

    render(<PropertyInformation {...props} />);
  });

  describe('and defaults', () => {
    test('should render', () => {
      const entity = screen.getByLabelText<HTMLFormElement>('title');

      expect(entity).toBeInTheDocument();
    });
  });
});
