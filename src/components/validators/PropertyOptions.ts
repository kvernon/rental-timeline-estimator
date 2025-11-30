import { PropertyType } from '@cubedelement.com/realty-investor-timeline';

export const propertyOptions = ['apartment', 'house'];

export const propertyOptionsMap = [
  {
    label: propertyOptions[0],
    propertyType: PropertyType.PassiveApartment,
  },
  {
    label: propertyOptions[1],
    propertyType: PropertyType.SingleFamily,
  },
];

export const getPropertyIndex = (propertyType: PropertyType) => propertyOptionsMap.findIndex((option) => option.propertyType === propertyType);
