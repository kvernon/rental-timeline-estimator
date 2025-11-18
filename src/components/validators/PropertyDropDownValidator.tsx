import React from 'react';
import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import { IPropertyDropDownOption } from '../core/IPropertyDropDownOption';
import { formatOptionLabel } from '../core/formatOptionLabel';
import { ValidatorTypes } from './ValidatorTypes';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';
import { IPropertyDropDownParams } from './IPropertyDropDownParams';
import styled from '@emotion/styled';
import { propertyOptions } from './PropertyOptions';
import { FormControl } from '../core/FormControl';

const getDataValue = (title: string, value: number): IPropertyDropDownOption => {
  return { value, label: title, image: `images/${title}.gif` };
};

const Select = styled(ReactSelect<IPropertyDropDownOption, false, GroupBase<IPropertyDropDownOption>>)`
  width: 140px;
  appearance: none;
  white-space: pre-wrap;
  padding-left: 4px;
  overflow: visible;
`;

export function PropertyDropDownValidator(props: IPropertyDropDownParams) {
  const optionsMap = propertyOptions.map(getDataValue) as IPropertyDropDownOption[];

  const coreTheme = useTheme() as IThemeOptions;

  const defaultValue = 1;

  return (
    <FormControl>
      <Select
        aria-label={props.title}
        onChange={(a: SingleValue<IPropertyDropDownOption>) => {
          if (a && props.onChange) {
            if (a.value !== props.value.value.value) {
              props.onChange({ value: a });
            }
          }
        }}
        value={getDataValue(props.value?.value?.label || propertyOptions[defaultValue], props.value.value.value || defaultValue)}
        options={optionsMap}
        formatOptionLabel={formatOptionLabel}
        styles={{
          control: (baseStyles) => {
            return {
              ...baseStyles,
              transition: ['border-color 0.4s ease-out', 'background-color 0.4s ease-out'],
              backgroundColor: `${coreTheme.palette.validation[ValidatorTypes[ValidatorTypes.Valid]].background}41`,
              marginLeft: '0',
              padding: '0',
              borderColor: `${coreTheme.palette.inputBackground}`,
              border: `3px solid ${coreTheme.palette.validation[ValidatorTypes[ValidatorTypes.Valid]].background}41`,
              borderRadius: '0.3rem',
              color: `${coreTheme.typography.get(FontGroups.input)?.color}`,
              ':hover': {
                backgroundColor: `${coreTheme.palette.validation[ValidatorTypes[ValidatorTypes.Valid]].background}81`,
                borderColor: `${coreTheme.palette.inputBackgroundFocus}`,
                color: `${coreTheme.palette.inputBackgroundFocus}`,
                transition: ['border-color 0.4s ease-out', 'background-color 0.4s ease-out'],
              },
            };
          },
          valueContainer: (baseStyles) => {
            return {
              ...baseStyles,
              marginLeft: '0',
              marginTop: '0',
              padding: '0',
            };
          },
        }}
      />
    </FormControl>
  );
}
