import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { IPropertiesInformationProps } from './IPropertiesInformationProps';
import { PropertiesInformation } from './PropertiesInformation';
import { NavList } from '../components/navigation/NavList';

jest.mock('../components/validators/PropertyInformation');
jest.mock('../components/navigation/NavList');

describe('PropertiesInformation unit tests', () => {
  let props: IPropertiesInformationProps;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      house: {
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
        title: 'title',
      },
      apartment: {
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
        title: 'title',
      },
    };

    render(<PropertiesInformation {...props} />);
  });

  describe('and with defaults', () => {
    test('should render Properties Information', () => {
      const entity = screen.getByLabelText<HTMLDivElement>('Properties Information');

      const expectedStyle = `
       display: flex;
       width: 100%;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });

    test('should render NavBar', () => {
      const nav = screen.getByLabelText<HTMLUListElement>('Properties Navigation');

      expect(NavList).toHaveBeenNthCalledWith(
        1,
        {
          title: 'Properties Navigation',
          onClick: expect.any(Function),
          navList: [
            {
              isSelected: true,
              title: 'apartment',
            },
            {
              isSelected: false,
              title: 'house',
            },
          ],
        },
        {},
      );

      expect(nav).toBeInTheDocument();
    });
  });
});
