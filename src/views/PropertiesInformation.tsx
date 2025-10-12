import { Stack } from '../components/core/Stack';
import { PropertyInformation } from '../components/validators/PropertyInformation';
import React, { useState } from 'react';
import { NavListSub } from '../components/navigation/NavListSub';
import { propertyOptions } from '../components/validators/PropertyDropDownValidator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updatePropertiesInfo } from '../formSlice';
import { IPropertyInformationParams } from '../components/validators/IPropertyInformationParams';

export const PropertiesInformation = () => {
  const [nav, setNav] = useState<
    {
      title: string;
      isSelected?: boolean | undefined;
      isDisabled?: boolean | undefined;
    }[]
  >(propertyOptions.map((x, i) => ({ title: x, isSelected: i === 0 })));

  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector((state: RootState) => state.form.propertiesInfo);
  const [location, setLocation] = React.useState<string>(propertyOptions[0]);

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
      {location === propertyOptions[0] && <PropertyInformation {...value.apartment} onChange={handlePropertyChange('apartment')} />}
      {location === propertyOptions[1] && <PropertyInformation {...value.house} onChange={handlePropertyChange('house')} />}
    </Stack>
  );
};
