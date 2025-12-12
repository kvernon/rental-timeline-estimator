import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PropertyIcon } from './PropertyIcon';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { OwnershipType } from './OwnershipType';

jest.mock('./signs/OwnedSign');
jest.mock('./signs/SoldSign');
jest.mock('./signs/ForSaleSign');
jest.mock('./signs/Street');

describe('PropertyIcon', () => {
  test('should render house', () => {
    render(<PropertyIcon propertyType={PropertyType.SingleFamily} address="address" status={OwnershipType.IsOwned} />);

    const image = screen.getByAltText('address');

    expect(image).toHaveAttribute('title', 'address');
    expect(image).toHaveAttribute('src', './images/house-lg.gif');
  });

  test('should render apartment', () => {
    render(<PropertyIcon propertyType={PropertyType.PassiveApartment} address="address" status={OwnershipType.IsOwned} />);

    const image = screen.getByAltText('address');

    expect(image).toHaveAttribute('title', 'address');
    expect(image).toHaveAttribute('src', './images/apartment-lg.gif');
  });
});
