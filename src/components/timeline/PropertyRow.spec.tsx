import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PropertyRow } from './PropertyRow';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';
import { getOwnership } from './getOwnership';
import { OwnershipType } from './OwnershipType';
import { PropertyCash } from './PropertyCash';
import { FontGroups } from '../../theming/fontGroups';
import { DateAvailable } from './DateAvailable';

jest.mock('./PropertyIcon');
jest.mock('./PropertyCash');
jest.mock('./MonthsListed');
jest.mock('./DateAvailable');
jest.mock('./getOwnership');

jest.mock('../core/StackRowPill', () => ({
  StackRowPill: ({ children }: { children: React.ReactNode }) => <div data-testid="stack-row-pill">{children}</div>,
}));

describe('PropertyRow', () => {
  const mockGetEquityFromSell = jest.fn();

  // Helper to create a base mock property
  const createMockHistoricalProperty = (overrides = {}): IHistoricalProperty => {
    return {
      property: {
        address: '123 Main St',
        propertyType: PropertyType.SingleFamily,
        availableStartDate: new Date('2020-01-01'),
        availableEndDate: new Date('2030-01-01'),
        isOwned: false,
        purchaseDate: new Date('2021-01-01'),
        soldDate: undefined,
        rawEstimatedAnnualCashFlow: 12000,
        getEquityFromSell: mockGetEquityFromSell,
        getEstimatedEquityFromSell: jest.fn().mockReturnValue(210),
        ...overrides,
      },
      // IHistoricalProperty usually has other fields, but we only access .property in the component
    } as unknown as IHistoricalProperty;
  };

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    jest.clearAllMocks();
  });

  it('renders an Apartment/MultiFamily property with correct image', () => {
    const historicalProperty = createMockHistoricalProperty({
      propertyType: PropertyType.PassiveApartment,
    });

    jest.mocked(getOwnership).mockReturnValue(OwnershipType.WasOwned);
    render(<PropertyRow historicalProperty={historicalProperty} endDate={new Date()} />);

    const pc = screen.getAllByTestId('property-cash');
    expect(pc.length).toEqual(3);

    expect(PropertyCash).toHaveBeenNthCalledWith(1, { title: 'Market', value: undefined }, undefined);
    expect(PropertyCash).toHaveBeenNthCalledWith(2, { title: 'Potential Equity', value: 210, fontGroup: FontGroups.h5 }, undefined);
    expect(PropertyCash).toHaveBeenNthCalledWith(3, { title: 'Cash Flow', value: 12000, fontGroup: FontGroups.h6 }, undefined);

    expect(DateAvailable).toHaveBeenCalledWith(
      {
        availableStartDate: historicalProperty.property.availableStartDate,
        availableEndDate: historicalProperty.property.availableEndDate,
      },
      undefined,
    );

    expect(screen.getByTestId('property-icon')).toBeInTheDocument();
  });
});
