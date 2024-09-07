import { IPropertiesInformationProps } from './IPropertiesInformationProps';
import { Stack } from '../components/core/Stack';
import { PropertyInformation } from '../components/validators/PropertyInformation';
import React, { useState } from 'react';
import { NavList } from '../components/navigation/NavList';
import { propertyOptions } from '../components/validators/PropertyDropDownValidator';

export const PropertiesInformation = (props: IPropertiesInformationProps) => {
  const [nav, setNav] = useState<
    {
      title: string;
      isSelected?: boolean | undefined;
      isDisabled?: boolean | undefined;
    }[]
  >(propertyOptions.map((x, i) => ({ title: x, isSelected: i === 0 })));
  const [location, setLocation] = React.useState<string>(propertyOptions[0]);

  return (
    <Stack aria-label={'Properties Information'} direction="column">
      <NavList
        title="Properties Navigation"
        navList={nav}
        onClick={(title, navList) => {
          setLocation(title);
          setNav(navList);
        }}
      />
      {location === propertyOptions[0] && <PropertyInformation {...props.apartment} />}
      {location === propertyOptions[1] && <PropertyInformation {...props.house} />}
    </Stack>
  );
};
