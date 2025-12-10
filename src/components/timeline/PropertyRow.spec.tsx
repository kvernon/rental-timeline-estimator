import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PropertyRow } from './PropertyRow';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { IHistoricalProperty } from '@cubedelement.com/realty-investor-timeline/dist/src/time/i-historical-property';

// Mock child components to isolate the test
jest.mock('../cells/AddressSpan', () => ({
  AddressSpan: ({ children }: { children: React.ReactNode }) => <span data-testid="address-span">{children}</span>,
}));

jest.mock('../cells/DateCell');

jest.mock('../cells/OwnershipSpan', () => ({
  OwnershipSpan: ({ children }: { children: React.ReactNode }) => <span data-testid="ownership-span">{children}</span>,
}));

jest.mock('../cells/MoneyCell');

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
        ...overrides,
      },
      // IHistoricalProperty usually has other fields, but we only access .property in the component
    } as unknown as IHistoricalProperty;
  };

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    jest.clearAllMocks();
  });

  it('renders a SingleFamily property with correct image and address', () => {
    const historicalProperty = createMockHistoricalProperty({
      propertyType: PropertyType.SingleFamily,
      address: 'Test House',
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    // Check Image
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', './images/house.gif');
    expect(img).toHaveAttribute('title', 'Test House');
    expect(img).toHaveAttribute('alt', 'Test House');

    // Check Address
    expect(screen.getByTestId('address-span')).toHaveTextContent('Test House');
  });

  it('renders an Apartment/MultiFamily property with correct image', () => {
    const historicalProperty = createMockHistoricalProperty({
      propertyType: PropertyType.PassiveApartment,
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', './images/apartment.gif');
  });

  it('displays "IsOwned" status when property.isOwned is true', () => {
    const historicalProperty = createMockHistoricalProperty({
      isOwned: true,
      soldDate: null,
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    expect(screen.getByTestId('ownership-span')).toHaveTextContent('IsOwned');
  });

  it('displays "WasOwned" status when property is not currently owned but has a soldDate', () => {
    const historicalProperty = createMockHistoricalProperty({
      isOwned: false,
      soldDate: new Date('2025-01-01'),
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    expect(screen.getByTestId('ownership-span')).toHaveTextContent('WasOwned');
  });

  it('displays "NeverOwned" status when property is not owned and has no soldDate', () => {
    const historicalProperty = createMockHistoricalProperty({
      isOwned: false,
      soldDate: null,
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    expect(screen.getByTestId('ownership-span')).toHaveTextContent('NeverOwned');
  });

  it('passes correct dates to DateCells', () => {
    const startDate = new Date('2020-11-01');
    const endDate = new Date('2030-01-01');
    const purchaseDate = new Date('2021-06-01');
    const soldDate = new Date('2025-12-31');

    const historicalProperty = createMockHistoricalProperty({
      availableStartDate: startDate,
      availableEndDate: endDate,
      purchaseDate: purchaseDate,
      soldDate: soldDate,
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    const dateCells = screen.getAllByTestId('date-cell');
    // Order in component: Start, End, Purchase, Sold
    expect(dateCells[0]).toHaveTextContent('2020-9-1');
    expect(dateCells[1]).toHaveTextContent('2029-11-1');
    expect(dateCells[2]).toHaveTextContent('2021-4-1');
    expect(dateCells[3]).toHaveTextContent('2025-11-1');
  });

  it('calculates and displays equity from sell if soldDate exists', () => {
    const soldDate = new Date('2025-05-20');
    mockGetEquityFromSell.mockReturnValue(50000);

    const historicalProperty = createMockHistoricalProperty({
      soldDate: soldDate,
      rawEstimatedAnnualCashFlow: 1000,
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    const moneyCells = screen.getAllByTestId('money-cell');
    // Order: AnnualCashFlow, Equity
    expect(moneyCells[0]).toHaveTextContent('1000');
    expect(moneyCells[1]).toHaveTextContent('50000');

    expect(mockGetEquityFromSell).toHaveBeenCalledWith(soldDate);
  });

  it('displays 0 equity if property is not sold', () => {
    const historicalProperty = createMockHistoricalProperty({
      soldDate: null,
    });

    render(<PropertyRow historicalProperty={historicalProperty} />);

    const moneyCells = screen.getAllByTestId('money-cell');
    // Second MoneyCell is Equity
    expect(moneyCells[1]).toHaveTextContent('0');
    expect(mockGetEquityFromSell).not.toHaveBeenCalled();
  });
});
