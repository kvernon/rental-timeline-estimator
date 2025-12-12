import { IRentalPropertyEntity } from '@cubedelement.com/realty-investor-timeline';
import { OwnershipType } from './OwnershipType';

export const getOwnership = (property: IRentalPropertyEntity): OwnershipType => {
  if (property.isOwned) {
    return OwnershipType.IsOwned;
  }

  if (property.soldDate) {
    return OwnershipType.WasOwned;
  }

  return OwnershipType.NeverOwned;
};
