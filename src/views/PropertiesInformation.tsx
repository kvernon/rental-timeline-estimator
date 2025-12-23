import { Stack } from '../components/core/Stack';
import { PropertyInformation } from '../components/validators/PropertyInformation';
import React, { useState } from 'react';
import { NavListSub } from '../components/navigation/NavListSub';
import { updatePropertiesInfo } from '../redux/formSlice';
import { IPropertyInformationParams } from '../components/validators/IPropertyInformationParams';
import { propertyOptionsMap } from '../components/validators/PropertyOptions';
import { useFormDispatch, useFormSelector } from '../redux/hooks';

export const PropertiesInformation = () => {
  const [nav, setNav] = useState<
    {
      title: string;
      isSelected?: boolean | undefined;
      isDisabled?: boolean | undefined;
    }[]
  >(propertyOptionsMap.map((x, i) => ({ title: x.title, isSelected: i === 0 })));

  const dispatch = useFormDispatch();
  const value = useFormSelector((state) => state.form.propertiesInfo);
  const [location, setLocation] = React.useState<string>(propertyOptionsMap[0].title);

  const handlePropertyChange = (key: keyof typeof value) => (e: IPropertyInformationParams) => {
    dispatch(updatePropertiesInfo({ key, value: e }));
  };

  return (
    <Stack aria-label={'Properties Information'} direction="column">
      <NavListSub
        title="Properties Navigation"
        navList={nav}
        onClick={(title, navList) => {
          setLocation(title);
          setNav(navList);
        }}
      />
      {location === propertyOptionsMap[0].title && <PropertyInformation {...value.apartment} onChange={handlePropertyChange('apartment')} />}
      {location === propertyOptionsMap[1].title && <PropertyInformation {...value.house} onChange={handlePropertyChange('house')} />}
    </Stack>
  );
};
