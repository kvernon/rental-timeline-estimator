import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { PropertiesInformation } from './PropertiesInformation';
import { NavListSub } from '../components/navigation/NavListSub';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('../components/validators/PropertyInformation');
jest.mock('../components/navigation/NavListSub');
jest.mock('react-redux');

describe('PropertiesInformation unit tests', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.mocked(useDispatch).mockReturnValue(mockDispatch);

    const propertiesInfo = {
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

    jest.mocked(useSelector).mockImplementation((selector: (s: unknown) => unknown) => selector({ form: { propertiesInfo } } as unknown));

    render(<PropertiesInformation />);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

      expect(NavListSub).toHaveBeenNthCalledWith(
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
        undefined,
      );

      expect(nav).toBeInTheDocument();
    });
  });
});
