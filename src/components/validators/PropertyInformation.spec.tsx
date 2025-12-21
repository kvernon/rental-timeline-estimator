import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { PropertyInformation } from './PropertyInformation';
import { ValidatorTypes } from './ValidatorTypes';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IPropertyInformationOnChangeParams } from './IPropertyInformationParams';

jest.mock('./AnimatedRangeFieldValidator');
jest.mock('../panels/RangeValidationPanel');

describe('PropertyInformation unit tests', () => {
  let props: IPropertyInformationOnChangeParams;

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
      lowestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
      highestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
      lowestAppreciationValue: { value: 1, validationResult: ValidatorTypes.Valid },
      highestAppreciationValue: { value: 1, validationResult: ValidatorTypes.Valid },
      maxMonthsToCache: { value: 1, validationResult: ValidatorTypes.Valid },
      title: 'title',
      onChange: jest.fn(),
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

      test('should render Maximum Time Listed', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Maximum Time Listed');

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

    describe('and Sell Info', () => {
      test('should render Sell Info', () => {
        const generatorAmount = screen.getByLabelText<HTMLDivElement>('Sell Info');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Lowest Sell Time', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Lowest Sell Time');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Highest Sell Time', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Highest Sell Time');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Lowest Appreciation Percent', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Lowest Appreciation Percent');

        expect(generatorAmount).toBeInTheDocument();
      });

      test('should render Highest Appreciation Percent', () => {
        const generatorAmount = screen.getByLabelText<HTMLInputElement>('Highest Appreciation Percent');

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
