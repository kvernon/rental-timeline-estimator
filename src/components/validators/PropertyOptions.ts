import { PropertyType } from '@cubedelement.com/realty-investor-timeline';

export const propertyOptions = ['apartment', 'house'];

export const propertyOptionsMap = [
  {
    label: propertyOptions[0],
    title: 'Passive Apartment',
    propertyType: PropertyType.PassiveApartment,
  },
  {
    label: propertyOptions[1],
    title: 'Single Family',
    propertyType: PropertyType.SingleFamily,
  },
];

export const getPropertyIndex = (propertyType: PropertyType) => propertyOptionsMap.findIndex((option) => option.propertyType === propertyType);
