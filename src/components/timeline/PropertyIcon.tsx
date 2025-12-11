import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { OwnershipType } from './OwnershipType';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { OwnedSign } from './signs/OwnedSign';
import { SoldSign } from './signs/SoldSign';
import { Street } from './signs/Street';
import { ForSaleSign } from './signs/ForSaleSign';

export interface IPropertyIconParams {
  propertyType: PropertyType;
  status: OwnershipType;
  address: string;
}

const Image = styled.img`
  width: unset;
`;

export function PropertyIcon(prop: IPropertyIconParams) {
  return (
    <Stack>
      <Street address={prop.address} />
      {prop.status === OwnershipType.IsOwned && <OwnedSign />}
      {prop.status === OwnershipType.WasOwned && <SoldSign />}
      {prop.status === OwnershipType.NeverOwned && <ForSaleSign />}
      <Image
        width={Math.round(629 / 3)}
        height={Math.round(467 / 3)}
        src={`./images/${prop.propertyType === PropertyType.SingleFamily ? 'house' : 'apartment'}-lg.gif`}
        alt={prop.address}
        title={prop.address}
      />
    </Stack>
  );
}
