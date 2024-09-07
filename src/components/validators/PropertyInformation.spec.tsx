import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { PropertyInformation } from './PropertyInformation';
import { ValidatorTypes } from './ValidatorTypes';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IPropertyInformationParams } from './IPropertyInformationParams';

jest.mock('./RangeFieldValidator');
jest.mock('../panels/RangeValidationPanel');

describe('PropertyInformation unit tests', () => {
  let props: IPropertyInformationParams;

  beforeEach(() => {
    props = {
      propertyType: PropertyType.SingleFamily,
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
    test('should render PropertyInformation', () => {
      const entity = screen.getByLabelText<HTMLFormElement>('title');

      expect(entity).toBeInTheDocument();
    });

    describe('and Life Span', () => {
      test('should render Life Span', () => {
        const generatorAmount = screen.getByLabelText<HTMLDivElement>('Life Span');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Minimum Generated Rental Opportunities', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Minimum Generated Rental Opportunities');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Maximum Generated Rental Opportunities', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Maximum Generated Rental Opportunities');

        expect(generatorAmount).toBeInTheDocument();
      });
    });

    describe('and Market Value', () => {
      test('should render Market Value', () => {
        const generatorAmount = screen.getByLabelText<HTMLDivElement>('Market Value');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Lowest Market Value', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Lowest Market Value');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Highest Market Value', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Highest Market Value');

        expect(generatorAmount).toBeInTheDocument();
      });
    });

    describe('and Cash Flow Range Group', () => {
      test('should render Cash Flow Range', () => {
        const generatorAmount = screen.getByLabelText<HTMLDivElement>('Cash Flow Range');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Lowest Amount', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Lowest Amount');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Highest Amount', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Highest Amount');

        expect(generatorAmount).toBeInTheDocument();
      });
    });

    describe('and Equity Capture Range Group', () => {
      test('should render Equity Capture Range', () => {
        const generatorAmount = screen.getByLabelText<HTMLDivElement>('Equity Capture Range');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Lowest Equity', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Lowest Equity');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Highest Amount', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Highest Equity');

        expect(generatorAmount).toBeInTheDocument();
      });
    });
  });
});
