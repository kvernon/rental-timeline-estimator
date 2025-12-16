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
  useSmall?: boolean;
}

const Image = styled.img``;

export function PropertyIcon(prop: IPropertyIconParams) {
  const imgWidth = prop.useSmall ? 88 : Math.round(629 / 3);
  const imgHeight = prop.useSmall ? 58 : Math.round(467 / 3);

  const Sign = prop.status === OwnershipType.IsOwned ? OwnedSign : prop.status === OwnershipType.WasOwned ? SoldSign : ForSaleSign;

  const imgSrc = `./images/${prop.propertyType === PropertyType.SingleFamily ? 'house' : 'apartment'}${prop.useSmall ? '' : '-lg'}.gif`;
  return (
    <Stack>
      <Street address={prop.address} />
      <Stack style={{ rotate: '-10deg', position: 'relative', top: '45px', left: '25px' }}>
        <Sign />
      </Stack>
      <Image width={imgWidth} height={imgHeight} src={imgSrc} alt={prop.address} title={prop.address} />
    </Stack>
  );
}
